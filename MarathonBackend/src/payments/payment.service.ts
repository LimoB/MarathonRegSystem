import { eq, desc } from "drizzle-orm";
import db from "../drizzle/db";
import { payments, registrations, TPaymentInsert } from "../drizzle/schema";

/* ================================
   GET ALL PAYMENTS (Admin)
================================ */
export const getPaymentsService = async () => {
  return await db.query.payments.findMany({
    with: {
      registration: {
        with: {
          athlete: { columns: { first_name: true, last_name: true } },
          marathon: { columns: { name: true } }
        }
      }
    },
    orderBy: [desc(payments.paid_at)]
  });
};

/* ================================
   CREATE PAYMENT RECORD
================================ */
export const createPaymentService = async (data: TPaymentInsert) => {
  const [newPayment] = await db.insert(payments).values(data).returning();
  return newPayment;
};

/* ================================
   UPDATE PAYMENT STATUS (Webhook/Success)
================================ */
export const updatePaymentStatusService = async (stripeId: string, status: "completed" | "failed") => {
  const [updatedPayment] = await db
    .update(payments)
    .set({ status, paid_at: status === "completed" ? new Date() : null })
    .where(eq(payments.stripe_payment_id, stripeId))
    .returning();

  if (updatedPayment && status === "completed") {
    // Also update the registration status
    await db
      .update(registrations)
      .set({ payment_status: "completed" })
      .where(eq(registrations.id, updatedPayment.registration_id));
  }

  return updatedPayment;
};