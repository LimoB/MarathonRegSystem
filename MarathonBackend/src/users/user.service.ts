import { eq, desc } from "drizzle-orm";
import  db  from "../drizzle/db";
import { users, TUserInsert, TUserSelect } from "../drizzle/schema";
import bcrypt from "bcrypt";

type PublicUser = Omit<TUserSelect, "password_hash">;

/* ================================
   GET ALL USERS (With Marathon Stats)
================================ */
export const getUsersService = async () => {
  return await db.query.users.findMany({
    columns: { password_hash: false },
    with: {
      marathonsCreated: { columns: { id: true } }, // Stats for Admins
      registrations: { columns: { id: true } },    // Stats for Athletes
    },
    orderBy: [desc(users.created_at)]
  });
};

/* ================================
   GET USER BY ID (Full Relations)
================================ */
export const getUserByIdService = async (userId: number) => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { password_hash: false },
    with: {
      marathonsCreated: true,
      registrations: {
        with: { marathon: true }
      }
    }
  });
};

/* ================================
   CREATE USER
================================ */
export const createUserService = async (user: TUserInsert): Promise<PublicUser> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password_hash, salt);

  const [newUser] = await db.insert(users).values({
    ...user,
    password_hash: hashedPassword,
  }).returning();

  const { password_hash, ...safeUser } = newUser;
  return safeUser;
};

/* ================================
   UPDATE USER (ADMIN)
================================ */
export const updateUserService = async (userId: number, updates: Partial<TUserInsert>) => {
  const payload = { ...updates };

  if (payload.password_hash) {
    const salt = await bcrypt.genSalt(10);
    payload.password_hash = await bcrypt.hash(payload.password_hash, salt);
  }

  const result = await db.update(users).set(payload).where(eq(users.id, userId)).returning();
  if (!result.length) throw new Error("User not found");
  return "User updated successfully";
};

/* ================================
   UPDATE PROFILE (Restricted)
================================ */
export const updateProfileService = async (userId: number, updates: Partial<TUserInsert>) => {
  const payload = { ...updates };
  
  // Security: Prevent users from self-promoting to Admin
  delete (payload as any).role;

  if (payload.password_hash) {
    const salt = await bcrypt.genSalt(10);
    payload.password_hash = await bcrypt.hash(payload.password_hash, salt);
  }

  const result = await db.update(users).set(payload).where(eq(users.id, userId)).returning();
  if (!result.length) throw new Error("User not found");
  return "Profile updated successfully";
};

/* ================================
   DELETE USER
================================ */
export const deleteUserService = async (userId: number): Promise<boolean> => {
  const result = await db.delete(users).where(eq(users.id, userId)).returning();
  return result.length > 0;
};