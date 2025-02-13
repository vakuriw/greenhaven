"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image"; 
interface PortfolioSliderProps {
  images: string[];
}

export default function PortfolioSlider({ images }: PortfolioSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: "1000px", margin: "auto" }}>
      {/* Изображение */}
      <Image
        src={images[currentIndex]}
        alt="Project Image"
        width={1000} 
        height={600}
        style={{ borderRadius: "10px", objectFit: "cover" }}
        unoptimized 
      />

      {/* Кнопка "Назад" */}
      <Button
        onClick={prevImage}
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "50px",
          background: "rgba(0, 0, 0, 0.3)",
          color: "white",
          fontSize: "24px",
          borderRadius: 0,
          "&:hover": { background: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        {"<"}
      </Button>

      {/* Кнопка "Вперёд" */}
      <Button
        onClick={nextImage}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "50px",
          background: "rgba(0, 0, 0, 0.3)",
          color: "white",
          fontSize: "24px",
          borderRadius: 0,
          "&:hover": { background: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        {">"}
      </Button>
    </Box>
  );
}
