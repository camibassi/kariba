import { useState } from "react";

export const useDeckStore = () => {
  const [hoveredImage, setHoveredImage] = useState("");

  const handleMouseEnter = (imgPath) => {
    setHoveredImage(imgPath);
  };

  const handleMouseLeave = () => {
    setHoveredImage("");
  };

  return { hoveredImage, handleMouseEnter, handleMouseLeave };
};
