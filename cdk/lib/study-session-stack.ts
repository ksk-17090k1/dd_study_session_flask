import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { StudySessionFunction } from "./constructs/studySessionhandler";
import { StudySessionApi } from "./constructs/studySessionApi";

type Props = cdk.StackProps & {};

export class StudySessionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: Props) {
    super(scope, id, props);
    const dockerHandler = new StudySessionFunction(
      this,
      "StudySessionFunction",
      {}
    );
    new StudySessionApi(this, "StudySessionApi", {
      handler: dockerHandler.handler,
    });
  }
}
