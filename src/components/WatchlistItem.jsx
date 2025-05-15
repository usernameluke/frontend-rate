import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from "axios";

export function WatchlistItem({ specificId, type, id }) {
  const [watchlistItem, setWatchlistItem] = useState([]);
  const [title, setTitle] = useState([]);
  const [status, setStatus] = useState("");
  const [watchlistData, setWatchlistData] = useState({});

  let endpointType = "tv";
  if (type === "film" || type === "movie") {
    endpointType = "movie";
  }

  useEffect(() => {
    fetchWatchlistItem();
  }, [specificId]);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/watchlist/${id}`)
      .then((response) => {
        const data = response.data;
        setStatus(data.status);
        setWatchlistData(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    const updatedData = {
      ...watchlistData,
      status: newStatus,
    };

    axios
      .put(`http://localhost:5005/watchlist/${id}`, updatedData)
      .then(() => {
        console.log("Status updated successfully");
        setWatchlistData(updatedData);
      })
      .catch((err) => console.error("Failed to update status:", err));
  };

  const fetchWatchlistItem = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${endpointType}/${specificId}
?api_key=6addbdd2457d4d8d9a03e850cef564d7`
    );
    const data = await response.json();
    //console.log(data)
    if (type === "movie" || type === "film") {
      setTitle(data.title);
    } else if (type === "show" || type === "tv") {
      setTitle(data.name);
    } else {
      console.log("Type", type);
    }
    setWatchlistItem(data);
  };

  const deleteItem = () => {
    axios.delete(`http://localhost:5005/watchlist/${id}`).then(() => {
      console.log(`Deleteditem with ID: ${id}`);
      window.location.reload();
    });
  };

  return (
    <div className="watchlist-row">
      <div className="watchlist-img">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${watchlistItem.poster_path}`}
            alt={watchlistItem.alt}
            className="poster"
          />
        </div>

        <div className="watchlist-info">
          <p className="watchlist-info cinzel-500 text-white text-sm underline">
            {title}
          </p>

          <p className="watchlist-info cinzel-500 text-white text-sm">
            {Math.round(watchlistItem.vote_average * 10)}/100
          </p>

          <select
            className="watchlist-status cinzel-400 text-white watchlist-info text-sm"
            name="status"
            id="status"
            onChange={handleStatusChange}
          >
            <option value={status} className="cinzel-400 text-black">
              {status}
            </option>
            <option value="To Watch" className="cinzel-400 text-black">
              Want to Watch
            </option>
            <option value="Watching" className="cinzel-400 text-black">
              Watching
            </option>
            <option value="Watched" className="cinzel-400 text-black">
              Watched
            </option>
          </select>
        </div>
      </div>

      <div className="watchlist-buttons">
        <button className="RemoveButton" onClick={deleteItem}>
          <FaRegTrashCan className="watchlist-btn text-white" />
        </button>
      </div>
    </div>
  );
}
