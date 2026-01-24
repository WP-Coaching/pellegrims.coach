import { StripeRegistrationButton } from "@/components/sections/enrollment/stripe-registration-button";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { Grid, Stack } from "@/components/ui/layout";
import { Card } from "@/components/ui/card";
import { FormHeader, FormSection } from "@/components/ui/forms";

interface EnrollmentFormProps {
  locale: Locale;
}

export default function EnrollmentForm({ locale }: EnrollmentFormProps) {
  const { payment } = getTranslations(locale).swimWinter;

  const beginnersUrl: string | undefined =
    process.env.NEXT_PUBLIC_STRIPE_BOOK_BEGINNERS_URL;
  const advancedUrl: string | undefined =
    process.env.NEXT_PUBLIC_STRIPE_BOOK_ADVANCED_URL;

  return (
    <FormSection>
      <FormHeader title={payment.title} intro={payment.intro} />

      <Grid cols={1} sm={2} gap={4}>
        <Card variant="soft" padding="sm" fullHeight interactive={false}>
          <Stack gap={3} fullHeight justify="between">
            <FormHeader
              title={payment.beginners}
              intro={payment.beginnersTime}
              level="div"
              variant="card"
              align="left"
            />
            <StripeRegistrationButton url={beginnersUrl} locale={locale}>
              {payment.beginnersCta}
            </StripeRegistrationButton>
          </Stack>
        </Card>
        <Card variant="soft" padding="sm" fullHeight interactive={false}>
          <Stack gap={3} fullHeight justify="between">
            <FormHeader
              title={payment.advanced}
              intro={payment.advancedTime}
              level="div"
              variant="card"
              align="left"
            />
            <StripeRegistrationButton url={advancedUrl} locale={locale}>
              {payment.advancedCta}
            </StripeRegistrationButton>
          </Stack>
        </Card>
      </Grid>
    </FormSection>
  );
}
