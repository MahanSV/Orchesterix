import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TicketService } from '#application/services/TicketService.ts';


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
}

export default new TicketController();