import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import { FileServiceInterface } from '#application/interfaces/FileServiceInterface.ts';
import fileManagerService from '#context/tabaS3/s3.ts';

export class FileService implements FileServiceInterface {
  async downloadFile(uploaderId: string): Promise<string> {
    const fileId = await fileManagerService.downloadFileLink(uploaderId);

    if (!fileId)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام جستجو فایل.', 'Error');

    return fileId;
  };

  async uploadFile(uploaderId: string, file: Express.Multer.File): Promise<string> {

    const uploadedFile = await fileManagerService.fileUploader(file, uploaderId);

    if (!uploadedFile)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام بارگذاری فایل.', 'Error');

    return uploadedFile;
  };
}