import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["name", "email", "subject", "createdAt", "read"],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user, // Only signed-in users (admins) can read
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "subject",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "locale",
      type: "select",
      options: [
        { label: "English", value: "en" },
        { label: "Dutch", value: "nl" },
      ],
      defaultValue: "en",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "read",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        // Mark as read when an admin views a single document
        if (
          req.user &&
          req.routeParams?.id &&
          doc.read === false &&
          !req.context?.skipReadUpdate
        ) {
          // Update in background to avoid blocking the response
          req.payload
            .update({
              collection: "contact-submissions",
              id: doc.id,
              data: { read: true },
              context: { skipReadUpdate: true },
            })
            .catch((err: Error) =>
              console.error("Failed to mark submission as read:", err)
            );
          // Return doc with read: true so UI shows correct state immediately
          return { ...doc, read: true };
        }
        return doc;
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === "create") {
          // 1. Notify Admin
          try {
            await req.payload.sendEmail({
              to:
                process.env.CONTACT_EMAIL_DESTINATION ||
                process.env.PAYLOAD_ADMIN_EMAIL ||
                "ward@pellegrims.coach",
              subject: `New Contact Form Submission: ${doc.subject}`,
              html: /* HTML */ `
                <h1>New Submission from ${doc.name}</h1>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Subject:</strong> ${doc.subject}</p>
                <p><strong>Language:</strong> ${doc.locale}</p>
                <p><strong>Message:</strong></p>
                <pre>${doc.message}</pre>
                <p>
                  <a
                    href="${process.env
                      .NEXT_PUBLIC_SERVER_URL}/admin/collections/contact-submissions/${doc.id}"
                    >View in Admin</a
                  >
                </p>
              `,
            });
          } catch (err) {
            console.error("Failed to send admin notification email:", err);
          }

          // 2. Auto-reply to User (Bilingual)
          const isDutch = doc.locale === "nl";
          const subject = isDutch
            ? "We hebben je bericht ontvangen!"
            : "We received your message!";
          const content = isDutch
            ? /* HTML */ `
                <p>Dag ${doc.name},</p>
                <p>
                  Bedankt voor je bericht. We hebben je bericht over
                  "${doc.subject}" goed ontvangen en nemen zo snel mogelijk
                  contact met je op.
                </p>
                <p>Met vriendelijke groeten,</p>
                <p>Het Pellegrims Coach Team</p>
              `
            : /* HTML */ `
                <p>Hi ${doc.name},</p>
                <p>
                  Thanks for reaching out to us. We have received your message
                  regarding "${doc.subject}" and will get back to you as soon as
                  possible.
                </p>
                <p>Best regards,</p>
                <p>The Pellegrims Coach Team</p>
              `;

          try {
            await req.payload.sendEmail({
              to: doc.email,
              subject,
              html: content,
            });
          } catch (err) {
            console.error("Failed to send auto-reply email:", err);
          }
        }
      },
    ],
  },
};
