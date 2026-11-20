import { TicketRepositoryInterface } from '#domain/interfaces/TicketRepository.ts';
import TicketRepository from '#repositories/TicketRepository.ts';
import { TicketServiceInterface } from '#application/interfaces/TicketServiceInterface.ts';
import { TicketDTO } from '#application/dto/TicketDTO.ts';
import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import { TicketMapper } from '#application/mappers/TicketMapper.ts';
import {
  changeTicketStatusCommand,
  changeTitleAndDescriptionCommand,
  createTicketCommand,
  ticketFiltersQuery,
} from '#application/types/Ticket/command.ts';
import { TicketFactory } from '#domain/factories/TicketFactory.ts';
import StaffRepository from '#repositories/StaffRepository.ts';
import { StaffRepositoryInterface } from '#domain/interfaces/StaffRepository.ts';
import { TicketStatus } from '#domain/enums/ticket.ts';


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


  async changeTitleAndDescription(command: changeTitleAndDescriptionCommand): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.findById(command.id);

    if (!ticket)
      throw new ApiError(httpStatus.NOT_FOUND, 'تیکت یافت نشد.', 'Error');

    const updatedTicket = await this.ticketRepository.changeTitleAndDescription(command);

    if (!updatedTicket)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام به روزرسانی تیکت.', 'Error');

    return TicketMapper.toDTO(updatedTicket);
  };

  async deleteTicket(id: string): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket)
      throw new ApiError(httpStatus.NOT_FOUND, 'تیکت یافت نشد.', 'Error');

    const deletedTicket = await this.ticketRepository.deleteTicket(id);

    if (!deletedTicket)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام به حذف تیکت.', 'Error');

    return TicketMapper.toDTO(deletedTicket);
  };

  async getUserTickets(userId: string): Promise<TicketDTO[]> {
    const userTickets = await this.ticketRepository.getUserTickets(userId);

    return userTickets.length > 0 ? TicketMapper.toDTOList(userTickets): [];
  };

  async getAllTicketsWithFilter(query: ticketFiltersQuery): Promise<{
    tickets: TicketDTO[],
    total: number,
    page: number,
    totalPages: number,
  }> {
    const result = await this.ticketRepository.getAllTicketsWithFilter(query);

    const ticketsDTOs = result.tickets.length > 0 ? TicketMapper.toDTOList(result.tickets) : [];

    return {
      tickets: ticketsDTOs,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages
    };
  };

  async changeTicketStatus(command: changeTicketStatusCommand): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.findById(command.id);

    if (!ticket)
      throw new ApiError(httpStatus.NOT_FOUND, 'تیکت یافت نشد.', 'Error');


    const updatedTicket = await this.ticketRepository.changeTicketStatus(command);

    if (!updatedTicket)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام به روزرسانی تیکت.', 'Error');

    return TicketMapper.toDTO(updatedTicket);
  };

  async staffClosingTicket(id: string, staffId: string): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket)
      throw new ApiError(httpStatus.NOT_FOUND, 'تیکت یافت نشد.', 'Error');

    const staff = await this.staffRepository.findById(staffId);

    if (!staff)
      throw new ApiError(httpStatus.BAD_REQUEST, 'کارمند موجود نیست.', 'Error');

    const updatedData = {
      id: id,
      status: TicketStatus.closed,
      closedAt: new Date(),
    };

    const closedTicket = await this.ticketRepository.staffClosingTicket(updatedData);

    if (!closedTicket)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام به روزرسانی تیکت.', 'Error');

    return TicketMapper.toDTO(closedTicket);
  };
}
