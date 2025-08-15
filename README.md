# 🛠 Fixitex Services

Fixitex Services is a web application designed to help users browse, order, and manage services with ease.  
It includes a **Django REST Framework** backend and a **React + TypeScript** frontend.  

---

## 🚀 Features

- **User Authentication** (JWT-based login & registration)
- **Service Management** (view active, pending, and total services)
- **Cart System** (create cart, add/remove items)
- **Dashboard** with real-time service stats
- **Responsive UI** built with Tailwind CSS

---

## 🏗 Project Structure

```
fixitex/
├── backend/   # Django REST Framework API
├── frontend/  # React + TypeScript app
```

---

## ⚙️ Tech Stack

**Backend:**
- Python 3 + Django
- Django REST Framework
- PostgreSQL
- JWT Authentication

**Frontend:**
- React + TypeScript
- Tailwind CSS
- React Router
- Axios

---

## 🛠 Getting Started

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at: **http://localhost:8000**

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173** (Vite default)

---

## 🛒 Cart Workflow

1. User logs in or registers.
2. System **creates a cart** (UUID saved in localStorage).
3. User can add/remove services from the cart.
4. Dashboard updates with the latest order info.

---

## 📡 API Endpoints (Sample)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register/` | Register a new user |
| POST | `/auth/login/` | Login and receive JWT |
| GET  | `/services/active/` | List active services |
| GET  | `/services/pending/` | List pending services |
| GET  | `/carts/{cart_id}/` | Get cart details |
| POST | `/carts/create/` | Create a new cart |

---

## 💡 Notes

- JWT token is stored in localStorage for authentication.
- Cart is tied to `cart_id` (UUID) generated on creation.
- The app uses **context providers** (`AuthContext`, `CartContext`) to manage state globally.

---

## Author
@peter-muokwugwo

---

## 🤝 Contributing

If you’d like to contribute, fork the repo, make your changes, and submit a pull request.  
Bug reports and feature suggestions are always welcome!

---

## 📜 License

MIT License © 2025 Fixitex Services
