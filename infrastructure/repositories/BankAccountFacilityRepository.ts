import { BaseRepository } from '#repositories/BaseRepository.ts';
import BankAccountFacility from '#models/BankAccountFacility.ts';
import { BankAccountFacilityRepositoryInterface } from '#domain/interfaces/BankAccountFacilityRepository.ts';
import prisma from '#context/dbContext/prisma/client.ts';
import { adminFilterQueryCommand } from '#application/types/bankAccountFacility/command.ts';


export default class BankAccountFacilityRepository extends BaseRepository<BankAccountFacility> implements BankAccountFacilityRepositoryInterface {
  constructor() {
    super(BankAccountFacility.createFromSnapshot);
  };

  async findById(id: string): Promise<BankAccountFacility | null> {
    const dataModel = await prisma.bankAccountFacility.findUnique({
      where: { id },
    });

    return dataModel && BankAccountFacility.createFromSnapshot(dataModel);
  };

  async getAllFilteredBankAccountFacilitiesForAdmin(
    query: adminFilterQueryCommand
  ): Promise<{
    bankAccountFacilities: BankAccountFacility[],
    total: number,
    page: number,
    totalPages: number,
  }> {
    const where: any = {};

    if (query?.mobile || query?.nationalId) {
      where.bankAccount = {
        user: {},
      };

      if (query.mobile) where.bankAccount.user.mobile = query.mobile;

      if (query.nationalId) where.bankAccount.user.nationalId = query.nationalId;
    }

    const skip = (query.page - 1) * query.limit;

    const [dataModels, total] = await Promise.all([
      prisma.bankAccountFacility.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: {
          createdAt: query.sortOrder,
        },
        include: {
          bankAccount: {
            include: {
              user: true,
            },
          },
        },
      }),

      prisma.bankAccountFacility.count({ where }),
    ]);

    return {
      bankAccountFacilities: dataModels.map(data =>
        BankAccountFacility.createFromSnapshot(data)
      ),
      total,
      page: query.page,
      totalPages: Math.ceil(total / query.limit),
    };
  }
}