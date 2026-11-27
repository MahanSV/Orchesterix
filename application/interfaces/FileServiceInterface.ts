
export interface FileServiceInterface {
  downloadFile(uploaderId: string): Promise<string>;
  uploadFile(uploaderId: string, file: Express.Multer.File): Promise<string>;
  uploadUserTicketFile(uploaderId: string, ticketId: string, file: Express.Multer.File): Promise<string>;
}