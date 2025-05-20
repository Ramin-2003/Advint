from aws_cdk import (
    Stack,
    aws_cognito as cognito,
    aws_ssm as ssm,
    SecretValue,
    CfnOutput,
)
from constructs import Construct

class InfraStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        user_pool = cognito.UserPool(
            self, "SynapSocialPool",
            self_sign_up_enabled=True,
            sign_in_aliases=cognito.SignInAliases(email=True),
            auto_verify=cognito.AutoVerifiedAttrs(email=True),

            user_verification=cognito.UserVerificationConfig(
            email_subject="SynapSocial Verification",
            email_body="Your verification code is {####}",
            email_style=cognito.VerificationEmailStyle.CODE
            ),
            
            password_policy=cognito.PasswordPolicy(
            min_length=8,
            require_lowercase=True,
            require_uppercase=True,
            require_digits=True
            )
        )

        user_pool_domain = user_pool.add_domain("UserPoolDomain",
            cognito_domain=cognito.CognitoDomainOptions(
                domain_prefix="synapsocial-auth"  # must be globally unique
            )
        )

        google_provider = cognito.UserPoolIdentityProviderGoogle(self, "GoogleProvider",
            client_id= ssm.StringParameter.from_string_parameter_name(self, "GoogleClientIdParam","/synapsocial/google-client-id").string_value,
            client_secret_value= SecretValue.unsafe_plain_text("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"), # cloudformation causing issues reading secure string from SSM fix later perhaps
            user_pool=user_pool,
            scopes=["profile", "email"],
            attribute_mapping=cognito.AttributeMapping(
                email=cognito.ProviderAttribute.GOOGLE_EMAIL,
                given_name=cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
                family_name=cognito.ProviderAttribute.GOOGLE_FAMILY_NAME
            )
        )
        user_pool_client = cognito.UserPoolClient(self, "UserPoolClient",
            user_pool=user_pool,
            generate_secret=False,
            supported_identity_providers=[
                cognito.UserPoolClientIdentityProvider.COGNITO,
                cognito.UserPoolClientIdentityProvider.GOOGLE
            ],
            o_auth=cognito.OAuthSettings(
                flows=cognito.OAuthFlows(authorization_code_grant=True),
                scopes=[cognito.OAuthScope.OPENID, cognito.OAuthScope.EMAIL, cognito.OAuthScope.PROFILE],
                callback_urls=["http://localhost:5173/callback"],
                logout_urls=["http://localhost:5173/"]
            ),
            auth_flows=cognito.AuthFlow(
                user_password=True
            )
        )
        user_pool_client.node.add_dependency(google_provider)
        CfnOutput(self, "UserPoolId", value=user_pool.user_pool_id)
        CfnOutput(self, "UserPoolClientId", value=user_pool_client.user_pool_client_id)
        CfnOutput(self, "CognitoDomain", value=f"{user_pool_domain.domain_name}.auth.{self.region}.amazoncognito.com")
        
