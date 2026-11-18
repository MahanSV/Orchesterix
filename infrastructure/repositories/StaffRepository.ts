import { BaseRepository } from '#repositories/BaseRepository.ts';
import Staff from '#models/Staff.ts';
import { StaffRepositoryInterface } from '#domain/interfaces/StaffRepository.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import { StaffRole } from '#domain/enums/staff.ts';
import { staffRole } from '@prisma/client';
import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';


export default class StaffRepository extends BaseRepository<Staff> implements StaffRepositoryInterface {
  constructor() {
    super(Staff.createFromSnapshot);
  };

  async checkStaffExist(id: string): Promise<Staff | null> {
    const dataModel = await prisma.staff.findUnique({
      where: { id },
    });

    return dataModel && Staff.createFromSnapshot(dataModel);
  };

  async findById(id: string): Promise<Staff | null> {
    const dataModel = await prisma.staff.findUnique({
      where: { id },
    });

    return dataModel && Staff.createFromSnapshot(dataModel);
  };

  async getStaffByNationalId(nationalId: string, role: StaffRole): Promise<Staff | null> {
    const dataModel = await prisma.staff.findUnique({
      where: {
        nationalId_role: {
          nationalId,
          role
        }
      },
    });

    return dataModel && Staff.createFromSnapshot(dataModel);
  };

  async createStaff(entity: Staff): Promise<Staff> {
    const dataModel = await prisma.staff.create({
      data: this.createSchemaFromStaff(entity),
    });

    return dataModel && Staff.createFromSnapshot(dataModel);
  };

  createSchemaFromStaff(entity: Staff) {
    const roles = Object.values(staffRole);
    if (!roles.includes(entity.role)) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "خطای داخلی", 'Error');
    }

    return {
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      nationalId: entity.nationalId,
      role: entity.role,
      status: entity.status,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  };
};