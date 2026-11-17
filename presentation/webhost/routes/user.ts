import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import UserController from '#webhost/controllers/user.ts';
import {
    createUserSchema,
    deleteUserSchema,
    getUserByEmailSchema,
    getUserSchema,
    updateUserSchema,
    simpleUserDTO,
    userDTOSchema, loginUserSchema, userLoginDTOSchema,
} from "#webhost/validators/user.ts";
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import {errorSchema} from "#webhost/validators/errorSchema.ts";

const router = express.Router();
const api = createApiRouter(router, '/users');

api.post(
    '/',
    {
        tags: ['Users'],
        request: {
            body: {
                content: {
                    'application/json': { schema: createUserSchema }
                }
            }
        },
        responses: {
            200: {
                description: 'add user',
                content: {
                    'application/json': { schema: userDTOSchema }
                }
            }
        }
    },
    authenticate,
    validate(createUserSchema),
    UserController.createUser
);

api.post(
    '/login',
    {
        tags: ['Users'],
        request: {
            body: {
                content: {
                    'application/json': { schema: loginUserSchema }
                }
            }
        },
        responses: {
          200: {
              description: 'add user',
              content: {
                  'application/json': { schema: userLoginDTOSchema }
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
    validate(loginUserSchema),
    UserController.loginUser
);

api.post(
    '/logout',
    {
        tags: ['Users'],
        responses: {
            204: { description: 'Logged out' }
        }
    },
    UserController.logoutUser
);

api.get(
    '/:id',
    {
        tags: ['Users'],
        request: {
            params: getUserSchema
        },
        responses: {
            200: {
                description: 'Single user',
                content: {
                    'application/json': { schema: simpleUserDTO }
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
    validate(getUserSchema),
    UserController.getUser
);

export default router;