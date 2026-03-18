import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("role_enum", ["athlete", "admin"]);
export const paymentStatusEnum = pgEnum("payment_status_enum", ["pending", "completed", "failed"]);
export const registrationCategoryEnum = pgEnum("registration_category_enum", [
  "male_under_18",
  "male_18_25",
  "male_26_35",
  "male_36_50",
  "male_50_plus",
  "female_under_18",
  "female_18_25",
  "female_26_35",
  "female_36_50",
  "female_50_plus",
]);

// Users table (athletes & admins)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash").notNull(),
  role: roleEnum("role").notNull().default("athlete"),
  phone: varchar("phone", { length: 20 }),
  dob: timestamp("dob"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Marathons table
export const marathons = pgTable("marathons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  distance_km: integer("distance_km").notNull(),
  sponsor_name: text("sponsor_name").default(""),
  organizer_name: text("organizer_name").default(""),
  created_by: integer("created_by").references(() => users.id).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Registrations table
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  athlete_id: integer("athlete_id").references(() => users.id).notNull(),
  marathon_id: integer("marathon_id").references(() => marathons.id).notNull(),
  category: registrationCategoryEnum("category").notNull(),
  bib_number: integer("bib_number").unique(),
  registration_date: timestamp("registration_date").defaultNow(),
  payment_status: paymentStatusEnum("payment_status").default("pending"),
});

// Payments table
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  registration_id: integer("registration_id").references(() => registrations.id).notNull(),
  amount: integer("amount").notNull(),
  method: text("method").notNull(), // e.g., stripe, mpesa
  stripe_payment_id: varchar("stripe_payment_id", { length: 255 }).default(""),
  status: paymentStatusEnum("status").default("pending"),
  paid_at: timestamp("paid_at"),
});

///////////////////////
// Relations
///////////////////////

// Users relations
export const userRelations = relations(users, ({ many }) => ({
  marathonsCreated: many(marathons),
  registrations: many(registrations),
}));

// Marathons relations
export const marathonRelations = relations(marathons, ({ one, many }) => ({
  createdBy: one(users, { fields: [marathons.created_by], references: [users.id] }),
  registrations: many(registrations),
}));

// Registrations relations
export const registrationRelations = relations(registrations, ({ one, many }) => ({
  athlete: one(users, { fields: [registrations.athlete_id], references: [users.id] }),
  marathon: one(marathons, { fields: [registrations.marathon_id], references: [marathons.id] }),
  payments: many(payments),
}));

// Payments relations
export const paymentRelations = relations(payments, ({ one }) => ({
  registration: one(registrations, { fields: [payments.registration_id], references: [registrations.id] }),
}));

///////////////////////
// Types
///////////////////////

export type TUserInsert = typeof users.$inferInsert;
export type TUserSelect = typeof users.$inferSelect;

export type TMarathonInsert = typeof marathons.$inferInsert;
export type TMarathonSelect = typeof marathons.$inferSelect;

export type TRegistrationInsert = typeof registrations.$inferInsert;
export type TRegistrationSelect = typeof registrations.$inferSelect;

export type TPaymentInsert = typeof payments.$inferInsert;
export type TPaymentSelect = typeof payments.$inferSelect;