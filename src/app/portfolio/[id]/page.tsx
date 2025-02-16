"use client";

import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Container } from "@mui/material";
import PortfolioSlider from "@/app/my-components/PortfolioSlider";

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  images: string[];
}

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase.from("portfolio").select("*").eq("id", id).single();
      if (error) console.error("Ошибка загрузки проекта:", error);
      else setProject(data as PortfolioProject);
    };

    fetchProject();
  }, [id]);

  if (!project) return <Typography variant="h4">Загрузка...</Typography>;

  return (
    <Container sx={{ padding: "40px", maxWidth: "800px" }}>
      {/* Заголовок */}
      <Typography variant="h3" gutterBottom textAlign="center">
        {project.title}
      </Typography>

      {/* Слайдер */}
      <PortfolioSlider images={project.images} />

      {/* Описание под слайдером */}
      <Box sx={{ textAlign: "left", marginTop: "20px", paddingLeft: "10px" }}>
  {project.description.split("\n").map((paragraph, index) => {
    // Если строка выглядит как заголовок (например, "Название проекта:", "Описание:", "Результат:"), делаем её жирной и увеличиваем шрифт
    const isHeading = /^[А-ЯЁ][а-яё\s]+:$/.test(paragraph.trim());

    return (
      <Typography key={index} variant={isHeading ? "h6" : "body1"} paragraph sx={isHeading ? { fontWeight: "bold" } : {}}>
        {paragraph}
      </Typography>
    );
  })}
</Box>


      
    </Container>
  );
}
