import { Inject, Injectable } from '@nestjs/common';
import { DoSpacesServiceLib } from './config';
import * as AWS from 'aws-sdk';
@Injectable()
export class SpaceService {
  constructor(@Inject(DoSpacesServiceLib) private readonly s3: AWS.S3) {}

  async uploadImage(file: Express.Multer.File) {
    const fileNameUrl = `${Date.now()}-${file.originalname}`;

    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: process.env.BUCKET_NAME,
          Key: fileNameUrl,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        },
        (error: AWS.AWSError) => {
          if (!error) {
            resolve(
              `https://${process.env.BUCKET_NAME}.${process.env.S3_ENDPOINT}/${fileNameUrl}`,
            );
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
