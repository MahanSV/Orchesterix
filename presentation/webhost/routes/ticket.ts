import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import TicketController from '#webhost/controllers/ticket.ts';
import { errorSchema } from '#webhost/validators/errorSchema.ts';
import { createTicketByUserSchema, ticketAnswerSchema, ticketDTOSchema } from '#webhost/validators/ticket.ts';

const router = express.Router();
const api = createApiRouter(router, '/tickets');

api.post(
  '/',
  {
    tags: ['Ticket'],
    request: {
      body: {
        content: {
          'application/json': { schema: createTicketByUserSchema }
        }
      }
    },
    responses: {
      200: {
        description: 'register Ticket',
        content: {
          'application/json': { schema: ticketDTOSchema }
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
  validate(createTicketByUserSchema),
  TicketController.createTicketByUser
);

api.patch(
  '/:id/answer',
  {
    tags: ['Ticket'],
    request: {
      params: ticketAnswerSchema.pick({ id: true }),
      body: {
        content: {
          'application/json': { schema: ticketAnswerSchema.omit({ id: true }) }
        }
      }
    },
    responses: {
      200: {
        description: 'answer Ticket',
        content: {
          'application/json': { schema: ticketDTOSchema }
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
  validate(ticketAnswerSchema),
  TicketController.ticketAnswer
);

api.patch(
  '/:id',
  {
    tags: ['Ticket'],
    request: {
      params: ticketAnswerSchema.pick({ id: true }),
      body: {
        content: {
          'application/json': { schema: ticketAnswerSchema.omit({ id: true }) }
        }
      }
    },
    responses: {
      200: {
        description: 'answer Ticket',
        content: {
          'application/json': { schema: ticketDTOSchema }
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
  validate(ticketAnswerSchema),
  TicketController.ticketAnswer
);