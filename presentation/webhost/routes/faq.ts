import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import FAQController from '#webhost/controllers/faq.ts';
import { errorSchema } from '#webhost/validators/errorSchema.ts';
import {
  FAQDTOSchema, getFAQByIdSchema,
  createFAQSchema, updateFAQSchema,
  updateFAQOrdersSchema, deleteFAQSchema
} from '#webhost/validators/FAQ.ts';

const router = express.Router();
const api = createApiRouter(router, '/faqs');

api.get(
  '/',
  {
    tags: ['FAQ'],
    responses: {
      200: {
        description: 'Single FAQ',
        content: {
          'application/json': { schema: z.array(FAQDTOSchema) }
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
  FAQController.getAllFAQs
);

api.get(
  '/:id',
  {
    tags: ['FAQ'],
    request: {
     params: getFAQByIdSchema
    },
    responses: {
      200: {
        description: 'Single FAQ',
        content: {
          'application/json': { schema: FAQDTOSchema }
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
  validate(getFAQByIdSchema),
  FAQController.getFAQById
);

api.post(
  '/',
  {
    tags: ['FAQ'],
    request: {
      body: {
        content: {
          'application/json': { schema: createFAQSchema }
        }
      }
    },
    responses: {
      200: {
        description: 'add FAQ',
        content: {
          'application/json': { schema: FAQDTOSchema }
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
  validate(createFAQSchema),
  FAQController.createFAQ
);

api.patch(
  '/:id',
  {
    tags: ['FAQ'],
    request: {
      params: updateFAQSchema.pick({ id: true }),
      body: {
        content: {
          'application/json': { schema: updateFAQSchema.omit({ id: true })}
        }
      }
    },
    responses: {
      200: {
        description: 'update FAQ',
        content: {
          'application/json': { schema: FAQDTOSchema }
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
  validate(updateFAQSchema),
  FAQController.updateFAQ
);

api.put(
  '/',
  {
    tags: ['FAQ'],
    request: {
      body: {
        description: 'update orders',
        content: {
          'application/json': { schema: updateFAQOrdersSchema}
        }
      }
    },
    responses: {
      200: {
        description: 'update orders',
        content: {
          'application/json': { schema: z.array(FAQDTOSchema) }
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
  validate(updateFAQOrdersSchema),
  FAQController.updateFAQOrders
);

api.delete(
  '/:id',
  {
    tags: ['FAQ'],
    request: {
      params: deleteFAQSchema
    },
    responses: {
      200: {
        description: 'delete FAQ',
        content: {
          'application/json': { schema:FAQDTOSchema }
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
  validate(deleteFAQSchema),
  FAQController.deleteFAQ
);

export default router;