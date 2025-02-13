"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

interface ImageSliderProps {
  images?: string[]; // Для портфолио (по 1 картинке)
  items?: { id: number; name: string; image_url: string }[]; // Для конструктора (по 8 элементов)
  onSelect?: (item: { id: number; name: string; image_url: string }) => void; // Выбор элемента в конструкторе
}

export default function ImageSlider({ images = [], items = [], onSelect }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isConstructorMode = items.length > 0; // Проверяем, используется ли конструктор
  const visibleItems = isConstructorMode ? 8 : 1; // 8 элементов в конструкторе, 1 в портфолио

  const handleNext = () => {
    if (currentIndex + visibleItems < (isConstructorMode ? items.length : images.length)) {
      setCurrentIndex(currentIndex + (isConstructorMode ? 1 : visibleItems));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - (isConstructorMode ? 1 : visibleItems));
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, width: "100%" }}>
      {/* Кнопка "Назад" */}
      <Button onClick={handlePrev} disabled={currentIndex === 0}>
        {"<"}
      </Button>

      {/* Слайдер */}
      <Box sx={{ display: "flex", overflow: "hidden", gap: 1, width: isConstructorMode ? "90%" : "600px" }}>
        {(isConstructorMode ? items : images).slice(currentIndex, currentIndex + visibleItems).map((item, index) => (
          <Box
            key={index}
            sx={{
              cursor: isConstructorMode ? "pointer" : "default",
              textAlign: "center",
              minWidth: isConstructorMode ? "80px" : "100%",
              maxWidth: isConstructorMode ? "80px" : "100%",
              flexShrink: 0,
            }}
            onClick={() => isConstructorMode && onSelect && onSelect(item as { id: number; name: string; image_url: string })}
          >
            <Image
              src={isConstructorMode ? (item as { image_url: string }).image_url : (images as string[])[index]}
              alt={isConstructorMode ? (item as { name: string }).name : "Project Image"}
              width={isConstructorMode ? 80 : 600} 
              height={isConstructorMode ? 80 : 400}
              style={{
                borderRadius: "10px",
                objectFit: "cover",
              }}
              unoptimized 
            />
            {isConstructorMode && (
              <Typography variant="caption">{(item as { name: string }).name}</Typography>
            )}
          </Box>
        ))}
      </Box>

      {/* Кнопка "Вперёд" */}
      <Button onClick={handleNext} disabled={currentIndex + visibleItems >= (isConstructorMode ? items.length : images.length)}>
        {">"}
      </Button>
    </Box>
  );
}
