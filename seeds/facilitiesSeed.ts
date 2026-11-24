import prisma from '#context/dbContext/prisma/client.ts';
import { FacilityCategoryFactory } from '#domain/factories/FacilityCategoryFactory.ts';
import { FacilityTemplateFactory } from '#domain/factories/FacilityTemplateFactory.ts';
import { FacilityFieldFactory } from '#domain/factories/FacilityFieldFactory.ts';
import { FacilitiesCategoryServiceInterface } from '#application/interfaces/FacilitiesCategoryServiceInterface.ts';
import { FacilitiesCategoryService } from '#application/services/FacilitiesCategoryService.ts';
import { FacilityTemplateService } from '#application/services/FacilityTemplateService.ts';
import { FacilityTemplateServiceInterface } from '#application/interfaces/FacilityTemplateServiceInterface.ts';

class FacilitiesSeed {
  private readonly facilitiesCategoryList: { name: string, key: string, order: number }[] = [
    {
      name: "وام",
      key: "Loan",
      order: 1,
    },
    {
      name: "ضمانتامه",
      key: "Guarantee",
      order: 2,
    },
    {
      name: "سفته الکترونیکی",
      key: "Electronic Promissory Note",
      order: 3,
    },
    {
      name: "مشارکت",
      key: "Participation",
      order: 4,
    },
  ];

  private readonly facilityTemplatesList = [
    // وام
    {
      value: "وام سرمایه در گردش",
      key: "Working Capital Loan",
      order: 1,
      facilitiesCategoryId: ""
    },
    {
      value: "وام خرید تجهیزات",
      key: "Equipment Financing",
      order: 2,
      facilitiesCategoryId: ""
    },
    {
      value: "وام خرید ملک تجاری",
      key: "Commercial Property Loan",
      order: 3,
      facilitiesCategoryId: ""
    },
    // ضمانتنامه
    {
      value: "ضمانت‌نامه شرکت در مناقصه",
      key: "Bid Bond",
      order: 1,
      facilitiesCategoryId: ""
    },
    {
      value: "ضمانت‌نامه حسن انجام تعهدات",
      key: "Performance Bond",
      order: 2,
      facilitiesCategoryId: ""
    },
    {
      value: "ضمانت‌نامه پیش‌پرداخت",
      key: "Advance Payment Guarantee",
      order: 3,
      facilitiesCategoryId: ""
    },
    // سفته الکترونیکی
    {
      value: "",
      key: "",
      order: 1,
      facilitiesCategoryId: ""
    },
    // مشارکت
    {
      value: "مشارکت مدنی",
      key: "Civil Partnership",
      order: 1,
      facilitiesCategoryId: ""
    },
    {
      value: "مشارکت در پروژه تولیدی",
      key: "Manufacturing project Partnership",
      order: 2,
      facilitiesCategoryId: ""
    },
  ];

