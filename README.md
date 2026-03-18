# 🏃‍♂️ RUNSYS | Marathon Management Ecosystem

**RUNSYS** is a high-performance, full-stack marathon registration and management platform.
Designed for both elite athletes and event organizers, it streamlines the journey from the starting line to the financial ledger.

---

## ✨ Key Features

### 👤 For Athletes

* **Intuitive Race Discovery**
  Browse upcoming marathons using high-fidelity visual cards.

* **Demographic-Targeted Registration**
  Smart registration flow categorizing athletes by age and gender for accurate scoring.

* **Personal Dashboard**
  Track active registrations, view payment status, and access digital race history.

* **Secure Payments**
  Integrated, Stripe-ready payment ledger.

---

### 🛡️ For Administrators

* **Event Engine**
  Full CRUD (Create, Read, Update, Delete) system for managing race distances, locations, and organizers.

* **Athlete Directory**
  Centralized user management with role-based access control (RBAC).

* **Registration Ledger**
  Monitor sign-ups, bib assignments, and entry categories.

* **Financial Command Center**
  Real-time revenue tracking, gross income analytics, and transaction lookup via Stripe IDs.

---

## 🛠 Tech Stack

### Frontend

* React 18 (TypeScript)
* Redux Toolkit (Async Thunks for state management)
* Tailwind CSS (Premium *“Nike-style”* UI)
* Lucide React (Icon system)
* React Hot Toast (Notifications & feedback)

### Backend

* Node.js & Express
* Drizzle ORM (Type-safe SQL)
* PostgreSQL (Relational database)
* Zod (Schema validation)

---

## 🚀 Getting Started

### 📌 Prerequisites

* Node.js (v18 or higher)
* PostgreSQL

---

### ⚙️ Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/LimoB/MarathonRegSystem.git
cd marathon-reg-system
```

#### 2. Install Dependencies

```bash
# Frontend
cd MarathonFrontend
npm install

# Backend
cd ../MarathonBackend
npm install
```

---

### 🔐 Environment Setup

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL=postgres://user:password@localhost:5432/marathon_db
JWT_SECRET=your_ultra_secret_key
STRIPE_SECRET_KEY=sk_test_...
```

---

### 🗄️ Database Migration

```bash
npx drizzle-kit generate:pg
npx drizzle-kit push:pg
```

---

### ▶️ Run the Application

```bash
# Start Backend
npm run dev

# Start Frontend
cd ../MarathonFrontend
npm run dev
```


## 🏗 Database Architecture

The system uses a strictly typed schema to ensure data integrity:

* **Users**
  Stores authentication data and roles (Admin, Athlete)

* **Marathons**
  Event details such as distance, location, and organizer

* **Registrations**
  Links athletes to races using demographic ENUMs (e.g., `male_18_25`)

* **Payments**
  Tracks transaction IDs and payment statuses

---

## 📸 UI Preview

* Admin Dashboard
* Athlete Portal



## 📜 License

Distributed under the **MIT License**.
See `LICENSE` for more information.

---

## 👨‍💻 Authors

Built with ⚡ by:

* **Boaz Limo**
* **Emmanuel Kipketer**

---

## 🤝 Contributing

Contributions are welcome!

* Fork the repo
* Create a new branch
* Submit a Pull Request 🚀
