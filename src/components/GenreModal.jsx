import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCreate } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa";
import axios from "axios";

export const GenreModal = ({ specificId, type }) => {
  const [showGenre, setShowGenre] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5005";

  const addToWatchlist = (status) => {
    const requestBody = {
      source_id: specificId,
      type: type,
      status: status,
    };
    axios
      .post(`${API_URL}/watchlist`, requestBody)
      .then((response) => {
        navigate("/watchlist");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <button
        className="watchlist-btn cinzel-400 text-white text-sm "
        onClick={() => setShowGenre(!showGenre)}
      >
        {showGenre ? "Add to Watchlist" : "Add to Watchlist"}
      </button>
      {showGenre && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-content cinzel-400">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  addToWatchlist("To Watch");
                }}
                className="modal-option modal-circle"
              >
                <IoIosAddCircleOutline className="modal-icon" />
                Want to Watch{" "}
              </div>
              <div
                className="modal-option modal-circle"
                onClick={(e) => {
                  e.preventDefault();
                  addToWatchlist("Watching");
                }}
              >
                <IoIosAddCircleOutline className="modal-icon" />
                Watching
              </div>
              <div className="modal-option modal-circle"
              onClick={(e) => {
                  e.preventDefault();
                  addToWatchlist("Watched");
                }}>
                <IoIosAddCircleOutline className="modal-icon" />
                Watched
              </div>

              <div
                className="modal-option 
              modal-circle"
              >
                <MdOutlineCreate className="modal-icon" /> Custom List
              </div>

              <div className="modal-option modal-circle">
                <FaRegCommentDots className="modal-icon" />
                Comment
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="modal-cancel text-black cinzel-400"
                type="button"
                onClick={() => setShowGenre(!showGenre)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
