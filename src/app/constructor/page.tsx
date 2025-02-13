"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/supabaseClient";
import { Container, Typography, Box, Button } from "@mui/material";
import ImageSlider from "@/app/my-components/ImageSlider";
import html2canvas from "html2canvas";
import Image from "next/image"; 

interface Pot {
  id: number;
  name: string;
  image_url: string;
}

interface Plant {
  id: number;
  name: string;
  image_url: string;
}

export default function ConstructorPage() {
  const [pots, setPots] = useState<Pot[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const potRef = useRef<HTMLImageElement | null>(null);
  const [potHeight, setPotHeight] = useState(100);

  useEffect(() => {
    const fetchPots = async () => {
      const { data, error } = await supabase.from("pots").select("*");
      if (error) console.error("Ошибка загрузки горшков", error);
      else setPots(data || []);
    };

    const fetchPlants = async () => {
      const { data, error } = await supabase.from("plants").select("*");
      if (error) console.error("Ошибка загрузки растений", error);
      else setPlants(data || []);
    };

    fetchPots();
    fetchPlants();
  }, []);

  useEffect(() => {
    if (potRef.current) {
      setTimeout(() => {
        setPotHeight(potRef.current?.clientHeight || 100);
      }, 100);
    }
  }, [selectedPot]);

  const handleSaveImage = async () => {
    const element = document.getElementById("preview-container");
    if (element) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      html2canvas(element, { backgroundColor: null, useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "combination.png";
        link.click();
      });
    }
  };

  return (
    <Container sx={{ padding: "40px", maxWidth: "1000px", textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Конструктор растений и горшков
      </Typography>

      {/* Превью комбинации */}
      <Box
        id="preview-container"
        sx={{
          width: "800px",
          height: "700px",
          margin: "auto",
          position: "relative",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: 3,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Горшок */}
        {selectedPot && (
          <Image
            ref={potRef}
            src={selectedPot.image_url}
            alt={selectedPot.name}
            width={300} 
            height={200} 
            style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1,
            }}
            unoptimized 
          />
        )}

        {/* Растение */}
        {selectedPlant && (
          <Image
            src={selectedPlant.image_url}
            alt={selectedPlant.name}
            width={350} 
            height={300} 
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: `calc(10% + ${potHeight}px)`,
              zIndex: 2,
            }}
            unoptimized
          />
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px" }}
        onClick={handleSaveImage}
        disabled={!selectedPot || !selectedPlant}
      >
        Сохранить комбинацию
      </Button>

      {/* Слайдер горшков */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "40px" }}>
        Выберите горшок
      </Typography>
      <ImageSlider items={pots} onSelect={(pot) => {
        setSelectedPot(pot);
        setPotHeight(100);
      }} />

      {/* Слайдер растений */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "40px" }}>
        Выберите растение
      </Typography>
      <ImageSlider items={plants} onSelect={setSelectedPlant} />
    </Container>
  );
}
