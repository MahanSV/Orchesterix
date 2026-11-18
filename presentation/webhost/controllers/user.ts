import type { Request, Response } from 'express';
import UserService from '#application/services/UserService.ts';
import env from "#substructure/env.ts";
import httpStatus from 'http-status';


class UserController {
    private userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    };

    public createUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const command = {
              name: req.body.name,
              lastName: req.body.lastName,
              nationalId: req.body.nationalId,
              mobile: req.body.mobile,
              password: req.body.password,
            };

            const user = await this.userService.createUser(command);

            res.status(httpStatus.OK).send({
              message: 'کاربر با موفقیت ثبت شد.',
              user
            });
        } catch (error) {
            throw error;
        }
    };

    public getUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const id = req.params.id;

            const user = await this.userService.getUser(id);

          res.status(httpStatus.OK).send({
            message: 'کاربر با موفقیت دریافت شد.',
            user
          });
        } catch (error) {
            throw error;
        }
    };

    public loginUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const command = {
              mobile: req.body.mobile,
              password: req.body.password,
            };

            const {userInfo, token} = await this.userService.loginUser(command);

            res.cookie('AccessToken', token, {
                maxAge: env.tokenExpirationTime * 1000,
                path: '/',
                domain: env.cookieDomain,
                secure: env.environment === 'production',
                httpOnly: true,
                sameSite: 'lax',
            });

            res.status(httpStatus.OK).send({
              message: 'کاربر با موفقیت وارد شد.',
              userInfo
            });
        } catch (error) {
            throw error;
        }
    };

    public logoutUser = async (_req: Request, res: Response): Promise<any> => {
        res.clearCookie('AccessToken', {
            path: '/',
            domain: env.cookieDomain,
            secure: env.environment === 'production',
            httpOnly: true,
            sameSite: 'lax',
        });

        res.status(204).send();
    };
}

export default new UserController();