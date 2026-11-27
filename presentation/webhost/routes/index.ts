import express from 'express';
import userRouter from '#routes/user.ts';
import staffRouter from '#routes/staff.ts';
import faqRouter from '#routes/faq.ts';
import ticketRouter from '#routes/ticket.ts';
import userInqueryRouter from '#routes/userInquery.ts';
import fileRouter from '#routes/file.ts';
import FacilitiesCategoryRouter from '#routes/facilitiesCategory.ts';
import bankAccountFacilityRouter from '#routes/bankAccountFacility.ts';

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
  },
  {
    path: '/userInquiries',
    source: userInqueryRouter
  },
  {
    path: '/files',
    source: fileRouter
  },
  {
    path: '/facilitiesCategory',
    source: FacilitiesCategoryRouter
  },
  {
    path: '/bankAccountFacility',
    source: bankAccountFacilityRouter
  },
];

routes.forEach((route) => {
  router.use(route.path, route.source);
});

export default router;
