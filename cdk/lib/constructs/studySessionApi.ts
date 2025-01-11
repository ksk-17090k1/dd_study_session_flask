import { Construct } from "constructs";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
  HttpStage,
} from "aws-cdk-lib/aws-apigatewayv2";
import * as cdk from "aws-cdk-lib";
import { IFunction } from "aws-cdk-lib/aws-lambda";

type Props = {
  handler: IFunction;
};

export class StudySessionApi extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const allowOrigins = ["*"];

    const api = new HttpApi(this, "MyHttpApi", {
      createDefaultStage: false,
      corsPreflight: {
        allowHeaders: ["*"],
        allowMethods: [
          CorsHttpMethod.GET,
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.POST,
        ],
        allowOrigins: allowOrigins,
        maxAge: cdk.Duration.days(10),
      },
    });

    const integration = new HttpLambdaIntegration("Integration", props.handler);

    api.addRoutes({
      path: "/{proxy+}",
      integration,
      methods: [HttpMethod.GET, HttpMethod.POST],
    });

    new HttpStage(this, "MyStage", {
      httpApi: api,
      throttle: {
        rateLimit: 20,
        burstLimit: 200,
      },
      autoDeploy: true,
    });
  }
}
