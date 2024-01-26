import { Inject, Injectable } from '@nestjs/common';
import { DoSpacesServiceLib } from './config';
import * as AWS from 'aws-sdk';
@Injectable()
export class SpaceService {
  constructor(@Inject(DoSpacesServiceLib) private readonly s3: AWS.S3) {}

  async uploadFile(fileName: string, file: Buffer) {
    const fileNameUrl = `${Date.now()}-${fileName}`;

    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: process.env.BUCKET_NAME,
          Key: fileNameUrl,
          Body: file,
          ACL: 'public-read',
        },
        (error: AWS.AWSError) => {
          if (!error) {
            resolve(`${fileName}`);
          } else {
            reject(
              new Error(
                `DoSpacesService_ERROR: ${
                  error.message || 'Something went wrong'
                }`,
              ),
            );
          }
        },
      );
    });
  }
}
