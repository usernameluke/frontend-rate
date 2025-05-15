import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

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
    console.log("Filtering by rating:", rate);
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
      console.log(
        "Movie votes:",
        movies.map((m) => m.vote_average)
      );
    }
  };

  return (
    <div className="browse">
      <div className="top-rated-films">
        <h3 className="cinzel-500 text-xl row-title">Top-Rated Films</h3>
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
            <option className="genre text-black" value={"Action"}>
              Action
            </option>
            <option className="genre text-black" value={"Adventure"}>
              Adventure
            </option>
            <option className="genre text-black" value={"Animation"}>
              Animation
            </option>
            <option className="genre text-black" value={"Comedy"}>
              Comedy
            </option>
            <option className="genre text-black" value={"Crime"}>
              Crime
            </option>
            <option className="genre text-black" value={"Documentary"}>
              Documentary
            </option>
            <option className="genre text-black" value={"Drama"}>
              Drama
            </option>
            <option className="genre text-black" value={"Family"}>
              Family
            </option>
            <option className="genre text-black" value={"Fantasy"}>
              Fantasy
            </option>
            <option className="genre text-black" value={"History"}>
              History
            </option>
            <option className="genre text-black" value={"Horror"}>
              Horror
            </option>
            <option className="genre text-black" value={"Music"}>
              Music
            </option>
            <option className="genre text-black" value={"Mystery"}>
              Mystery
            </option>
            <option className="genre text-black" value={"Romance"}>
              Romance
            </option>
            <option className="genre text-black" value={"Science Fiction"}>
              Science Fiction
            </option>
            <option className="genre text-black" value={"TV Movie"}>
              TV Movie
            </option>
            <option className="genre text-black" value={"Thriller"}>
              Thriller
            </option>
            <option className="genre text-black" value={"War"}>
              War
            </option>
            <option className="genre text-black" value={"Western"}>
              Western
            </option>
          </select>
        </div>

        <swiper-container
          className="browse-row z-0"
          slides-per-view="4"
          space-between="10"
        >
          {filterMovies.map((item) => (
            <swiper-slide key={item.id} className="z-0">
              <Link to={`/movie/${item.id}`}>
              
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.alt}
                    className="poster"
                  />
              </Link>
            </swiper-slide>
          ))}
        </swiper-container>
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
