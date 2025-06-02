# 🎬 Media Manager

A Netflix-inspired movie browsing app built with React, Vite, and TailwindCSS. This project showcases dynamic UI, API integration, and local state management using React Context. Users can browse movies, view trailers, and maintain a personal favorites list.

## 🚀 Demo

![Media Manager Demo](./media-manager-demo.gif)

## 🔍 Features

- 🏠 **Home Page** with dynamic movie categories (Trending, Top Rated, Action, Comedy, etc.)
- 🎞️ **Banner Carousel** highlighting trending movies
- 🍿 **Movie Rows** with horizontal scroll and poster previews
- ➕ **Add to List** button to save movies locally
- ▶️ **Play Trailer** button opens YouTube trailer in new tab
- 📄 **Recommendations Page** for curated picks
- ✅ **Favorites List** stored via a mock API (`db.json`)
- 🌐 **Responsive Navigation** with scroll-based styling

## 🧪 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [React Router](https://reactrouter.com/)
- [TMDb API](https://www.themoviedb.org/documentation/api)
- Local JSON server (`db.json`) for mock persistence

## 🧠 State Management

- Global state handled with React Context (`MyListProvider` & `RecProvider`)

## 📦 Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-username/media-manager.git
   cd media-manager
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Start local mock server (optional):**
   ```bash
   npx json-server --watch db.json --port 3000
   ```

## 📁 Folder Structure Highlights

```
src/
├── components/
│   ├── Banner.tsx
│   └── Row.tsx
├── pages/
│   ├── Home.tsx
│   ├── List.tsx
│   └── Recommendation.tsx
├── context/
│   ├── List.context.tsx
│   └── Recommendation.context.tsx
├── App.tsx
└── main.tsx
```

## ✨ Credits

- Movie data sourced from [TMDb](https://www.themoviedb.org/)
- Design inspiration from Netflix UI

## 📄 License

This project is open-source under the [MIT License](LICENSE).
