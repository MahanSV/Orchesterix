import { TicketRepositoryInterface } from '#domain/interfaces/TicketRepository.ts';
import TicketRepository from '#repositories/TicketRepository.ts';
import { TicketServiceInterface } from '#application/interfaces/TicketServiceInterface.ts';
import { TicketDTO } from '#application/dto/TicketDTO.ts';
import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import { TicketMapper } from '#application/mappers/TicketMapper.ts';
import { createTicketCommand } from '#application/types/Ticket/command.ts';
import { TicketFactory } from '#domain/factories/TicketFactory.ts';
import StaffRepository from '#repositories/StaffRepository.ts';
import { StaffRepositoryInterface } from '#domain/interfaces/StaffRepository.ts';


export class TicketService implements TicketServiceInterface {
  private ticketRepository: TicketRepositoryInterface;
  private staffRepository: StaffRepositoryInterface;

  constructor(
    ticketRepository: TicketRepositoryInterface = new TicketRepository(),
    staffRepository: StaffRepositoryInterface = new StaffRepository()
  ) {
    this.ticketRepository = ticketRepository;
    this.staffRepository = staffRepository;
  };

  async findById(id: string): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket)
      throw new ApiError(httpStatus.NOT_FOUND, 'تیکت یافت نشد.', 'Error');

    return TicketMapper.toDTO(ticket);
  };

  /*async createTicketByUser(command: createTicketCommand): Promise<TicketDTO> {
    const ticketEntity = TicketFactory.create(command);
   //  TODO: Need's to complete.
  };*/

  async ticketAnswer(id: string, answerDescription: string, staffId: string): Promise<TicketDTO> {
    const staff = await this.staffRepository.checkStaffExist(staffId);

    if (!staff)
      throw new ApiError(httpStatus.NOT_FOUND, 'کارمند پیدا نشد.', 'Error');

    const answerEntity  = TicketFactory.createAnswer(staffId, answerDescription);

    const updatedTicket = await this.ticketRepository.ticketAnswer(id, answerEntity);

    if (!updatedTicket)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام ثبت پاسخ تیکت.', 'Error');

    return TicketMapper.toDTO(updatedTicket);
  };
}
