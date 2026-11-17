import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import { errorSchema } from '#webhost/validators/errorSchema.ts';
import { createStaff, loginStaffSchema, staffDTOSchema } from '#webhost/validators/staff.ts';
import StaffController from '#webhost/controllers/staff.ts';

const router = express.Router();
const api = createApiRouter(router, '/staff');

api.post(
  '/',
  {
    tags: ['staff'],
    request: {
      body: {
        content: {
          'application/json': { schema: createStaff }
        }
      }
    },
    responses: {
      200: {
        description: 'Staff login',
        content: {
          'application/json': { schema: staffDTOSchema }
        }
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: errorSchema
          }
        },
      },
      401: {
        description: 'Unauthenticated',
        content: {
          'application/json': { schema: errorSchema }
        }
      },
      404: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: errorSchema
          }
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: z.object({
              error: z.string()
            })
          }
        }
      }
    }
  },
  authenticate,
  validate(createStaff),
  StaffController.createStaff
);

api.post(
  '/login',
  {
    tags: ['staff'],
    request: {
      body: {
        content: {
          'application/json': { schema: loginStaffSchema }
        }
      }
    },
    responses: {
      200: {
        description: 'Staff login',
        content: {
          'application/json': { schema: staffDTOSchema }
        }
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: errorSchema
          }
        },
      },
      401: {
        description: 'Unauthenticated',
        content: {
          'application/json': { schema: errorSchema }
        }
      },
      404: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: errorSchema
          }
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: z.object({
              error: z.string()
            })
          }
        }
      }
    }
  },
  authenticate,
  validate(loginStaffSchema),
  StaffController.login
);

export default router;