import express from 'express';
import multer from "multer";
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import validate from '#middlewares/validation.ts';
import FileController from '#webhost/controllers/file.ts'
import { errorSchema } from '#webhost/validators/errorSchema.ts';
import { z } from 'zod';
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { uploadUserTicketFileParamsSchema } from '#webhost/validators/file.ts';


const router = express.Router();
const upload = multer();
const api = createApiRouter(router, '/files');


api.post(
  '/',
  {
    tags: ['Files'],
    request: {
      body: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  nullable: true
                }
              }
            },
            encoding: {
              files: {
                style: "form"
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'upload file',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              uploadedFile: z.string(),
            })
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
  upload.single('file'),
  // authenticate,
  FileController.uploadFile
);

api.get(
  '/download-link',
  {
    tags: ['Files'],
    request: {
      query: z.object({ id: z.string() })
    },
    responses: {
      200: {
        description: 'upload file',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              link: z.string(),
            })
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
    },
  },
  FileController.downloadFile
);

api.post(
  '/ticket/user/:userId/:ticketId',
  {
    tags: ['Files'],
    request: {
        headers: z.object({
          cookie: z.string().openapi({
            example: 'AccessToken=YOUR_TOKEN',
            description: 'Authentication cookie',
          }),
        }),
      params: uploadUserTicketFileParamsSchema,
      body: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  nullable: true,
                },
              },
            },
            encoding: {
              files: {
                style: 'form',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Ticket attachment uploaded.',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
              uploadedFile: z.string(),
            }),
          },
        },
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
      401: {
        description: 'Unauthenticated',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
      404: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: z.object({
              error: z.string(),
            }),
          },
        },
      },
    },
  },
  upload.single('file'),
  authenticate,
  validate(uploadUserTicketFileParamsSchema),
  FileController.uploadUserTicketFile,
);

export default router;