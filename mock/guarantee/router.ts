import express from 'express';
import httpStatus from 'http-status';
import { BankGuaranteeService } from './bankGuaranteeService.ts';

const app = express.Router();

app.get('/', (req, res) => {

  const userBankGuarantees = BankGuaranteeService.generateMany();

  res.status(httpStatus.OK).send({
    message: 'لیست ضمانتنامه های بانکی کاربر با موفقیت دریافت شد.',
    data: userBankGuarantees
  });
});

export default app;