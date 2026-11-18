
export type createFAQCommand = {
  question: string;
  answer: string;
  order: string;
};

export type updateFAQCommand = {
  id: string;
  question: string;
  answer: string;
};

export type updateFAQOrderCommand = {
  orders: {
    id: string;
    order: number;
  }[];
};