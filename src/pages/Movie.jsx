import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GenreModal } from "../components/GenreModal";

const Movie = () => {
  const { specificId } = useParams();

  const [movie, setMovie] = useState([]);

  const [movieGenre, setMovieGenre] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    fetchMovie();
    fetchTrailer();
    fetchMovieGenre();
  }, [specificId]);

  const fetchMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${specificId}
?api_key=6addbdd2457d4d8d9a03e850cef564d7`
    );
    const data = await response.json();

    console.log("data received:", data);
    setMovie(data);
  };

  const fetchTrailer = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${specificId}/videos?api_key=6addbdd2457d4d8d9a03e850cef564d7`
    );
    const data = await response.json();
    const trailer = data.results.find(
      (video) =>
        video.type === "Trailer" && video.site === "YouTube" && video.official
    );
    if (trailer) {
      setTrailerKey(trailer.key);
    }
  };

  const fetchMovieGenre = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=6addbdd2457d4d8d9a03e850cef564d7`
    );
    const data = await response.json();
    setMovieGenre(data);
  };

  return (
    <>
      <div className="info-page cinzel-500 text-white">
        <div className="info-page-top">
          <div className="info-flex">
            {trailerKey ? (
              <iframe
                width="100%"
                height="281"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube video player"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="info-poster"
              ></iframe>
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                className="info-poster"
              />
            )}
            <h3 className="text-xl text-center font-bold text-red">
              {movie.original_title} <hr />
            </h3>
            <div className="info-row">
              <p className="info text-white text-xs">{movie.release_date}</p>
              <p className="info text-white text-xs">
                {movie.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <p className="info text-white text-xs">
                {Math.round(movie.vote_average * 10)}/100
              </p>
            </div>
          </div>
        </div>

        <div className="info-page-mid">
          <h5 className="text-xs info-description">{movie.overview}</h5>
        </div>

        <div className="info-btn-container">
          <GenreModal specificId={specificId} type="movie" />
        </div>
      </div>
    </>
  );
};

export default Movie;
