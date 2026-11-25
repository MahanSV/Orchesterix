import { TabaS3 } from '@taba/s3';
import env from '#substructure/env.ts';
import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export interface FileManagerServiceInterface {
  fileUploader(file: Express.Multer.File, uploaderId: string): Promise<string>;
  downloadFileLink(id: string): Promise<string>
}

class FileManagerService implements FileManagerServiceInterface {
  private s3;

  constructor() {
    this.s3 = new TabaS3({
      endPoint: env.s3Endpoint,
      port: env.s3Port,
      useSSL: env.s3UseSSL,
      accessKey: env.s3AccessKey,
      secretKey: env.s3SecretKey,
      defaultBucket:  env.s3DefaultBucket,
    });
  };

  public async fileUploader(file: Express.Multer.File, uploaderId: string): Promise<string> {
    return await this.s3.uploadFile(file, { uploaderId });
  };

  public async downloadFileLink(id: string): Promise<string> {
    let downloadLink = await this.s3.getDownloadLink(id, { expires: 3600 });

    if (env.s3PublicEndPoint) {
      const url = new URL(downloadLink);
      const useSSL = env.s3PublicUseSSL ?? true;
      const port = env.s3PublicPort;
      url.protocol = useSSL ? 'https:' : 'http:';
      url.hostname = env.s3PublicEndPoint;
      url.port = port ? String(port) : '';
      downloadLink = url.toString();
    }

    if (!downloadLink) {
      throw new ApiError(httpStatus.NOT_FOUND, 'دریافت لینک دانلود مستند با خطا مواجه شده است.', 'Error');
    }

    return downloadLink;
  };
}

// Singleton
const fileManagerService = new FileManagerService();
export default fileManagerService;