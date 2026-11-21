import express from 'express';
import httpStatus from 'http-status';

const app = express.Router();

app.get('/', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 99) + 1;

  res.status(httpStatus.OK).send({
    message: 'امتیاز بانکی کاربر با موفقیت دریافت شد.',
    data: randomNumber
  });
});

export default app;