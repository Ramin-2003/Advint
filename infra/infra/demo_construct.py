from aws_cdk import (
    aws_lambda as _lambda,
    aws_dynamodb as ddb,
    Duration,
    aws_logs as logs,
)
from constructs import Construct
from pathlib import Path

class DemoConstruct(Construct):

    def __init__(self, scope: Construct, id: str) -> None:
        super().__init__(scope, id)

        self.table = ddb.Table(
            self, "DemoRegistryTable",
            table_name="demo-registry",
            partition_key=ddb.Attribute(
                name="URL", type=ddb.AttributeType.STRING
            ),
            billing_mode=ddb.BillingMode.PAY_PER_REQUEST
        )

        self.table.add_global_secondary_index(
            index_name="IPIndex",
            partition_key=ddb.Attribute(name="AccessIP", type=ddb.AttributeType.STRING),
            sort_key=ddb.Attribute(name="CreatedAt", type=ddb.AttributeType.NUMBER),
            projection_type=ddb.ProjectionType.KEYS_ONLY
        )

        self.demo_lambda = _lambda.Function(
            self, "DemoFunction",
            runtime=_lambda.Runtime.PYTHON_3_12,
            log_retention=logs.RetentionDays.ONE_MONTH,
            handler="handler.handler",  # file.handler
            code=_lambda.Code.from_asset(
                str(Path(__file__).parent.parent / "lambdas/demo")
            ),
            timeout=Duration.seconds(10),
        )

        self.table.grant_write_data(self.demo_lambda)
        self.table.grant_read_data(self.demo_lambda)