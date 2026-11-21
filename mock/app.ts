import express from 'express';
import env from '#substructure/env.ts';
import BankAccountsRouter from './bankAccount/router.ts';
import accountActivityRouter from './accountActivity/router.ts';
import guaranteeRouter from './guarantee/router.ts';
import loansRouter from './loan/router.ts';
import pointsRouter from './point/router.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send("Mock server is up and running!")
});

app.use('/banAccounts', BankAccountsRouter);
app.use('/accountActivities', accountActivityRouter);
app.use('/guarantees', guaranteeRouter);
app.use('/loans', loansRouter);
app.use('/points', pointsRouter);

app.listen(env.mockPort, () => {
  console.log("Mock Server is running on http://localhost:" + env.mockPort);
});