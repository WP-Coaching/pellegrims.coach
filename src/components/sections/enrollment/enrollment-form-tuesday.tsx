import { StripeRegistrationButton } from "@/components/sections/enrollment/stripe-registration-button";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";
import { Container, Stack } from "@/components/ui/layout";
import { Card } from "@/components/ui/card";
import { FormHeader, FormSection } from "@/components/ui/forms";

interface EnrollmentFormProps {
  locale: Locale;
}

export default function EnrollmentFormTuesday({ locale }: EnrollmentFormProps) {
  // Use swimTuesday translations
  // Use swimTuesday translations
  const { payment } = getTranslations(locale).swimTuesday;

  // New environment variable for Tuesday
  const tuesdayUrl: string | undefined =
    process.env.NEXT_PUBLIC_STRIPE_BOOK_TUESDAY_URL;

  return (
    <FormSection>
      <FormHeader title={payment.title} intro={payment.intro} />

      <Container maxWidth="md" padding="none">
        <Card variant="soft" padding="md" interactive={false}>
          <Stack gap={3} fullHeight justify="between">
            <FormHeader
              title={payment.advanced}
              intro={payment.advancedTime}
              level="div"
              variant="card"
            />
            <StripeRegistrationButton url={tuesdayUrl} locale={locale}>
              {payment.advancedCta}
            </StripeRegistrationButton>
          </Stack>
        </Card>
      </Container>
    </FormSection>
  );
}
