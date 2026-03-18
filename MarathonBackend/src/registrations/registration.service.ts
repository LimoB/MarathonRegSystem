import { eq, and, desc } from "drizzle-orm";
import db from "../drizzle/db";
import { registrations, TRegistrationInsert, TRegistrationSelect } from "../drizzle/schema";

export type TRegistrationUpdate = Partial<TRegistrationInsert>;

/* ================================
   GET ALL REGISTRATIONS (Admin)
================================ */
export const getRegistrationsService = async () => {
  return await db.query.registrations.findMany({
    with: {
      athlete: { columns: { first_name: true, last_name: true, email: true } },
      marathon: true,
    },
    orderBy: [desc(registrations.registration_date)]
  });
};

/* ================================
   GET ATHLETE REGISTRATIONS
================================ */
export const getAthleteRegistrationsService = async (athleteId: number) => {
  return await db.query.registrations.findMany({
    where: eq(registrations.athlete_id, athleteId),
    with: {
      marathon: true,
    },
  });
};

/* ================================
   CREATE REGISTRATION
================================ */
export const createRegistrationService = async (data: TRegistrationInsert): Promise<TRegistrationSelect> => {
  const existing = await db.query.registrations.findFirst({
    where: and(
      eq(registrations.athlete_id, data.athlete_id),
      eq(registrations.marathon_id, data.marathon_id)
    ),
  });

  if (existing) throw new Error("You are already registered for this marathon");

  const [newRegistration] = await db.insert(registrations).values(data).returning();
  return newRegistration;
};

/* ================================
   UPDATE REGISTRATION (Admin/Status)
================================ */
export const updateRegistrationService = async (id: number, updates: TRegistrationUpdate) => {
  const result = await db.update(registrations).set(updates).where(eq(registrations.id, id)).returning();
  if (!result.length) throw new Error("Registration not found");
  return "Registration updated successfully";
};

/* ================================
   DELETE REGISTRATION
================================ */
export const deleteRegistrationService = async (id: number): Promise<boolean> => {
  const result = await db.delete(registrations).where(eq(registrations.id, id)).returning();
  return result.length > 0;
};