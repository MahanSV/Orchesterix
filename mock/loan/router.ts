import express from 'express';
import httpStatus from 'http-status';
import { LoanMockService } from './loanService.ts';

const app = express.Router();

app.get('/', (req, res) => {
  const userBankLoans = LoanMockService.generateMany();

  res.status(httpStatus.OK).send({
    message: 'لیست وام های بانکی کاربر با موفقیت دریافت شد.',
    data: userBankLoans
  });
});

export default app;