  private readonly facilityFieldsList = [
    /**
     * وام (Loan)
    */
    // وام سرمایه در گردش
    {
      value: "مبلغ درخواستی",
      facilityTemplateId: ""
    },
    {
      value: "مدت بازپرداخت",
      facilityTemplateId: ""
    },
    {
      value: "نوع ضمانت",
      facilityTemplateId: ""
    },
    {
      value: "هدف مصرف تسهیلات",
      facilityTemplateId: ""
    },
    // وام خرید تجهیزات
    {
      value: "مبلغ درخواستی",
      facilityTemplateId: ""
    },
    {
      value: "فاکتور یا پیش‌فاکتور خرید",
      facilityTemplateId: ""
    },
    {
      value: "مشخصات تجهیزات",
      facilityTemplateId: ""
    },
    // وام خرید ملک تجاری
    {
      value: "مبلغ درخواستی",
      facilityTemplateId: ""
    },
    {
      value: "مشخصات ملک",
      facilityTemplateId: ""
    },
    {
      value: "سند یا مدارک مالکیت",
      facilityTemplateId: ""
    },
    {
      value: "مدت بازپرداخت",
      facilityTemplateId: ""
    },
    {
      value: "ارزش تقریبی ملک",
      facilityTemplateId: ""
    },
    /**
     * ضمانتنامه
     */
    // ضمانت‌نامه شرکت در مناقصه
    {
      value: "مبلغ ضمانت‌نامه",
      facilityTemplateId: ""
    },
    {
      value: "نام ذی‌نفع",
      facilityTemplateId: ""
    },
    {
      value: "شماره مناقصه",
      facilityTemplateId: ""
    },
    {
      value: "تاریخ اعتبار",
      facilityTemplateId: ""
    },
    {
      value: "اسناد مناقصه",
      facilityTemplateId: ""
    },
    // ضمانت‌نامه حسن انجام تعهدات
    {
      value: "مبلغ ضمانت‌نامه",
      facilityTemplateId: ""
    },
    {
      value: "مشخصات قرارداد",
      facilityTemplateId: ""
    },
    {
      value: "نام ذی‌نفع",
      facilityTemplateId: ""
    },
    {
      value: "تاریخ شروع",
      facilityTemplateId: ""
    },
    {
      value: "تاریخ پایان",
      facilityTemplateId: ""
    },
    // ضمانت‌نامه پیش‌پرداخت
    {
      value: "مبلغ پیش‌پرداخت",
      facilityTemplateId: ""
    },
    {
      value: "مبلغ ضمانت‌نامه",
      facilityTemplateId: ""
    },
    {
      value: "مشخصات قرارداد",
      facilityTemplateId: ""
    },
    {
      value: "ذی‌نفع",
      facilityTemplateId: ""
    },
    {
      value: "تاریخ اعتبار",
      facilityTemplateId: ""
    },
    /**
     * سفته
     */
    /**
     * مشارکت
     */
    // مشارکت مدنی
    {
      value: "مبلغ سرمایه موردنیاز",
      facilityTemplateId: ""
    },
    {
      value: "سهم متقاضی از سرمایه",
      facilityTemplateId: ""
    },
    {
      value: "سهم مورد درخواست از بانک",
      facilityTemplateId: ""
    },
    {
      value: "موضوع فعالیت",
      facilityTemplateId: ""
    },
    {
      value: "مدت مشارکت",
      facilityTemplateId: ""
    },
    {
      value: "پیش‌بینی سود",
      facilityTemplateId: ""
    },
    // مشارکت در پروژه تولیدی
    {
      value: "عنوان پروژه",
      facilityTemplateId: ""
    },
    {
      value: "محل اجرای پروژه",
      facilityTemplateId: ""
    },
    {
      value: "سرمایه کل پروژه",
      facilityTemplateId: ""
    },
    {
      value: "سرمایه متقاضی",
      facilityTemplateId: ""
    },
    {
      value: "سرمایه درخواستی از بانک",
      facilityTemplateId: ""
    },
    {
      value: "طرح توجیهی اقتصادی",
      facilityTemplateId: ""
    },
  ];

  private facilityCategoryService: FacilitiesCategoryServiceInterface;

  private facilityTemplateService: FacilityTemplateServiceInterface;

  constructor(
    facilitiesCategoryService: FacilitiesCategoryServiceInterface = new FacilitiesCategoryService(),
    facilityTemplateService: FacilityTemplateServiceInterface = new FacilityTemplateService(),
  ) {
    this.facilityCategoryService = facilitiesCategoryService;
    this.facilityTemplateService = facilityTemplateService;
  };

  public initialize() {};

  private async createFacilitiesCategory(): Promise<{ id: string, name: string }[]> {
    const result: { id: string, name: string }[] = [];

    for (const fc of this.facilitiesCategoryList) {
      const facilityCategory =  await this.facilityCategoryService.createFacilityCategoryForSeed(fc);

      result.push({
        id: facilityCategory.id,
        name: facilityCategory.name,
      });
    }

    return result;
  };

  private async createFacilityTemplate(facilitiesCategoryData: { id: string, name: string }[]) {
    // Find Categories ID
    const targetLoanCategoryId = facilitiesCategoryData.find(fc => fc.name === "Loan")?.id;
    const targetGuaranteeCategoryId = facilitiesCategoryData.find(fc => fc.name === "Guarantee")?.id;
    const targetPromissoryCategoryId = facilitiesCategoryData.find(fc => fc.name === "Electronic Promissory Note")?.id;
    const targetParticipationCategoryId = facilitiesCategoryData.find(fc => fc.name === "Participation")?.id;

    for (const ft of this.facilityTemplatesList) {
      const facilityTemplate = await this.facilityTemplateService.createForSeed({
        value: ft.value,
        key: ft.key,
        order: ft.order,
        facilitiesCategoryId: ft.,
      });
    }
  };

  // TODO: Need's to complete
}