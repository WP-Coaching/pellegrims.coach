import { StripeRegistrationButton } from "@/components/StripeRegistrationButton";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

interface EnrollmentFormProps {
  locale: Locale;
}

export default function EnrollmentFormTuesday({ locale }: EnrollmentFormProps) {
  // Use swimTuesday translations
  // Use swimTuesday translations
  const { payment } = getTranslations(locale).swimTuesday;

  // New environment variable for Tuesday
  const tuesdayUrl = process.env.NEXT_PUBLIC_STRIPE_BOOK_TUESDAY_URL;

  return (
    <section className="space-y-4">
      <div className="space-y-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-athletic-dark">
          {payment.title}
        </h3>
        <p className="text-sm text-athletic-dark/70">{payment.intro}</p>
      </div>

      <div className="mx-auto max-w-md">
        <div className="flex h-full flex-col justify-between gap-3 rounded-lg border border-ocean-200 bg-ocean-50/40 p-6">
          <div className="text-center sm:text-left">
            <div className="text-lg font-semibold text-athletic-dark">
              {payment.advanced}
            </div>
            <div className="text-athletic-dark/70">{payment.advancedTime}</div>
          </div>
          <StripeRegistrationButton
            url={tuesdayUrl}
            locale={locale}
            className="w-full justify-center"
          >
            {payment.advancedCta}
          </StripeRegistrationButton>
        </div>
      </div>
    </section>
  );
}
