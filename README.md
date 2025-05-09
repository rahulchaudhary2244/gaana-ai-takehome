Vercel deployed link - https://gaana-ai-takehome.vercel.app/

Render link for backend - https://json-server-80i8.onrender.com/sea-ports

# Gaana AI Takehome
![image](https://github.com/user-attachments/assets/16871b65-583e-4d94-abf8-8c0897846851)

This project consists of a **Next.js** frontend and a **json-server** backend mock API for managing sea port data.

## 📦 Clone the Repository

```
git clone https://github.com/rahulchaudhary2244/gaana-ai-takehome.git
cd gaana-ai-takehome
```

---

## 🛠️ Getting Started

### 1. Install Dependencies

```
npm install
```


---

## 🚀 Scripts

### Start the JSON Server (Mock API)

```
npm run start-server
```

-   Runs `json-server` at **[http://localhost:4000](http://localhost:4000)**
-   Endpoint for sea ports: **[http://localhost:4000/sea-ports](http://localhost:4000/sea-ports)**
-   ⚠️ Make sure port `4000` is not already in use.

---

### Build the Next.js App

```
npm run build
```

-   Prepares the Next.js app for production.

---

### Start the Next.js App (Production Mode)

```
npm start
```

-   Runs the app at **[http://localhost:3000](http://localhost:3000)**
-   ⚠️ Make sure port `3000` is not already in use.

---

### Start in Development Mode

```
npm run dev
```

-   Launches the Next.js UI in development mode at **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Available URLs

-   **Frontend (Next.js UI):** [http://localhost:3000](http://localhost:3000)
-   **Backend (json-server API):** [http://localhost:4000/sea-ports](http://localhost:4000/sea-ports)

---

## 📝 Notes

-   Ensure both ports `3000` (for Next.js) and `4000` (for json-server) are free before running.
-   This mock API is powered by [`json-server`](https://github.com/typicode/json-server).
