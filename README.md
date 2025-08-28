#  VideoFarm

VideoFarm is a modern video streaming app built with **React**, styled with **Material‑UI**, powered by **RapidAPI**, and state-managed using **Redux Toolkit**. The app features dynamic search, tabbed navigation, channel and video sections, and a **Favorites** tab.

---

##  Features

- **React.js** front-end delivering a smooth SPA experience
- Styled with **Material‑UI** for responsive and modern UI
- **RapidAPI** integration for fetching video and channel data
- **Redux Toolkit** for efficient state management and caching
- **Search Functionality** allowing keyword-based video lookup
- **Tabbed Interface** including Home, Search Results, Favorites, Channel Details
- **Favorites Section** to bookmark videos across sessions (persisted via Redux/localStorage)
- Dedicated components:
  - `Navbar.jsx`
  - `SearchBar.jsx`
  - `Sidebar.jsx`
  - `Feed.jsx`
  - `SearchFeed.jsx`
  - `Favourites.jsx`
  - `ChannelDetail.jsx`
  - `VideoDetail.jsx`
  - `Videos.jsx`
  - `VideoCard.jsx`
  - `ChannelCard.jsx`
  - `Loader.jsx`

---

##  Project Structure

```
VideoFarm/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Feed.jsx
│   │   ├── SearchFeed.jsx
│   │   ├── Favourites.jsx
│   │   ├── ChannelDetail.jsx
│   │   ├── VideoDetail.jsx
│   │   ├── Videos.jsx
│   │   ├── VideoCard.jsx
│   │   ├── ChannelCard.jsx
│   │   └── Loader.jsx
│   ├── App.js
│   ├── index.js
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       └── favoritesSlice.js
│   ├── api/
│   │   └── fetchFromAPI.js
│   └── utils/
│       └── constants.js
├── .env
├── package.json
└── README.md
```

---

##  Getting Started

### Prerequisites

- Node.js & npm/yarn
- A RapidAPI account with access to the YouTube or equivalent video API

### Installation

```bash
git clone https://github.com/rax498/VideoFarm.git
cd VideoFarm
npm install
```

### Configuration

Create a `.env` file in the root:

```dotenv
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key_here
REACT_APP_RAPIDAPI_HOST=your_rapidapi_host_here
```

### Run Development Server

```bash
npm start
```

Visit `http://localhost:3000` to view the app. It supports hot reloading for fast development.

---

##  How It Works

- **Navbar & SearchBar**: Top-level navigation and search input — triggers queries to RapidAPI.
- **Feed**: Shows trending or default video listings.
- **SearchFeed**: Displays results based on user searches.
- **ChannelDetail**: Shows a selected channel's info and videos.
- **Favorites**: Displays bookmarked videos; managed via Redux Toolkit and persisted locally.
- **VideoDetail**: Plays selected video and shows related content.
- **Redux Toolkit**:
  - `favoritesSlice.js` handles favorites logic (add/remove).
  - Optionally, use RTK Query for async API data fetching and caching.
- **fetchFromAPI.js**: Centralized API client using Axios/fetch with RapidAPI headers.

---

##  Customization Ideas

- Enhance UI with additional Material‑UI theming, dark mode, or custom animations
- Add pagination or infinite scroll for video feeds
- Migrate to **RTK Query** for more efficient API management and caching
- Integrate user authentication and cloud-based favorites storage (e.g., Firebase)

---

##  Deployment

Use GitHub Pages, Netlify, or Vercel:

```bash
npm run build
npm install -g serve
serve -s build
```


```bash
# Fork repo
git checkout -b my-feature
# Develop and test
git commit -am "Add amazing feature"
git push origin my-feature
# Open a Pull Request
```

---

##  License

[MIT License](https://opensource.org/licenses/MIT).

---

##  Credits

Built by [rax498]().  
Powered by RapidAPI, React, Material‑UI, Redux Toolkit.

---

##  Screenshot


![VideoFarm Screenshot](src/assets/screenshot.png)




