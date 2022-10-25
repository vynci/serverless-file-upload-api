# Serverless File Upload API

This is a quick implementation of a File Uploader API that is deployed in AWS using API Gateway, Lambda and S3. This API can upload any file type.

## Development

This will install serverless offline, so you can test it locally.

`$ npm install`

`$ npm start`

## Deployment

After you have set the necessary environment variables.

`$ export AWS_ACCESS_KEY=xxxx`

`$ export AWS_SECRET_KEY=xxxx`

You can execute this command to deploy the services in AWS.

`$ node --max-old-space-size=8192 ./node_modules/.bin/serverless deploy -s prod -v`
