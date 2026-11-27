import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '#webhost/errors/apiError.ts';
import { FileService } from '#application/services/fileService.ts';
import { FileServiceInterface } from '#application/interfaces/FileServiceInterface.ts';


class FileController {
  private fileService: FileServiceInterface;

  constructor(fileService: FileServiceInterface = new FileService()) {
    this.fileService = fileService;
  };

  public downloadFile = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.query?.id;

      if (typeof id === 'string') {
        const link = await this.fileService.downloadFile(id);

        res.status(httpStatus.CREATED).send({
          message: 'لینک فایل با موفقیت دریافت شد.',
          link
        });
      }
      else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'لینک فایل نامعتبر است.', 'Error');
      }
    }
    catch (error) {
      throw error;
    }
  };

  public uploadFile = async (req: Request, res: Response): Promise<any> => {
    try {
      const file = req.file as Express.Multer.File | null | undefined;
      const uploaderId: string | undefined = req?.tokenData?.id;

      if (!uploaderId) throw new ApiError(httpStatus.NOT_FOUND, 'کاربر یافت نشد.', 'Error');

      if (!file) throw new ApiError(httpStatus.BAD_REQUEST, 'فایل بارگیری نشد.', 'Error');

      const uploadedFile = await this.fileService.uploadFile(uploaderId, file);

      res.status(httpStatus.CREATED).send({
        message: 'فایل با موفقیت دریافت شد.',
        uploadedFile
      });
    }
    catch (error) {
      throw error;
    }
  };

  public uploadUserTicketFile= async (req: Request, res: Response): Promise<any> => {
    try {
      const file = req.file as Express.Multer.File | null | undefined;
      const uploaderId = req.params.userId;
      const ticketId = req.params.ticketId;

      if (!file) throw new ApiError(httpStatus.BAD_REQUEST, 'فایل بارگیری نشد.', 'Error');

      const uploadedFile = await this.fileService.uploadUserTicketFile(uploaderId, ticketId, file);

      res.status(httpStatus.CREATED).send({
        message: 'فایل با موفقیت دریافت شد.',
        uploadedFile
      });
    }
    catch (error) {
      throw error;
    }
  };
}

export default new FileController();