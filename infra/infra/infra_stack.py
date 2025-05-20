from aws_cdk import Stack
from constructs import Construct
from .auth_construct import AuthConstruct
from .demo_construct import DemoConstruct
from .api_construct import ApiConstruct

class InfraStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        auth = AuthConstruct(self, "Auth")
        # Instantiate demo microservice
        demo = DemoConstruct(self, "Demo")
        # Pass demo Lambda to API construct
        api = ApiConstruct(self, "Api", demo_lambda=demo.demo_lambda)