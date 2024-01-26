import { Inject, Injectable } from '@nestjs/common';
import { DoSpacesServiceLib, UploadedMulterFile } from './config';
import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
@Injectable()
export class SpaceService {
  constructor(@Inject(DoSpacesServiceLib) private readonly s3: AWS.S3) {}

  // async uploadFile() {
  //   return multer({
  //     storage: multerS3({
  //       s3: this.s3,
  //       bucket: process.env.BUCKET_NAME,
  //       acl: 'public-read',
  //       key: function (request, file, cb) {
  //         console.log(file);
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }).array('upload', 1);
  // }
  async uploadFile(file: UploadedMulterFile) {
    const fileName = `${file.originalname}-${Date.now()}`;

    // Return a promise that resolves only when the file upload is complete
    return new Promise((resolve, reject) => {
      this.s3.putObject(
        {
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ACL: 'public-read',
        },
        (error: AWS.AWSError) => {
          if (!error) {
            resolve(
              `<put-here-the-public-link-to-your-spaces-instance>/${fileName}`,
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
