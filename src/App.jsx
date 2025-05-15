import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { WantToWatch } from "./pages/WantToWatch";
import Movie from "./pages/Movie";
import Show from "./pages/Show";
import { Browse } from "./pages/Browse";
import { WatchlistItem } from "./components/WatchlistItem";

function App() {
  return (
    <div className="app">
      <Navbar />
      <header id="#" className="header">
        <h1 className="text-white cinzel-500 text-5xl text-center welcome-title">
          Welcome to R8+ <hr />
        </h1>
        <p className="cinzel-500 text-white text-center text-xl welcome-text">
          your guide to the highest-rated films and shows
        </p>
      </header>
      <main className="mainpage">
        <Routes>
          <Route path="/wanttowatch" element={<WantToWatch/>} />
          <Route path="/browse" element={<Browse/>} />
          <Route path="/movie/:specificId" element={<Movie />} />
          <Route path="/show/:specificId" element={<Show />} />
          <Route path="/watchlist/:id" element={<WatchlistItem/>}/>
        </Routes>

        <section id="browse">
          <Browse/>
        </section>

        <section id="to-watch">
          <WantToWatch/>
        </section>

        <section id="custom-list">
          <div></div>
        </section>
      </main>
    </div>
  );
}

export default App;
