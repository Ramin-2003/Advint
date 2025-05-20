from aws_cdk import (
    aws_apigatewayv2 as apigw,
    aws_apigatewayv2_integrations as integrations,
    CfnOutput,
)
from constructs import Construct
from aws_cdk.aws_lambda import Function as LambdaFunction

class ApiConstruct(Construct):

    def __init__(self, scope: Construct, id: str, demo_lambda: LambdaFunction) -> None:
        super().__init__(scope, id)

        self.http_api = apigw.HttpApi(
            self, "HttpApi",
            cors_preflight=apigw.CorsPreflightOptions(
                allow_headers=["*"],
                allow_methods=[apigw.CorsHttpMethod.GET, apigw.CorsHttpMethod.PUT],
                allow_origins=["*"]
            )
        )

        demo_integration = integrations.HttpLambdaIntegration(
            "DemoIntegration", handler=demo_lambda
        )

        self.http_api.add_routes(
            path="/demo/{url}",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.PUT],
            integration=demo_integration
        )

        
        CfnOutput(
            self, "HttpApiUrl",
            value=self.http_api.url or "Something went wrong",
            description="Base URL for the HTTP API"
        )