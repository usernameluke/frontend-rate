import { useEffect, useState } from "react";
import axios from "axios";
import { WatchlistItem } from "../components/WatchlistItem";

export function WantToWatch() {
  const [watchlist, setWatchlist] = useState([]);

  const [filterStatus, setFilterStatus] = useState("All");

  const [filterType, setFilterType] = useState("All");

  const [filterGenre, setFilterGenre] = useState("All");

  const [filterRating, setFilterRating] = useState("All");

  const API_URL = `${import.meta.env.VITE_API_URL}`;

  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const movieGenresRes = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=6addbdd2457d4d8d9a03e850cef564d7`
      );
      const tvGenresRes = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=6addbdd2457d4d8d9a03e850cef564d7`
      );

      const allGenres = [
        ...movieGenresRes.data.genres,
        ...tvGenresRes.data.genres,
      ];

      const uniqueGenres = Array.from(
        new Map(allGenres.map((genre) => [genre.name, genre])).values()
      );

      setGenres(uniqueGenres);
    } catch (error) {
      console.error("Error fetching genres", error);
    }
  };

  const getWatchlist = async () => {
    try {
      const response = await axios.get(`${API_URL}/watchlist`);
      const rawItems = response.data;

      const enrichedItems = await Promise.all(
        rawItems.map((item) => fetchTMDBDetails(item))
      );

      setWatchlist(enrichedItems);
    } catch (error) {
      console.error("Error loading watchlist or TMDB data", error);
    }
  };

  useEffect(() => {
    getWatchlist();
    fetchGenres();
  }, []);

  const filteredWatchlist = watchlist.filter((item) => {
    const statusMatch = filterStatus === "All" || item.status === filterStatus;
    const typeMatch = filterType === "All" || item.type === filterType;

    const rating = item.vote_average || 0;
    const ratingMatch =
      filterRating === "All" ||
      (filterRating === "85-100" && rating >= 8.5) ||
      (filterRating === "80-84" && rating >= 8 && rating < 8.5) ||
      (filterRating === "71-79" && rating >= 7.1 && rating < 8);

    const genreMatch =
      filterGenre === "All" || item.genres.some((g) => g.name === filterGenre);

    return statusMatch && typeMatch && ratingMatch && genreMatch;
  });

  const fetchTMDBDetails = async (item) => {
    const url =
      item.type === "movie"
        ? `https://api.themoviedb.org/3/movie/${item.source_id}?api_key=6addbdd2457d4d8d9a03e850cef564d7`
        : `https://api.themoviedb.org/3/tv/${item.source_id}?api_key=6addbdd2457d4d8d9a03e850cef564d7`;

    const response = await axios.get(url);
    return {
      ...item,
      genres: response.data.genres,
      vote_average: response.data.vote_average,
    };
  };

  return (
    <div className="watchlist-page">
      <header className="watchlist-header">
        <select
          id="watchlist"
          name="watchlist"
          className="watchlist text-1xl cinzel-500 text-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All" className="text-1xl cinzel-500 text-black">
            All
          </option>
          <option value="To Watch" className="text-1xl cinzel-500 text-black">
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
          <button onClick={() => setFilterType("All")}>All</button>
          <button onClick={() => setFilterType("movie")}>Movies</button>
          <button onClick={() => setFilterType("tv")}>Series</button>
        </nav>
        <nav className="watchlist-menu cinzel-400 text-white">
          <select
            name="genre"
            id="genre"
            className="genre-dropdown"
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="All" className="text-black text-xs">
              All Genres
            </option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name} className="text-black text-xs">
                {genre.name}
              </option>
            ))}
          </select>

          <select
            name="rating"
            id="Rating"
            className="rating-dropwdown"
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option className="text-black text-xs" value="All">
              All Ratings
            </option>
            <option className="text-black text-xs" value="85-100">
              85-100
            </option>
            <option className="text-black text-xs" value="80-84">
              80-84
            </option>
            <option className="text-black text-xs" value="71-79">
              71-79
            </option>
          </select>
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
          {filteredWatchlist.map((item) => {
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
