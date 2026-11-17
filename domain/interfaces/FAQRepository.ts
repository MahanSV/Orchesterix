import FAQ from '#models/FAQ.ts';


export interface FAQRepositoryInterface {
  findById(id: string): Promise<FAQ | null>;
}