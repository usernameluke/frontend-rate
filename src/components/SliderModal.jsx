import React from "react";
import { useState } from "react";

export const SliderModal = () => {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <>
      <button className="choice" onClick={() => setShowSlider(!showSlider)}>
        {showSlider ? "Rating" : "Rating"}
      </button>
      {showSlider && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-slider">
              <input
                className="slider"
                type="range"
                min="7.5"
                max="10"
                value="8"
                onInput="this.nextElementSibling.value = this.value"
              />
              <p className="slider-range" id="value">8</p>
            </div>
            <div className="modal-footer">
              <button
                className="modal-cancel"
                type="button"
                onClick={() => setShowSlider(!showSlider)}
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
