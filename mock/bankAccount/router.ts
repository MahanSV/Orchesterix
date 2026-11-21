import express from 'express';
import { BankAccountMockService, GenerateBankAccount } from './bankAccountService.ts';
import httpStatus from 'http-status';

const app = express.Router();

app.get('/', (req, res) => {
  const bankAccountMockService = new BankAccountMockService();

  const userBankAccountData: GenerateBankAccount[] = bankAccountMockService.generateListOfBankAccounts();

  res.status(httpStatus.OK).send({
    message: 'لیست حساب های بانکی کاربر با موفقیت دریافت شد.',
    data: userBankAccountData
  });
});

export default app;