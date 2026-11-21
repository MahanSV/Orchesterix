import express from 'express';
import  authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import UserInqueryController from '#webhost/controllers/userInquery.ts';
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import {errorSchema} from "#webhost/validators/errorSchema.ts";
import {
  createInqueryFromWebServiceSchema,
  getUserInqueryByIdSchema,
  userInqueryDTOSchema,
} from '#webhost/validators/userInquery.ts';

const router = express.Router();
const api = createApiRouter(router, '/userInquiries');

api.get(
  '/:id',
  {
    tags: ['UserInquiries'],
    request: {
      params: getUserInqueryByIdSchema
    },
    responses: {
      200: {
        description: 'UserInquiry',
        content: {
          'application/json': { schema: userInqueryDTOSchema }
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
        description: 'Unauthorized',
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
  // authenticate,
  validate(getUserInqueryByIdSchema),
  UserInqueryController.getUserInqueryById
);

api.post(
  '/',
  {
    tags: ['UserInquiries'],
    request: {
      body: {
        description: 'request user inquery from web services',
        content: {
          'application/json': { schema: createInqueryFromWebServiceSchema }
        }
      }
    },
    responses: {
      200: {
        description: 'UserInquiry',
        content: {
          'application/json': { schema: z.object({ message: z.string() })
          }
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
        description: 'Unauthorized',
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
  // authenticate,
  validate(createInqueryFromWebServiceSchema),
  UserInqueryController.getUserInqueryById
);

export default router;