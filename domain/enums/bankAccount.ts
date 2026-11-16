
export enum BankAccountStatus {
  active = 'ACTIVE',
  inActive = 'INACTIVE',
  dormant = 'DORMANT', // راکد: حساب برای مدتی طولانی بدون فعالیت مؤثر مانده است.
  blocked = 'BLOCKED', // دسترسی به بخشی یا تمام عملیات حساب محدود شده است.
  pendingActivation = 'PENDING_ACTIVATION', // در حال افتتاح: فرایند افتتاح انجام شده، اما حساب هنوز آماده استفاده نیست.
  closed = 'CLOSED'
}

export enum bankAccountType {
  current = "CURRENT", // برای دریافت و پرداخت‌های روزمره، انتقال وجه و استفاده از خدمات چک.
  qarzAlHasanSaving = "QARZ_AL_HASAN_SAVINGS", // برای نگهداری و پس‌انداز وجه؛ ممکن است مشمول قرعه‌کشی یا جوایز بانکی باشد.
  shortTermOrdinary = "SHORT_TERM_ORDINARY", // امکان برداشت و واریز با شرایط سپرده را دارد و طبق ضوابط بانکی به آن سود تعلق می‌گیرد.
  shortTermSpecial = "SHORT_TERM_SPECIAL", // سپرده‌ای با شرایط و دوره مشخص که ضوابط پرداخت سود و برداشت آن تابع قرارداد و محصول بانکی است.
  longTerm = "LONG_TERM" // برای نگهداری وجه در یک دوره قراردادی مشخص، با شرایط سود و برداشت مطابق قرارداد.
}