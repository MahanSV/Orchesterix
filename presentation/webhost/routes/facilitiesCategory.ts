import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import { errorSchema } from '#webhost/validators/errorSchema.ts';
import {
  facilitiesCategoryDTOSchema,
  getFacilitiesCategoryByIdSchema,
} from '#webhost/validators/facilitiesCategory.ts';
import FacilitiesCategoryController from '#webhost/controllers/facilitiesCategory.ts'

const router = express.Router();
const api = createApiRouter(router, '/facilitiesCategory');

api.get(
  '/',
  {
    tags: ['FacilitiesCategory'],
    responses: {
      200: {
        description: 'FacilitiesCategory List.',
        content: {
          'application/json': { schema: z.array(facilitiesCategoryDTOSchema) }
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
            schema: errorSchema
          }
        },
      }
    }
  },
  // authenticate,
  FacilitiesCategoryController.getAllFacilitiesCategory
);

api.get(
  '/:id',
  {
    tags: ['FacilitiesCategory'],
    request: {
      params: getFacilitiesCategoryByIdSchema
    },
    responses: {
      200: {
        description: 'Single FacilitiesCategory',
        content: {
          'application/json': { schema: facilitiesCategoryDTOSchema }
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
            schema: errorSchema
          }
        },
      }
    }
  },
  // authenticate,
  validate(getFacilitiesCategoryByIdSchema),
  FacilitiesCategoryController.getFacilitiesCategoryById
);

export default router;