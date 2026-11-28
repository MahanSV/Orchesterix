import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import { errorSchema } from '#webhost/validators/errorSchema.ts';
import {
  bankAccountFacilityDTOSchema,
  createBankAccountFacilitySchema,
  getAllFilteredBankAccountFacilitiesForAdminResponseSchema,
  getAllFilteredBankAccountFacilitiesForAdminSchema,
} from '#webhost/validators/bankAccountFacility.ts';
import BankAccountFacilityController from '#webhost/controllers/bankAccountFacility.ts';

const router = express.Router();
const api = createApiRouter(router, '/bankAccountFacility');

api.get(
  '/admin',
  {
    tags: ['BankAccountFacility'],
    request: {
      query: getAllFilteredBankAccountFacilitiesForAdminSchema,
    },
    responses: {
      200: {
        description: 'Filtered BankAccountFacilities For Admin.',
        content: {
          'application/json': { schema: getAllFilteredBankAccountFacilitiesForAdminResponseSchema }
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
  validate(getAllFilteredBankAccountFacilitiesForAdminSchema),
  BankAccountFacilityController.getAllFilteredBankAccountFacilitiesForAdmin
);

api.post(
  '/',
  {
    tags: ['BankAccountFacility'],
    request: {
      body: {
        content: {
          'application/json': { schema: createBankAccountFacilitySchema }
        }
      }
    },
    responses: {
      200: {
        description: 'Create BankAccountFacilities For User.',
        content: {
          'application/json': { schema: bankAccountFacilityDTOSchema }
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
  validate(createBankAccountFacilitySchema),
  BankAccountFacilityController.createBankAccountFacility
);

export default router;