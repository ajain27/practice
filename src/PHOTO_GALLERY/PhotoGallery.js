import { useState } from "react";
import PHOTO_GALLERY from "./data.json";
import "./style.css";

function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPhoto = PHOTO_GALLERY[currentIndex];

  const handleGoLeft = () => {
    setCurrentIndex((prev) =>
      // if the current photo is index 0 then move to the last photo which is PHOTO_GALLERY.length - 1 else go to the previous
      prev === 0 ? PHOTO_GALLERY.length - 1 : prev - 1,
    );
  };

  const handleGoRight = () => {
    setCurrentIndex((prev) =>
      // if the current photo is last index then move to the next photo which is 0 index (first photo) else go one next
      prev === PHOTO_GALLERY.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div>
      <div className="gallery">
        <div className="move">
          <span className="left" onClick={handleGoLeft}>
            ←
          </span>
          <span className="right" onClick={handleGoRight}>
            →
          </span>
        </div>
        <div>
          <img
            className="thumbnail"
            src={currentPhoto.thumbnail}
            alt={currentPhoto.title}
          />
          <div className="title">{currentPhoto.title}</div>
          <div className="category">{currentPhoto.category}</div>
          <div className="author">{currentPhoto.author}</div>
        </div>
      </div>
    </div>
  );
}

export default PhotoGallery;
