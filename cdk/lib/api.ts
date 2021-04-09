import * as cdk from '@aws-cdk/core';
import * as elasticbeanstalk from '@aws-cdk/aws-elasticbeanstalk';
import * as iam from '@aws-cdk/aws-iam';

const appName = 'bucket-list-api';

export class ApiStack extends cdk.Stack {

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // EBS IAM Roles
    const EbInstanceRole = new iam.Role(this, `${appName}-aws-elasticbeanstalk-ec2-role`, {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    });

    const managedPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier')
    EbInstanceRole.addManagedPolicy(managedPolicy);

    const profileName = `${appName}-InstanceProfile`
    const instanceProfile = new iam.CfnInstanceProfile(this, profileName, {
      instanceProfileName: profileName,
      roles: [
        EbInstanceRole.roleName
      ]
    });

    const node = this.node;
    const platform = node.tryGetContext("platform");

    const optionSettingProperties: elasticbeanstalk.CfnEnvironment.OptionSettingProperty[] = [
      {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'InstanceType',
        value: 't3.small',
      },
      {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'IamInstanceProfile',
        value: profileName
      }
    ];

    // EBS Application and Environment
    const app = new elasticbeanstalk.CfnApplication(this, 'Application', {
      applicationName: `${appName}-EB-App`
    });

    const env = new elasticbeanstalk.CfnEnvironment(this, 'Environment', {
      environmentName: `${appName}-EB-Env`,
      applicationName: `${appName}-EB-App`,
      platformArn: platform,
      solutionStackName: '64bit Amazon Linux 2 v5.3.1 running Node.js 14',
      optionSettings: optionSettingProperties
    });

    env.addDependsOn(app);

  }
}

const app = new cdk.App();

new ApiStack(app, 'Production');

app.synth();
