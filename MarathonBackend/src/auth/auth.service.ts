import { eq } from "drizzle-orm";
import  db  from "../drizzle/db"; // Adjust path to your db instance
import { users, TUserInsert, TUserSelect } from "../drizzle/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type SafeUser = Omit<TUserSelect, "password_hash">;

// ────────────────────────────────
// REGISTER SERVICE
// ────────────────────────────────
export const registerService = async (
  userData: TUserInsert
): Promise<SafeUser> => {
  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, userData.email),
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password_hash, salt);

  // Insert user
  const [newUser] = await db
    .insert(users)
    .values({
      ...userData,
      password_hash: hashedPassword,
    })
    .returning();

  const { password_hash, ...safeUser } = newUser;
  return safeUser;
};

// ────────────────────────────────
// LOGIN SERVICE
// ────────────────────────────────
export const loginService = async (
  email: string,
  password: string
): Promise<{ user: SafeUser; token: string }> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET not configured");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "1d" }
  );

  const { password_hash: _, ...safeUser } = user;
  return { user: safeUser, token };
};