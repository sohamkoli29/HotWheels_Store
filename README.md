# HotWheels E-commerce Store 🏎️

A full-stack e-commerce application for HotWheels cars built with React + Vite frontend and Node.js + Express backend using Supabase database.

![HotWheels Store](https://github.com/sohamkoli29/HotWheels_Store/blob/main/images/hotstore.png?raw=true)

##  Features

- ** Product Catalog** - Browse 10+ HotWheels cars with images
- ** Search & Filter** - Find cars by name, series, or color
- ** Shopping Cart** - Add/remove items with real-time total
- ** Checkout Process** - Multi-step checkout with form validation
- ** Responsive Design** - Works perfectly on all devices
- ** Fast Performance** - Built with Vite for optimal speed
- ** Modern UI** - Clean design with Lucide icons
- ** Database Integration** - Supabase PostgreSQL backend

##  Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - PostgreSQL database
- **CORS** - Cross-origin resource sharing

## 🏗️ Project Structure

```bash
hotwheels-store/
├── frontend/                # React Vite application
│   ├── src/
│   │   ├── components/
│   │   │   └── Checkout.jsx   # Checkout page component
│   │   ├── App.jsx            # Main application component
│   │   ├── main.jsx           # Application entry point
│   │   └── App.css            # Stylesheets
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js Express API
│   ├── server.js             # Express server
│   ├── package.json
│   └── .env.example
├── images/                  # HotWheels product images
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```


##  Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/sohamkoli29/HotWheels_Store.git
cd HotWheels_Store

```

# Quick Setup
```bash

cd backend


npm install


cd ../frontend


npm install

```



# Create  .env with your Supabase credentials: 

```bash
#backend/.env
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SERVER_PORT=5000

#frontend/.env
VITE_API_BASE=http://localhost:5000

```