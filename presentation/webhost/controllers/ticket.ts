import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TicketService } from '#application/services/TicketService.ts';
import ApiError from '#webhost/errors/apiError.ts';
import { TicketStatus } from '#domain/enums/ticket.ts';
import { ticketFiltersQuery } from '#application/types/Ticket/command.ts';


class TicketController {
  private ticketService: TicketService;
  constructor(ticketService: TicketService = new TicketService()) {
    this.ticketService = ticketService;
  };

  public getTicketById = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;

      const ticket = await this.ticketService.findById(id);

      res.status(httpStatus.OK).send({
        message: 'تیکت با موفقیت دریافت شد.',
        ticket
      });
    }
    catch (error) {
      throw error;
    }
  };

  public createTicketByUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const command = {};

      const ticket = await this.ticketService.createTicketByUser(command);

      res.status(httpStatus.OK).send({
        message: 'تیکت با موفقیت دریافت شد.',
        ticket
      });
    }
    catch (error) {
      throw error;
    }
  };

  public ticketAnswer = async (req: Request, res: Response): Promise<any> => {
    const ticket = await this.ticketService.ticketAnswer(
      req.params.id,
      req.body.answerDescription,
      req.body.staffId
    );

    res.status(httpStatus.OK).send({
      message: 'تیکت با موفقیت دریافت شد.',
      ticket
    });
  };

  public changeTitleAndDescription = async (req: Request, res: Response): Promise<any> => {
    const command = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
    };

    const ticket = await this.ticketService.changeTitleAndDescription(command);

    res.status(httpStatus.OK).send({
      message: 'تیکت با موفقیت به روزرسانی شد.',
      ticket
    });
  };

  public deleteTicket = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    const ticket = await this.ticketService.deleteTicket(id);

    res.status(httpStatus.OK).send({
      message: 'تیکت با موفقیت حذف شد.',
      ticket
    });
  };

  public getUserTickets = async (req: Request, res: Response): Promise<any> => {
    const userId = req.params.id;

    if (typeof userId !== 'string')
      throw new ApiError(httpStatus.BAD_REQUEST, 'توکن نامعتبر است.', 'Error');

    const ticket = await this.ticketService.getUserTickets(userId);

    res.status(httpStatus.OK).send({
      message: 'لیست تیکت های کاربر با موفقیت دریافت شد.',
      ticket
    });
  };

  public getAllTicketsWithFilter = async (req: Request, res: Response): Promise<any> => {
    const query: ticketFiltersQuery = {
      status: req.query.status?.toString() as TicketStatus | undefined,
      search: req.query.search?.toString(),
      page: Number(req.query.page) || 1,
      limit:  Number(req.query.limit) || 10,
      sortOrder: req.query.sortOrder as 'asc' | 'desc',
    };

    if (!query.sortOrder) query.sortOrder = 'desc';

    if (query.status) {
      const allTicketStatus = Object.values(TicketStatus);

      if (!allTicketStatus.includes(query.status))
        throw new ApiError(httpStatus.BAD_REQUEST, 'وضعیت نامعتبر است.', 'Error');
    }

    const ticket = await this.ticketService.getAllTicketsWithFilter(query);

    res.status(httpStatus.OK).send({
      message: 'لیست تیکت ها با موفقیت دریافت شد.',
      ticket
    });
  };

  public changeTicketStatus = async (req: Request, res: Response): Promise<any> => {
    const command = {
      id: req.params.id,
      status: req.body.status,
    };

    const ticket = await this.ticketService.changeTicketStatus(command);

    res.status(httpStatus.OK).send({
      message: 'تیکت با موفقیت آپدیت شد.',
      ticket
    });
  };

  public staffClosingTicket = async (req: Request, res: Response): Promise<any> => {
    const id = req.body.id;
    const staffId = req.body.staffId;

    const ticket = await this.ticketService.staffClosingTicket(id, staffId);

    res.status(httpStatus.OK).send({
      message: 'تیکت با موفقیت بسته شد.',
      ticket
    });
  };
}

export default new TicketController();