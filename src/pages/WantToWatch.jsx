import { useEffect, useState } from "react";
import axios from "axios";
import { WatchlistItem } from "../components/WatchlistItem";

export function WantToWatch() {
  const [watchlist, setWatchlist] = useState([]);

  const [filterStatus, setFilterStatus] = useState("All");

  const [filterType, setFilterType] = useState("All");

  const API_URL = `${import.meta.env.VITE_API_URL}`;

  const getWatchlist = () => {
    axios.get(`${API_URL}/watchlist`).then((response) => {
      setWatchlist(response.data);
    });
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <div className="watchlist-page">
      <header className="watchlist-header">
        <select
          id="watchlist"
          name="watchlist"
          className="watchlist text-1xl cinzel-500 text-white"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option
            value="All"
            className="text-1xl cinzel-500 text-black"
          >
            All
          </option>
          <option
            value="To Watch"
            className="text-1xl cinzel-500 text-black"
          >
            Want to Watch
          </option>
          <option value="Watching" className="text-1xl cinzel-500 text-black">
            Watching
          </option>
          <option value="Watched" className="text-1xl cinzel-500 text-black">
            Watched
          </option>
        </select>
        <nav className="watchlist-menu cinzel-400 text-white">
          <a href="#all" onClick={() => setFilterType("All")}>All</a>
          <a href="#movies" onClick={() => setFilterType("movie")}>Movies</a>
          <a href="#series" onClick={() => setFilterType("tv")}>Series</a>
        </nav>
        <nav className="watchlist-menu cinzel-400 text-white">
          <a href="#all">Genre</a>
          <select name="rating" id="Rating">
            <option value="nothing">Rating</option>
            <option
              // onClick={() => handleFilter(9)}
              className="text-black"
              value="90-100"
            >
              90-100
            </option>

            <option
              // onClick={() => handleFilter(8)}
              className="text-black"
              value="80-89"
            >
              80-89
            </option>
            <option
              // onClick={() => handleFilter(7)}
              className="text-black"
              value="71-79"
            >
              71-79
            </option>
          </select>
          <a href="#series">Director</a>
          <a href="#series">Year</a>
        </nav>
      </header>

      <main className="watchlist-main">
        <swiper-container
          slides-per-view="4"
          space-between="10"
          scrollbar-clickable="true"
          mousewheel-invert="true"
          direction="vertical"
          className="watchlist-main"
        >
          {watchlist.map((item) => {
            return (
              <swiper-slide key={`watchlist-item-${item.id}`}>
                <WatchlistItem
                  specificId={item.source_id}
                  type={item.type}
                  id={item.id}
                />
              </swiper-slide>
            );
          })}
        </swiper-container>
      </main>
      <footer className="watchlist-footer">
        <p className="cinzel-500 text-white"></p>
      </footer>
    </div>
  );
}
