import express from 'express';
import userRouter from '#routes/user.ts';
import staffRouter from '#routes/staff.ts';

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
];

routes.forEach((route) => {
  router.use(route.path, route.source);
});

export default router;
