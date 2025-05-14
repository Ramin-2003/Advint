import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";

// Config
const REGION = "ca-central-1";
const CLIENT_ID = "4n68qfbbp35nb45619bmecn6ba";
const DOMAIN = "synapsocial-auth.auth.ca-central-1.amazoncognito.com";

// SDK client
const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

// === Utility: Error Message Mapper ===
function getFriendlyMessage(error: any) {
  switch (error.name) {
    case "UsernameExistsException":
      return "An account already exists with this email.";
    case "InvalidPasswordException":
      return "Password does not meet the required complexity.";
    case "InvalidParameterException":
      return "Invalid input. Please check your form.";
    case "CodeMismatchException":
      return "Incorrect confirmation code.";
    case "ExpiredCodeException":
      return "Confirmation code has expired.";
    case "NotAuthorizedException":
      return "Incorrect password.";
    case "UserNotConfirmedException":
      return "Account not verified. Please check your email.";
    case "UserNotFoundException":
      return "No account found with this email.";
    case "TooManyFailedAttemptsException":
      return "Too many attempts. Please try again later.";
    case "LimitExceededException":
      return "Too many requests. Please wait and try again.";
    default:
      return "An unknown error occurred. Please try again.";
  }
}

// === Sign Up ===
export async function signUp(email: string, password: string) {
  try {
    const command = new SignUpCommand({
      ClientId: CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email
        }
      ] 
    });
    await cognitoClient.send(command);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: getFriendlyMessage(error) };
  }
}

// === Confirm Sign Up ===
export async function confirmSignUp(email: string, code: string) {
  try {
    const command = new ConfirmSignUpCommand({
      ClientId: CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
    });
    await cognitoClient.send(command);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: getFriendlyMessage(error) };
  }
}

// === Resend Confirmation Code ===
export async function resendCode(email: string) {
  try {
    const command = new ResendConfirmationCodeCommand({
      ClientId: CLIENT_ID,
      Username: email,
    });
    await cognitoClient.send(command);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: getFriendlyMessage(error) };
  }
}

// === Sign In ===
export async function signIn(email: string, password: string) {
  try {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await cognitoClient.send(command);

    if (response.AuthenticationResult) {
      localStorage.setItem("id_token", response.AuthenticationResult.IdToken || "");
      localStorage.setItem("access_token", response.AuthenticationResult.AccessToken || "");
      localStorage.setItem("refresh_token", response.AuthenticationResult.RefreshToken || "");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Cognito login error:", {
      name: error?.name,
      message: error?.message,
      code: error?.$metadata?.httpStatusCode,
      full: error,
    });
    return { success: false, message: getFriendlyMessage(error) };
  }
}

// === Forgot Password ===
export async function forgotPassword(email: string) {
  try {
    const command = new ForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email,
    });
    await cognitoClient.send(command);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: getFriendlyMessage(error) };
  }
}

// === Confirm Forgot Password ===
export async function confirmForgotPassword(email: string, code: string, newPassword: string) {
  try {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: newPassword,
    });
    await cognitoClient.send(command);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: getFriendlyMessage(error) };
  }
}

// === Google OAuth Callback Handler ===
export async function handleGoogleCallback(code: string) {
  try {
    const redirectUri = "http://localhost:5173/callback";
    const body = new URLSearchParams();
    body.append("grant_type", "authorization_code");
    body.append("client_id", CLIENT_ID);
    body.append("code", code);
    body.append("redirect_uri", redirectUri);

    const response = await fetch(`https://${DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await response.json();

    if (data.id_token) {
      localStorage.setItem("id_token", data.id_token);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      return { success: true };
    } else {
      throw new Error("Token exchange failed");
    }
  } catch (error: any) {
    return { success: false, message: "Google login failed. Please try again." };
  }
}

// === Refresh Session ===
export async function refreshSession() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return { success: false, message: "No refresh token available." };

  try {
    const command = new InitiateAuthCommand({
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });

    const response = await cognitoClient.send(command);

    if (response.AuthenticationResult) {
      localStorage.setItem("id_token", response.AuthenticationResult.IdToken || "");
      localStorage.setItem("access_token", response.AuthenticationResult.AccessToken || "");
      return { success: true };
    }

    return { success: false, message: "Failed to refresh session." };
  } catch (error: any) {
    return { success: false, message: getFriendlyMessage(error) };
  }
}

// === Logout ===
export function logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  const logoutUri = "http://localhost:5173/logout";
  const url = `https://${DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${encodeURIComponent(logoutUri)}`;
  window.location.href = url;
}

// === Google Login Redirect ===
export function loginWithGoogle() {
  const redirectUri = "http://localhost:5173/callback";

  const url = `https://${DOMAIN}/oauth2/authorize` +
    `?response_type=code` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&identity_provider=Google` +
    `&scope=openid+email+profile`;

  window.location.href = url;
}