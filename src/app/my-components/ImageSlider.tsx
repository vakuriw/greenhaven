"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

interface ImageSliderProps {
  images?: string[]; // Для портфолио (по 1 картинке)
  items?: { id: number; name: string; image_url: string }[]; // Для конструктора (по 5 элементов)
  onSelect?: (item: { id: number; name: string; image_url: string }) => void; // Выбор элемента в конструкторе
}

export default function ImageSlider({ images = [], items = [], onSelect }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isConstructorMode = items.length > 0;
  const visibleItems = isConstructorMode ? 5 : 1; // Теперь 5 карточек в конструкторе

  const handleNext = () => {
    if (currentIndex + visibleItems < (isConstructorMode ? items.length : images.length)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: 2 }}>
      {/* Кнопка "Назад" */}
      <Button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          color: "white",
          minWidth: "40px",
          height: "120px",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        {"<"}
      </Button>

      {/* Слайдер */}
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          width: `${visibleItems * 120}px`, // Автоматическая ширина
          justifyContent: "center",
          gap: 2, // Расстояние между карточками
        }}
      >
        {(isConstructorMode ? items : images)
          .slice(currentIndex, currentIndex + visibleItems)
          .map((item, index) => (
            <Box
              key={index}
              sx={{
                cursor: isConstructorMode ? "pointer" : "default",
                textAlign: "center",
                minWidth: "100px",
                maxWidth: "100px",
                flexShrink: 0,
              }}
              onClick={() => isConstructorMode && onSelect && onSelect(item as { id: number; name: string; image_url: string })}
            >
              <Image
                src={isConstructorMode ? (item as { image_url: string }).image_url : (images as string[])[index]}
                alt={isConstructorMode ? (item as { name: string }).name : "Project Image"}
                width={100}
                height={100}
                style={{
                  objectFit: "cover",                  
                }}
                unoptimized
              />
              {isConstructorMode && (
                <Typography variant="caption" sx={{ display: "block", marginTop: "4px", fontSize: "12px" }}>
                  {(item as { name: string }).name}
                </Typography>
              )}
            </Box>
          ))}
      </Box>

      {/* Кнопка "Вперёд" */}
      <Button
        onClick={handleNext}
        disabled={currentIndex + visibleItems >= (isConstructorMode ? items.length : images.length)}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          color: "white",
          minWidth: "40px",
          height: "120px",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        {">"}
      </Button>
    </Box>
  );
}
