#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ApiStack } from '../lib/api';

const app = new cdk.App();
new ApiStack(app, 'ApiStack', {
  env: {
    region: 'us-east-2'
  }
});
