#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { StudySessionStack } from "../lib/study-session-stack";

const app = new cdk.App();

new StudySessionStack(app, "StudySessionStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "ap-northeast-1",
  },
});
