🏃‍♂️ RUNSYS | Marathon Management EcosystemRUNSYS is a high-performance, full-stack marathon registration and management platform. Designed for both elite athletes and event organizers, it streamlines the journey from the starting line to the financial ledger.✨ Key Features👤 For AthletesIntuitive Race Discovery: Browse upcoming marathons with high-fidelity visual cards.Demographic-Targeted Registration: Smart registration flow that categorizes athletes by age and gender for accurate scoring.Personal Dashboard: Track active registrations, view payment status, and access digital race history.Secure Payments: Integrated Stripe-ready payment ledger.🛡️ For AdministratorsEvent Engine: Full CRUD (Create, Read, Update, Delete) suite for managing race distances, locations, and organizers.Athlete Directory: Oversight of all platform users with role-based access control (RBAC).Registration Ledger: Monitor every sign-up, bib assignment status, and entry category.Financial Command Center: Real-time revenue tracking, gross income analytics, and transaction lookup via Stripe IDs.🛠 Tech StackFrontendReact 18 (TypeScript)Redux Toolkit (AsyncThunks for state management)Tailwind CSS (Premium "Nike-style" UI design)Lucide React (Consistent iconography)React Hot Toast (User feedback & notifications)BackendNode.js & ExpressDrizzle ORM (Type-safe SQL queries)PostgreSQL (Relational data storage)Zod (Schema validation)🚀 Getting StartedPrerequisitesNode.js (v18 or higher)PostgreSQL instanceInstallationClone the repositoryBashgit clone https://github.com/LimoB/MarathonRegSystem.git
cd marathon-reg-system
Install DependenciesBash# Install Frontend
cd frontend && npm install

# Install Backend
cd ../backend && npm install
Environment SetupCreate a .env file in the backend directory:Code snippetDATABASE_URL=postgres://user:password@localhost:5432/marathon_db
JWT_SECRET=your_ultra_secret_key
STRIPE_SECRET_KEY=sk_test_...
Database MigrationBashnpx drizzle-kit generate:pg
npx drizzle-kit push:pg
Start Development ServersBash# Backend
npm run dev

# Frontend
cd ../frontend && npm run dev
🏗 Database ArchitectureThe system uses a strictly typed schema to ensure data integrity:Users: Stores roles (admin vs athlete) and authentication data.Marathons: Contains event specifics (Distance, Location, Organizer).Registrations: Links athletes to races via a demographic ENUM (male_18_25, etc.).Payments: Tracks transaction IDs and completion statuses.📸 UI PreviewAdmin DashboardAthlete Portal📜 LicenseDistributed under the MIT License. See LICENSE for more information.Built with ⚡ by [Boaz Limo/Emmanuel Kipketer]Want to contribute? Feel free to open a Pull Request!