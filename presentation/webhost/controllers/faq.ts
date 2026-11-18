import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { FAQService } from '#application/services/FAQService.ts';


class FAQController {
  private faqService: FAQService;

  constructor(faqService = new FAQService()) {
    this.faqService = faqService
  };

  public getAllFAQs = async (req: Request, res: Response): Promise<any> => {
    try {
      const faq = await this.faqService.getAllFAQs();

      res.status(httpStatus.OK).send({
        message: 'سوالات پر تکرار با موفقیت دریافت شد.',
        faq
      });
    }
    catch (error) {
      throw error;
    }
  };

  public getFAQById = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;

      const faq = await this.faqService.getFAQById(id);

      res.status(httpStatus.OK).send({
        message: 'سوال پر تکرار با موفقیت دریافت شد.',
        faq
      });
    }
    catch (error) {
      throw error;
    }
  };

  public createFAQ = async (req: Request, res: Response): Promise<any> => {
    try {
      const command = {
        question: req.body.question,
        answer: req.body.answer,
        order: req.body.order,
      };

      const faq = await this.faqService.createFAQ(command);

      res.status(httpStatus.OK).send({
        message: 'سوال پر تکرار با موفقیت ایجاد شد.',
        faq
      });
    }
    catch (error) {
      throw error;
    }
  };

  public updateFAQ = async (req: Request, res: Response): Promise<any> => {
    try {
      const command = {
        id: req.params.id,
        question: req.body.question,
        answer: req.body.answer,
      };

      const faq = await this.faqService.updateFAQ(command);

      res.status(httpStatus.OK).send({
        message: 'سوال پر تکرار با به روزرسانی دریافت شد.',
        faq
      });
    }
    catch (error) {
      throw error;
    }
  };

  public updateFAQOrders = async (req: Request, res: Response): Promise<any> => {
    try {
      const command = {
        orders: req.body.orders,
      };

      const faq = await this.faqService.updateFAQOrders(command);

      res.status(httpStatus.OK).send({
        message: 'سوال پر تکرار با به روزرسانی دریافت شد.',
        faq
      });
    }
    catch (error) {
      throw error;
    }
  };

  public deleteFAQ = async (req: Request, res: Response): Promise<any> => {
    try {
      const id = req.params.id;

      const faq = await this.faqService.deleteFAQ(id);

      res.status(httpStatus.OK).send({
        message: 'سوال پر تکرار با موفقیت حذف شد.',
        faq
      });
    }
    catch (error) {
      throw error;
    }
  };
}

export default new FAQController();