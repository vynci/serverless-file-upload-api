import * as AWS from 'aws-sdk';

const options = isOffline => {
  let options = {};

  if (isOffline) {
    options = {
      region : 'us-east-1',
      s3ForcePathStyle: true,
      endpoint : 'http://localhost:8002'
    };
  }
  return options;
};

const s3 = new AWS.S3(options(process.env.IS_OFFLINE));

export { s3, options };
