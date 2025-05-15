import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GenreModal } from "../components/GenreModal";

const Show = () => {
  const { specificId } = useParams();

  const [show, setShow] = useState([]);

  const [trailerKey, setTrailerKey] = useState(null);

  const [showGenre, setShowGenre] = useState([]);

  useEffect(() => {
    fetchShow();
    fetchTrailer();
    fetchShowGenre();
  }, [specificId]);

  const fetchShow = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${specificId}
?api_key=6addbdd2457d4d8d9a03e850cef564d7`
    );
    const data = await response.json();
    console.log(data);
    setShow(data);
  };

  const fetchTrailer = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${specificId}/videos?api_key=6addbdd2457d4d8d9a03e850cef564d7`
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

  const fetchShowGenre = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=6addbdd2457d4d8d9a03e850cef564d7`
    );
    const data = await response.json();
    setShowGenre(data);
  };

  return (
    <>
      <div id="info" className="info-page cinzel-500 text-white">
        <div className="info-page-top">
          <div className="info-flex">
            {trailerKey ? (
              <iframe
                width="100%"
                height="281"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="info-poster"
              ></iframe>
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.original_title}
                className="info-poster"
              />
            )}

            <h3 className="text-xl text-center font-bold text-red">
              {show.original_name} <hr />
            </h3>
            <div className="info-row">
              <p className="info text-white text-xs">{show.first_air_date}</p>
              <p className="info text-white text-xs">
                {show.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <p className="info text-white text-xs">
                {Math.round(show.vote_average * 10)}/100
              </p>
            </div>
          </div>
        </div>

        <div className="info-page-mid">
          <h5 className="text-xs info-description">{show.overview}</h5>
        </div>

        <div className="info-btn-container">
          <GenreModal specificId={specificId} type="tv"/>
        </div>
      </div>
      ;
    </>
  );
};

export default Show;
