# 🏙️ NagarSetu Admin Portal

The **NagarSetu Admin Portal** is the central management dashboard for the **NagarSetu mobile and web applications** — a smart citizen engagement and issue-reporting system designed to bridge the gap between **citizens and municipal authorities**.  

This portal allows administrators to monitor, verify, and manage reported civic issues in real time, view analytics, and ensure smooth coordination across departments.

---

## 🚀 Features

- 🔍 **Issue Monitoring Dashboard** – View and filter all citizen-reported issues (like garbage, water leaks, potholes, etc.)  
- 🗺️ **Map Integration (Leaflet)** – Visualize issue locations directly on an interactive map  
- ✅ **Status Management** – Approve, reject, or resolve citizen complaints  
- 📊 **Analytics Panel** – Get insights on the number of issues, resolutions, and category trends  
- 🔐 **Secure Authentication (Supabase)** – Role-based access for admins and staff  

---

## 🧩 Tech Stack

| Layer | Technology | Reason |
|:------|:------------|:--------|
| **Frontend** | React + TypeScript (TSX) | Component-based UI with type safety and scalability |
| **Backend** | Node.js + Express | Efficient API handling for real-time updates |
| **Database & Auth** | Supabase | Easy integration for real-time DB, storage, and authentication |
| **Mapping** | Leaflet.js | Lightweight and responsive for web-based geolocation display |
| **AI Integration** | TensorFlow + Hugging Face | For issue image recognition and classification (e.g., detecting garbage, potholes) |

---

## 🧠 AI Recognition Used
NagarSetu uses **TensorFlow models** for on-device inference and **Hugging Face Transformers** for cloud-based visual classification — enabling automated tagging and prioritization of civic issues based on uploaded images.

---

## 🗂️ Folder Structure

```
nagarsetu-admin/
│
├── public/
├── src/
│   ├── components/      # UI Components
│   ├── pages/           # Main pages (Dashboard, Login, Analytics)
│   ├── services/        # Supabase + API integrations
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   └── App.tsx
│
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|-----------|---------|--------------|
| `/api/issues` | GET | Fetch all issues |
| `/api/issues/:id` | PATCH | Update issue status |
| `/api/ai/analyze` | POST | Analyze image using AI model |
| `/api/auth/login` | POST | Admin login via Supabase Auth |

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/nagarsetu-admin.git
   cd nagarsetu-admin
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file and add:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   ```

4. **Run the App**
   ```bash
   npm run dev
   ```

---

## 🧭 Future Scope

- Integration with **Municipal ERP systems**  
- AI-based **priority ranking of complaints**  
- Predictive maintenance insights via **IoT sensors**  

---

## 👨‍💻 Contributors

- **Maheen Meshram** – Developer & Project Lead  
- **SmartTech Club, SIT Nagpur** – Technical Support  
