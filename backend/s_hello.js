
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'am3238',
  applicationName: 'backend-app',
  appUid: 'bkcYvMnpdvz2sJsjQy',
  orgUid: '7d91c867-78a6-4d30-8757-9203cf4c5245',
  deploymentUid: '2eece445-8a1f-4494-953b-3a587c64ef86',
  serviceName: 'backend',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '4.5.3',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'backend-dev-hello', timeout: 6 };

try {
  const userHandler = require('./handler.js');
  module.exports.handler = serverlessSDK.handler(userHandler.hello, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}