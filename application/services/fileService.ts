import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import { FileServiceInterface } from '#application/interfaces/FileServiceInterface.ts';
import fileManagerService from '#context/tabaS3/s3.ts';
import { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import UserRepository from '#repositories/UserRepository.ts';
import { TicketRepositoryInterface } from '#domain/interfaces/TicketRepository.ts';
import TicketRepository from '#repositories/TicketRepository.ts';

export class FileService implements FileServiceInterface {
  private userRepository: UserRepositoryInterface;
  private ticketRepository: TicketRepositoryInterface;

  constructor(
    userRepository: UserRepositoryInterface = new UserRepository(),
    ticketRepository: TicketRepositoryInterface = new TicketRepository(),
  ) {
    this.userRepository = userRepository;
    this.ticketRepository = ticketRepository;
  }

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

  async uploadUserTicketFile(uploaderId: string, ticketId: string, file: Express.Multer.File): Promise<string> {
    const user = await this.userRepository.getUserById(uploaderId);

    if (!user)
      throw new ApiError(httpStatus.NOT_FOUND, 'کاربر یافت نشد.', 'Error');

    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket)
      throw new ApiError(httpStatus.NOT_FOUND, 'تیکت یافت نشد.', 'Error');

    const uploadedFile = await fileManagerService.fileUploader(file, uploaderId);

    if (!uploadedFile)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام بارگذاری فایل.', 'Error');

    const updatedTicket = await this.ticketRepository.updateTicketAttachment(ticket.id, uploadedFile);

    if (!updatedTicket)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام به روزرسانی تیکت.', 'Error');

    return uploadedFile;
  };
}