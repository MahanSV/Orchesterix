import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import TicketController from '#webhost/controllers/ticket.ts';
import { errorSchema } from '#webhost/validators/errorSchema.ts';
import {
  changeTicketStatusSchema,
  changeTitleAndDescriptionSchema,
  createTicketByUserSchema,
  deleteTicketSchema,
  getAllTicketsWithFilterResponseSchema,
  getAllTicketsWithFilterSchema, getTicketByIdSchema,
  staffClosingTicketSchema,
  ticketAnswerSchema,
  ticketDTOSchema,
} from '#webhost/validators/ticket.ts';

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
  // authenticate,
  validate(createTicketByUserSchema),
  TicketController.createTicketByUser
);

api.patch(
  '/:id/staff-replies',
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
  // authenticate,
  validate(ticketAnswerSchema),
  TicketController.ticketAnswer
);

api.patch(
  '/:id/user',
  {
    tags: ['Ticket'],
    request: {
      params: changeTitleAndDescriptionSchema.pick({ id: true }),
      body: {
        content: {
          'application/json': { schema: changeTitleAndDescriptionSchema.omit({ id: true }) }
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
  // authenticate,
  validate(changeTitleAndDescriptionSchema),
  TicketController.changeTitleAndDescription
);

api.patch(
  '/:id/user',
  {
    tags: ['Ticket'],
    request: {
      params: changeTitleAndDescriptionSchema.pick({ id: true }),
      body: {
        content: {
          'application/json': { schema: changeTitleAndDescriptionSchema.omit({ id: true }) }
        }
      }
    },
    responses: {
      200: {
        description: 'update title and description of Ticket',
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
  // authenticate,
  validate(changeTitleAndDescriptionSchema),
  TicketController.changeTitleAndDescription
);

api.delete(
  '/:id',
  {
    tags: ['Ticket'],
    request: {
      params: deleteTicketSchema
    },
    responses: {
      200: {
        description: 'delete Ticket',
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
  // authenticate,
  validate(deleteTicketSchema),
  TicketController.deleteTicket
);

api.get(
  '/:id',
  {
    tags: ['Ticket'],
    request: {
      params: getTicketByIdSchema
    },
    responses: {
      200: {
        description: 'Ticket',
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
  // authenticate,
  TicketController.getTicketById
)

api.get(
  '/:id/user',
  {
    tags: ['Ticket'],
    request: {
      params: getTicketByIdSchema
    },
    responses: {
      200: {
        description: 'user Tickets',
        content: {
          'application/json': { schema: z.array(ticketDTOSchema) }
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
  // authenticate,
  TicketController.getUserTickets
);

api.get(
  '/',
  {
    tags: ['Ticket'],
    request: {
      query: getAllTicketsWithFilterSchema
    },
    responses: {
      200: {
        description: 'user Tickets',
        content: {
          'application/json': { schema: getAllTicketsWithFilterResponseSchema }
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
  // authenticate,
  TicketController.getAllTicketsWithFilter
);

api.patch(
  '/:id',
  {
    tags: ['Ticket'],
    request: {
      params: changeTicketStatusSchema.pick({ id: true }),
      body: {
        description: 'update Ticket status',
        content: {
          'application/json': { schema:  changeTicketStatusSchema.omit({ id: true }) }
        }
      }
    },
    responses: {
      200: {
        description: 'delete Ticket',
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
  // authenticate,
  TicketController.changeTicketStatus
);

api.patch(
  '/close',
  {
    tags: ['Ticket'],
    request: {
      body: {
        description: 'update Ticket status',
        content: {
          'application/json': { schema:  staffClosingTicketSchema }
        }
      }
    },
    responses: {
      200: {
        description: 'delete Ticket',
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
  // authenticate,
  TicketController.staffClosingTicket
);

export default router;