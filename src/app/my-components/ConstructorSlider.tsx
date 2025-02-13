"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image"; 

interface ConstructorSliderProps {
  items: { id: number; name: string; image_url: string }[];
  onSelect: (item: { id: number; name: string; image_url: string }) => void;
}

export default function ConstructorSlider({ items, onSelect }: ConstructorSliderProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleItems = 8; // Показываем 8 элементов за раз

  const handleNext = () => {
    if (startIndex + visibleItems < items.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, width: "100%" }}>
      {/* Кнопка "Назад" */}
      <Button onClick={handlePrev} disabled={startIndex === 0}>
        {"<"}
      </Button>

      {/* Полоса изображений */}
      <Box sx={{ display: "flex", overflow: "hidden", gap: 1, width: "90%" }}>
        {items.slice(startIndex, startIndex + visibleItems).map((item) => (
          <Box
            key={item.id}
            sx={{
              cursor: "pointer",
              textAlign: "center",
              minWidth: "80px",
              maxWidth: "80px",
              flexShrink: 0,
            }}
            onClick={() => onSelect(item)}
          >
            <Image
              src={item.image_url}
              alt={item.name}
              width={80} 
              height={80}
              style={{ borderRadius: "10px" }}
              unoptimized 
            />
            <Typography variant="caption">{item.name}</Typography>
          </Box>
        ))}
      </Box>

      {/* Кнопка "Вперёд" */}
      <Button onClick={handleNext} disabled={startIndex + visibleItems >= items.length}>
        {">"}
      </Button>
    </Box>
  );
}
