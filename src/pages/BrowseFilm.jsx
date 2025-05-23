import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export function BrowseFilm() {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [moviePage, setMoviePage] = useState(1);

  useEffect(() => {
    fetchMovie(moviePage);
  }, [moviePage]);

  const fetchMovie = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=6addbdd2457d4d8d9a03e850cef564d7`
    );
    const data = await response.json();
    setMovies(data.results);
    setFilterMovies(data.results);
  };

  const handleFilterFilm = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  return (
    <div className="browse">
      <div className="top-rated-films">
        <h3 className="cinzel-500 text-xl row-title browse-title">Top-Rated Films</h3>
        <div className="browse-choices">
          <select
            className="rating cinzel-400 text-sm row-title"
            value={minRating}
            onChange={(e) => handleFilterFilm(parseFloat(e.target.value))}
          >
            <option className="rating text-black" value={0}>
              Rating:
            </option>
            <option className="rating text-black" value={7}>
              71-75
            </option>
            <option className="rating text-black" value={7.5}>
              76-80
            </option>
            <option className="rating text-black" value={8}>
              80-100
            </option>
          </select>
          <select className="genre cinzel-400 text-sm text-white text-center">
            <option className="genre text-black">Genre</option>
          </select>
        </div>

        <Swiper
          className="browse-row z-0"
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 4 },
            640: { slidesPerView: 8 },
            1024: { slidesPerView: 10 },
          }}
        >
          {filterMovies.map((item) => (
            <SwiperSlide key={item.id} className="z-0">
              <Link to={`/movie/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="poster"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pagination-controls">
          <button
            className="browse-btn"
            onClick={() => setMoviePage((p) => Math.max(1, p - 1))}
            disabled={moviePage === 1}
          >
            <IoIosArrowDropleft className="browse-btn-icon" />
            <p className="cinzel-400">Prev</p>
          </button>
          <span className="text-white browse-page cinzel-400">
            Page {moviePage}
          </span>
          <button
            className="browse-btn"
            onClick={() => setMoviePage((p) => Math.min(150, p + 1))}
            disabled={moviePage === 150}
          >
            <p className="cinzel-400">Next</p>
            <IoIosArrowDropright className="browse-btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}