import { s3 } from '../aws/s3';

const env:any = process.env;

export const singleFileUpload = async (event) => {
    let response = { statusCode: 0, body: {}, headers: { 'Access-Control-Allow-Origin': '*' } };

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

        const result = await s3.putObject(params).promise();

        response.statusCode = 200;
        response.body = JSON.stringify({
            data : {
                result, 
                status : 'success', 
                fileUrl: env.fileRootPath + path
            }
        });

    } catch (err) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            data : {
                status : 'error', 
                message : err.message
            }
        });
    }

    return response;
}