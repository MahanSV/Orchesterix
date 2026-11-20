import express from 'express';
import userRouter from '#routes/user.ts';
import staffRouter from '#routes/staff.ts';
import faqRouter from '#routes/faq.ts';
import ticketRouter from '#routes/ticket.ts';

// @ts-ignore
const router = express.Router();

const routes = [
  {
    path: "/users",
    source: userRouter
  },
  {
    path: "/staff",
    source: staffRouter
  },
  {
    path: "/faqs",
    source: faqRouter
  },
  {
    path: "/tickets",
    source: ticketRouter
  }
];

routes.forEach((route) => {
  router.use(route.path, route.source);
});

export default router;
