import { StripeRegistrationButton } from "@/components/StripeRegistrationButton";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

interface EnrollmentFormProps {
  locale: Locale;
}

export default function EnrollmentForm({ locale }: EnrollmentFormProps) {
  const { payment } = getTranslations(locale).swimWinter;

  const beginnersUrl = process.env.NEXT_PUBLIC_STRIPE_BOOK_BEGINNERS_URL;
  const advancedUrl = process.env.NEXT_PUBLIC_STRIPE_BOOK_ADVANCED_URL;

  return (
    <section className="space-y-4">
      <div className="space-y-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-athletic-dark">
          {payment.title}
        </h3>
        <p className="text-sm text-athletic-dark/70">{payment.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex h-full flex-col justify-between gap-3 rounded-lg border border-ocean-200 bg-ocean-50/40 p-4">
          <div>
            <div className="font-semibold text-athletic-dark">
              {payment.beginners}
            </div>
            <div className="text-sm text-athletic-dark/70">
              {payment.beginnersTime}
            </div>
          </div>
          <StripeRegistrationButton url={beginnersUrl} locale={locale}>
            {payment.beginnersCta}
          </StripeRegistrationButton>
        </div>
        <div className="flex h-full flex-col justify-between gap-3 rounded-lg border border-ocean-200 bg-ocean-50/40 p-4">
          <div>
            <div className="font-semibold text-athletic-dark">
              {payment.advanced}
            </div>
            <div className="text-sm text-athletic-dark/70">
              {payment.advancedTime}
            </div>
          </div>
          <StripeRegistrationButton url={advancedUrl} locale={locale}>
            {payment.advancedCta}
          </StripeRegistrationButton>
        </div>
      </div>
    </section>
  );
}
