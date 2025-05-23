import { useEffect, useState } from "react";
import axios from "axios";
import { WatchlistItem } from "../components/WatchlistItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export function WantToWatch() {
  const [watchlist, setWatchlist] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterRating, setFilterRating] = useState("All");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(`${API_URL}/watchlist`);
        const rawItems = response.data;

        const enrichedItems = await Promise.all(
          rawItems.map((item) => fetchTMDBDetails(item))
        );

        setWatchlist(enrichedItems);
        fetchGenres();
      } catch (error) {
        console.error("Error loading watchlist or TMDB data", error);
      }
    };

    fetchAllData();
  }, []);

  const fetchTMDBDetails = async (item) => {
    const url =
      item.type === "movie"
        ? `https://api.themoviedb.org/3/movie/${item.source_id}?api_key=6addbdd2457d4d8d9a03e850cef564d7`
        : `https://api.themoviedb.org/3/tv/${item.source_id}?api_key=6addbdd2457d4d8d9a03e850cef564d7`;

    const response = await axios.get(url);
    return {
      ...item,
      genres: response.data.genres || [],
      vote_average: response.data.vote_average || 0,
    };
  };

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
      filterGenre === "All" ||
      (item.genres && item.genres.some((g) => g.name === filterGenre));

    return statusMatch && typeMatch && ratingMatch && genreMatch;
  });

  if (!watchlist.length) {
    return (
      <div className="cinzel-500 text-white text-center mt-20">
        <p className="text-lg">Loading your Watchlist...</p>
      </div>
    );
  }

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
          <option value="All" className="text-black">
            All
          </option>
          <option value="To Watch" className="text-black">
            Want to Watch
          </option>
          <option value="Watching" className="text-black">
            Watching
          </option>
          <option value="Watched" className="text-black">
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
            className="genre-dropdown text-xs"
            onChange={(e) => setFilterGenre(e.target.value)}
          >
            <option value="All" className="text-black">
              All Genres
            </option>
            {genres.map((genre) => (
              <option
                key={genre.id}
                value={genre.name}
                className="text-black"
              >
                {genre.name}
              </option>
            ))}
          </select>

          <select
            name="rating"
            id="Rating"
            className="rating-dropwdown text-xs"
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="All" className="text-black">
              All Ratings
            </option>
            <option value="85-100" className="text-black">
              85-100
            </option>
            <option value="80-84" className="text-black">
              80-84
            </option>
            <option value="71-79" className="text-black">
              71-79
            </option>
          </select>
        </nav>
      </header>

      <main className="watchlist-main">
        {/* Mobile vertical swiper */}
        <div className="block md:hidden h-[435px]">
          {filteredWatchlist.length > 0 && (
            <Swiper
              slidesPerView={4}
              spaceBetween={10}
              direction="vertical"
              className="h-full"
            >
              {filteredWatchlist.map((item) => (
                <SwiperSlide 
                  key={`watchlist-item-${item.id}`}
                  className="!h-[100px]"
                >
                  <WatchlistItem
                    specificId={item.source_id}
                    type={item.type}
                    id={item.id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Tablet and Desktop 2x2 Grid */}
        <div className="hidden md:grid grid-cols-2 gap-4 px-4 py-6 h-[530px] overflow-y-auto">
          {filteredWatchlist.map((item) => (
            <div key={`watchlist-item-${item.id}`}>
              <WatchlistItem
                specificId={item.source_id}
                type={item.type}
                id={item.id}
              />
            </div>
          ))}
        </div>
      </main>

      <footer className="watchlist-footer">
        <p className="cinzel-500 text-white text-center mt-4">M&L © 2025</p>
      </footer>
    </div>
  );
}
