import express from 'express';
import httpStatus from 'http-status';
import { AccountAcitivtyService } from './accountAcitivtyService.ts';

const app = express.Router();

app.get('/:sheba', (req, res) => {
  const shebaId = req.params.sheba;

  const accountActivity = AccountAcitivtyService.generateRandomNumber();

  const result = {
    shebaId,
    accountActivity
  };

  res.status(httpStatus.OK).send({
    message: 'گردش حساب بانکی کاربر با موفقیت دریافت شد.',
    data: result
  });
});

export default app;