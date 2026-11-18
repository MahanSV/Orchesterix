import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import { createStaffCommand, loginStaffCommand } from '#application/types/staff/command.ts';
import { StaffDTO, StaffLoginDTO } from '#application/dto/StaffDTO.ts';
import { StaffServiceInterface } from '#application/interfaces/StaffServiceInterface.ts';
import StaffRepository from '#repositories/StaffRepository.ts';
import { StaffRepositoryInterface } from '#domain/interfaces/StaffRepository.ts';
import { compare } from '#substructure/utils/encryption.ts';
import { generateJWSToken } from '#application/services/TokenService.ts';
import { add } from 'date-fns';
import env from '#substructure/env.ts';
import RedisDataModel from '#context/dbContext/redis/dataModel/redisDataModel.ts';
import { tokenKeyStructure } from '#context/dbContext/redis/redisStrcuture/userStructures.ts';
import { redisSet } from '#context/dbContext/redis/redis.ts';
import { StaffMapper } from '#application/mappers/StaffMapper.ts';
import { StaffFactory } from '#domain/factories/StaffFactory.ts';


export default class StaffService implements StaffServiceInterface {
  private staffRepository: StaffRepositoryInterface;

  constructor(staffRepository: StaffRepositoryInterface = new StaffRepository()) {
    this.staffRepository = staffRepository;
  }

  async login(command: loginStaffCommand): Promise<StaffLoginDTO> {
    const staff = await this.staffRepository.getStaffByNationalId(
      command.nationalId, command.role
    );

    if (!staff)
      throw new ApiError(httpStatus.NOT_FOUND, 'رمز عبور یا کد ملی صحیح نمی باشد.', 'Error');

    const isPasswordCorrect = compare(
      staff.password,
      command.password
    );

    if (!isPasswordCorrect)
      throw new ApiError(httpStatus.NOT_FOUND, "رمز عبور یا کد ملی نادرست می باشد.", "Error");

    const token = await generateJWSToken({
      id: staff.id,
      nationalId: staff.nationalId,
      tokenCreatedAt: new Date(),
      tokenExpireAt: add(new Date(), { seconds: env.tokenExpirationTime }),
    });

    const loginDTO = StaffMapper.toStaffLoginDTO(staff, token);

    const tokenDataModel = RedisDataModel.create(loginDTO.token, tokenKeyStructure(staff.nationalId));
    await redisSet(tokenDataModel);

    return loginDTO;
  };

  async createStaff(command: createStaffCommand): Promise<StaffDTO> {
    const staff = await this.staffRepository.getStaffByNationalId(
      command.nationalId, command.role
    );

    if (staff)
      throw new ApiError(httpStatus.BAD_REQUEST, 'کاربر در سیستم وجود دارد.', 'Error');

    const staffEntity = StaffFactory.create(command);

    const addStaff = await this.staffRepository.createStaff(staffEntity);

    if (!addStaff)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "خطا در هنگام ثبت کاربر", "Error");

    return StaffMapper.toDTO(addStaff);
  };
}