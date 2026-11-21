import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import UserRepository from '#repositories/UserRepository.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import type {UserServiceInterface} from '#application/interfaces/UserServiceInterface.ts';
import {UserMapper} from "#application/mappers/UserMapper.ts";
import {UserDTO, UserLoginDTO} from "#application/dto/UserDTO.ts";
import { createUserCommand, loginUserCommand, updateUserCommand } from '#application/types/user/command.ts';
import {UserFactory} from "#domain/factories/UserFactory.ts";
import {tokenKeyStructure} from "#context/dbContext/redis/redisStrcuture/userStructures.ts";
import RedisDataModel from "#context/dbContext/redis/dataModel/redisDataModel.ts";
import {redisSet} from "#context/dbContext/redis/redis.ts";
import {generateJWSToken} from "#application/services/TokenService.ts";
import {add} from "date-fns";
import env from "#substructure/env.ts";
import { compare } from '#substructure/utils/encryption.ts';

export default class UserService implements UserServiceInterface {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface = new UserRepository()) {
        this.userRepository = userRepository;
    };

    async getAllUsers(): Promise<UserDTO[]> {
      const allUsers = await this.userRepository.getAllUsers();

      return allUsers.length > 0 ? UserMapper.toDTOList(allUsers) : [];
    };

    async createUser(command: createUserCommand): Promise<UserDTO> {
        const existingUser = await this.userRepository.getUserByNationalIdAndMobile(
          command.nationalId, command.mobile
        );

        if (existingUser)
          throw new ApiError(httpStatus.BAD_REQUEST, "کاربر قبلا ثبت نام شده.", "Error");

        const userEntity = UserFactory.create(command);

        const addUser = await this.userRepository.createUser(userEntity);

        if (!addUser)
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام ثبت کاربر.', 'Error');

        return UserMapper.toDTO(userEntity);
    };

    async getUser(id: string): Promise<UserDTO> {
        const user = await this.userRepository.getUserById(id);

        if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Failed to get user.", "Error");

        return UserMapper.toDTO(user);
    };

    async loginUser(command: loginUserCommand): Promise<UserLoginDTO> {
        const user = await this.userRepository.getUserByMobile(command.mobile);

        if (!user)
          throw new ApiError(httpStatus.NOT_FOUND, "رمز عبور یا شماره تلفن نادرست می باشد. ", "Error");

        const isPasswordCorrect = compare(
          user.password,
          command.password
        );

        if (!isPasswordCorrect)
            throw new ApiError(httpStatus.NOT_FOUND, "رمز عبور یا شماره تلفن نادرست می باشد.", "Error");

        const token = await generateJWSToken({
            id: user.id,
            mobile: user.mobile,
            nationalId: user.nationalId,
            tokenCreatedAt: new Date(),
            tokenExpireAt: add(new Date(), { seconds: env.tokenExpirationTime }),
        });

        const loginDTO = UserMapper.toLoginUserDTO(user, token);

        const tokenDataModel = RedisDataModel.create(loginDTO.token, tokenKeyStructure(user.nationalId));
        await redisSet(tokenDataModel);

        return loginDTO;
    };

    async updateUser(command: updateUserCommand): Promise<UserDTO> {
      const user = await this.userRepository.getUserById(command.id);

      if (!user)
        throw new ApiError(httpStatus.NOT_FOUND, 'کاربر یافت نشد.', 'Error');

      user.id = command.id || user.id;
      user.name = command.name || user.name;
      user.lastName = command.lastName || user.lastName;
      user.nationalId = command.nationalId || user.nationalId;
      user.mobile = command.mobile || user.mobile;
      user.status = command.status || user.status;
      user.password = command.password || user.password;
      user.createdAt = command.createdAt || user.createdAt;
      user.updatedAt = command.updatedAt || user.updatedAt;

      const updatedUser = await this.userRepository.updateUser(user);

      if (!updatedUser)
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'خطا در هنگام به روزرسانی کاربر.', 'Error');

      return UserMapper.toDTO(updatedUser);
    };
};