import FAQ from '#models/FAQ.ts';
import crypto from 'crypto';
import { createFAQCommand } from '#application/types/FAQ/command.ts';

export class FAQFactory {
  /**
   * Creates a new FAQ entity
   */
  public static create(command: createFAQCommand): FAQ {
    // Add any domain logic or validation here before creating the entity
    return FAQ.create({
      id : crypto.randomUUID(), // Generate ID if isn't provided
      question: command.question,
      answer: command.answer,
      order: Number(command.order),
      createdAt: command.createdAt || Date.now(),
      updatedAt: command.updatedAt || Date.now(),
    });
  };
}