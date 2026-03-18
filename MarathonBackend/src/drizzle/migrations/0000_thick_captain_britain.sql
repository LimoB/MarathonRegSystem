CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."registration_category_enum" AS ENUM('male_under_18', 'male_18_25', 'male_26_35', 'male_36_50', 'male_50_plus', 'female_under_18', 'female_18_25', 'female_26_35', 'female_36_50', 'female_50_plus');--> statement-breakpoint
CREATE TYPE "public"."role_enum" AS ENUM('athlete', 'admin');--> statement-breakpoint
CREATE TABLE "marathons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"date" timestamp NOT NULL,
	"distance_km" integer NOT NULL,
	"sponsor_name" text DEFAULT '',
	"organizer_name" text DEFAULT '',
	"created_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration_id" integer NOT NULL,
	"amount" integer NOT NULL,
	"method" text NOT NULL,
	"stripe_payment_id" varchar(255) DEFAULT '',
	"status" "payment_status_enum" DEFAULT 'pending',
	"paid_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"athlete_id" integer NOT NULL,
	"marathon_id" integer NOT NULL,
	"category" "registration_category_enum" NOT NULL,
	"bib_number" integer,
	"registration_date" timestamp DEFAULT now(),
	"payment_status" "payment_status_enum" DEFAULT 'pending',
	CONSTRAINT "registrations_bib_number_unique" UNIQUE("bib_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "role_enum" DEFAULT 'athlete' NOT NULL,
	"phone" varchar(20),
	"dob" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "marathons" ADD CONSTRAINT "marathons_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_registration_id_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."registrations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_athlete_id_users_id_fk" FOREIGN KEY ("athlete_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_marathon_id_marathons_id_fk" FOREIGN KEY ("marathon_id") REFERENCES "public"."marathons"("id") ON DELETE no action ON UPDATE no action;