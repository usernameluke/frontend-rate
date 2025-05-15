import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

export function BrowseTV() {
  const [shows, setShows] = useState([]);
  const [filterShows, setFilterShows] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [showPage, setShowPage] = useState(1);
  // const [defaultGenre, setDefaultGenre]=useState("Action & Adventure");

  useEffect(() => {
    fetchShow(showPage);
  }, [showPage]);

  const fetchShow = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}&api_key=6addbdd2457d4d8d9a03e850cef564d7`
    );
    const data = await response.json();
    setShows(data.results);
    setFilterShows(data.results);
  };

  const handleFilterShow = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterShows(shows);
    } else {
      setMinRating(rate);
      const filtered = shows.filter((show) => show.vote_average >= rate);
      setFilterShows(filtered);
    }
  };

  return (
    <div className="browse">
      <div className="top-rated-shows">
        <h3 className="cinzel-500 text-xl row-title">Top-Rated Shows</h3>
        <div className="browse-choices">
          <select
            className="rating cinzel-400 text-sm row-title"
            value={minRating}
            onChange={(e) => handleFilterShow(parseFloat(e.target.value))}
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
            <option className="genre text-black">
              Genre
            </option>
            <option className="genre text-black" value={"Action & Adventure"}>
              Action & Adventure
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
            <option className="genre text-black" value={"Kids"}>
              Kids
            </option>
            <option className="genre text-black" value={"Mystery"}>
              Mystery
            </option>
            <option className="genre text-black" value={"News"}>
              News
            </option>
            <option className="genre text-black" value={"Reality"}>
              Reality
            </option>
            <option className="genre text-black" value={"Sci-Fi & Fantasy"}>
              Sci-Fi & Fantasy
            </option>
            <option className="genre text-black" value={"Soap"}>
              Soap
            </option>
            <option className="genre text-black" value={"Talk"}>
              Talk
            </option>
            <option className="genre text-black" value={"War & Politics"}>
              War & Politics
            </option>
            <option className="genre text-black" value={"Western"}>
              Western
            </option>
          </select>
        </div>

        <swiper-container slides-per-view="4" space-between="10" z-0>
          {filterShows.map((item) => (
            <swiper-slide key={item.id}>
              <Link to={`/show/${item.id}`}>
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
            onClick={() => setShowPage((p) => Math.max(1, p - 1))}
            disabled={showPage === 1}
          >
            <IoIosArrowDropleft className="browse-btn-icon" />
            <p className="cinzel-400">Prev</p>
          </button>
          <span className="text-white browse-page cinzel-400">
            Page {showPage}
          </span>
          <button
            className="browse-btn"
            onClick={() => setShowPage((p) => Math.min(95, p + 1))}
            disabled={showPage === 95}
          >
            <p className="cinzel-400">Next</p>
            <IoIosArrowDropright className="browse-btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
