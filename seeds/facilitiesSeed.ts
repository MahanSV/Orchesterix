import { FacilitiesCategoryServiceInterface } from '#application/interfaces/FacilitiesCategoryServiceInterface.ts';
import { FacilitiesCategoryService } from '#application/services/FacilitiesCategoryService.ts';
import { FacilityTemplateService } from '#application/services/FacilityTemplateService.ts';
import { FacilityTemplateServiceInterface } from '#application/interfaces/FacilityTemplateServiceInterface.ts';
import { FacilityFieldServiceInterface } from '#application/interfaces/FacilityFieldServiceInterface.ts';
import { FacilityFieldService } from '#application/services/FacilityFieldService.ts';

export interface FacilityField {
  value: string;
  facilityTemplateId: string;
}

export interface FacilityTemplate {
  value: string;
  key: string;
  order: number;
  facilitiesCategoryId: string;
  facilityFields: FacilityField[];
}

export interface FacilitiesCategory {
  name: string;
  key: string;
  order: number;
  facilityTemplates: FacilityTemplate[];
}

export type FacilitiesCategoryList = FacilitiesCategory[];

class FacilitiesSeed {
  private readonly facilitiesCategoryList: FacilitiesCategoryList = [
    {
      name: "وام",
      key: "Loan",
      order: 1,
      facilityTemplates: [
        {
          value: "وام سرمایه در گردش",
          key: "Working Capital Loan",
          order: 1,
          facilitiesCategoryId: "",
          facilityFields: [
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
          ],
        },
        {
          value: "وام خرید تجهیزات",
          key: "Equipment Financing",
          order: 2,
          facilitiesCategoryId: "",
          facilityFields: [
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
          ],
        },
        {
          value: "وام خرید ملک تجاری",
          key: "Commercial Property Loan",
          order: 3,
          facilitiesCategoryId: "",
          facilityFields: [
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
          ],
        },
      ],
    },
    {
      name: "ضمانتامه",
      key: "Guarantee",
      order: 2,
      facilityTemplates: [
        {
          value: "ضمانت‌نامه شرکت در مناقصه",
          key: "Bid Bond",
          order: 1,
          facilitiesCategoryId: "",
          facilityFields: [
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
          ],
        },
        {
          value: "ضمانت‌نامه حسن انجام تعهدات",
          key: "Performance Bond",
          order: 2,
          facilitiesCategoryId: "",
          facilityFields: [
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
          ],
        },
        {
          value: "ضمانت‌نامه پیش‌پرداخت",
          key: "Advance Payment Guarantee",
          order: 3,
          facilitiesCategoryId: "",
          facilityFields: [
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
          ],
        },
      ]
    },
    {
      name: "سفته الکترونیکی",
      key: "Electronic Promissory Note",
      order: 3,
      facilityTemplates: [
        {
          value: "",
          key: "",
          order: 1,
          facilitiesCategoryId: "",
          facilityFields: [],
        },
      ]
    },
    {
      name: "مشارکت",
      key: "Participation",
      order: 4,
      facilityTemplates: [
        {
          value: "مشارکت مدنی",
          key: "Civil Partnership",
          order: 1,
          facilitiesCategoryId: "",
          facilityFields: [
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
          ],
        },
        {
          value: "مشارکت در پروژه تولیدی",
          key: "Manufacturing project Partnership",
          order: 2,
          facilitiesCategoryId: "",
          facilityFields: [
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
          ],
        },
      ]
    },
  ];

  private facilityCategoryService: FacilitiesCategoryServiceInterface;

  private facilityTemplateService: FacilityTemplateServiceInterface;

  private facilityFieldService: FacilityFieldServiceInterface;

  constructor(
    facilitiesCategoryService: FacilitiesCategoryServiceInterface = new FacilitiesCategoryService(),
    facilityTemplateService: FacilityTemplateServiceInterface = new FacilityTemplateService(),
    facilityFieldService: FacilityFieldServiceInterface = new FacilityFieldService(),
  ) {
    this.facilityCategoryService = facilitiesCategoryService;
    this.facilityTemplateService = facilityTemplateService;
    this.facilityFieldService = facilityFieldService;
  };

  public async initialize(): Promise<void> {
    for (const category of this.facilitiesCategoryList) {
      const createdCategory =
        await this.facilityCategoryService.createFacilityCategory(category);

      for (const template of category.facilityTemplates) {
        const createdTemplate =
          await this.facilityTemplateService.create({
            ...template,
            facilitiesCategoryId: createdCategory.id,
          });

        for (const field of template.facilityFields) {
          await this.facilityFieldService.create({
            ...field,
            facilityTemplateId: createdTemplate.id,
          });
        }
      }
    }
  }

}

async function facilitiesSeed(): Promise<void> {
  const facilitiesSeed = new FacilitiesSeed();

  await facilitiesSeed.initialize();
}

await facilitiesSeed();