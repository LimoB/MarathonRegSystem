import { eq, desc } from "drizzle-orm";
import db from "../drizzle/db";
import { marathons, TMarathonInsert, TMarathonSelect } from "../drizzle/schema";

/* ================================
   GET ALL MARATHONS
================================ */
export const getMarathonsService = async (): Promise<TMarathonSelect[]> => {
  return await db.query.marathons.findMany({
    with: {
      createdBy: { columns: { first_name: true, last_name: true } },
      registrations: { columns: { id: true } }
    },
    orderBy: [desc(marathons.date)]
  });
};

/* ================================
   GET MARATHON BY ID
================================ */
export const getMarathonByIdService = async (id: number): Promise<TMarathonSelect | undefined> => {
  return await db.query.marathons.findFirst({
    where: eq(marathons.id, id),
    with: {
      registrations: {
        with: { athlete: { columns: { first_name: true, last_name: true } } }
      }
    }
  });
};

/* ================================
   CREATE MARATHON
================================ */
export const createMarathonService = async (data: TMarathonInsert) => {
  const [newMarathon] = await db.insert(marathons).values(data).returning();
  return newMarathon;
};

/* ================================
   UPDATE MARATHON
================================ */
export const updateMarathonService = async (id: number, updates: Partial<TMarathonInsert>) => {
  const result = await db
    .update(marathons)
    .set({ ...updates, updated_at: new Date() })
    .where(eq(marathons.id, id))
    .returning();
    
  if (!result.length) throw new Error("Marathon not found");
  return "Marathon updated successfully";
};

/* ================================
   DELETE MARATHON
================================ */
export const deleteMarathonService = async (id: number): Promise<boolean> => {
  const result = await db.delete(marathons).where(eq(marathons.id, id)).returning();
  return result.length > 0;
};