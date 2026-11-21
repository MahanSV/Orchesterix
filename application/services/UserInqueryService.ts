import { UserInqueryServiceInterface } from '#application/interfaces/UserInqueryServiceInterface.ts';
import { UserInqueryRepositoryInterface } from '#domain/interfaces/UserInqueryRepository.ts';
import UserInqueryRepository from '#repositories/UserInqueryRepository.ts';
import { UserInqueryDTO } from '#application/dto/UserInqueryDTO.ts';
import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import { UserInqueryMapper } from '#application/mappers/UserInqueryMapper.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import UserRepository from '#repositories/UserRepository.ts';
import queueManager from '#context/bullMQ/queueManager.ts';


export default class UserInqueryService implements UserInqueryServiceInterface {
  private userInqueryRepository: UserInqueryRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(
    userInqueryRepository: UserInqueryRepositoryInterface = new UserInqueryRepository(),
    userRepository: UserRepositoryInterface = new UserRepository()
  ) {
    this.userInqueryRepository = userInqueryRepository;
    this.userRepository = userRepository;
  };

  async findById(id: string): Promise<UserInqueryDTO> {
    const userInquery = await this.userInqueryRepository.findById(id);

    if (!userInquery)
      throw new ApiError(httpStatus.NOT_FOUND, 'استعلامات کاربر یافت نشد.', 'Error');

    return UserInqueryMapper.toDTO(userInquery);
  };

  async createInqueryFromWebService(userId: string): Promise<boolean> {
    const user = await this.userRepository.getUserById(userId);

    if (!user)
      throw new ApiError(httpStatus.BAD_REQUEST, 'کاربر یافت نشد.', 'Error');

    await queueManager.addJob("Bank-Accounts", {
      userId: user.id,
    });

    return true;
  };
}