import {
  DockerImageCode,
  DockerImageFunction,
  Tracing,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import * as path from "path";
import * as cdk from "aws-cdk-lib";

type Props = {};

export class StudySessionFunction extends Construct {
  readonly handler: DockerImageFunction;
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const handlerRole = new iam.Role(this, "MyDockerImageHandlerRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });
    handlerRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaVPCAccessExecutionRole"
      )
    );

    const handler = new DockerImageFunction(this, "Handler", {
      code: DockerImageCode.fromImageAsset(
        path.join(__dirname, "../../../backend"),
        {
          platform: Platform.LINUX_AMD64,
          file: "Dockerfile",
        }
      ),
      memorySize: 512,
      timeout: cdk.Duration.seconds(60),
      tracing: Tracing.ACTIVE,
      environment: {
        STAGE: "stg",
      },
      role: handlerRole,
    });

    this.handler = handler;
  }
}
