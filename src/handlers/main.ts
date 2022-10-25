import { s3 } from '../aws/s3';

const env: any = process.env;

export const singleFileUpload = async (event) => {
    const filename = event.headers.filename;
    const binary_file = event.body;

    try {
        const bufferData = new Buffer(binary_file, 'base64');
        const path = env.folderPath + `${new Date().getTime()}_${filename}`;

        const params = {
            Body: bufferData,
            Bucket: env.fileBucket,
            Key: path
        };

        const s3Result = await s3.putObject(params).promise();

        return response('success', env.fileRootPath + path, s3Result);
    } catch (err) {
        return response('error', '', err.message);
    }
}

const response = (status, fileUrl, s3Result) => {
    return {
        statusCode : status === 'success' ? 200 : 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        data : {
            s3Result,
            status,
            fileUrl
        }
    }
}