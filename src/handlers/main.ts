import { s3 } from '../aws/s3';

const env:any = process.env;

export const singleFileUpload = async (event) => {
    let response = {};

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

        response = {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                data : {
                    result, 
                    status : 'success', 
                    fileUrl: env.fileRootPath + path
                }
            })
        }
        
    } catch (ex) {
        throw ex;
    }

    return response;
}