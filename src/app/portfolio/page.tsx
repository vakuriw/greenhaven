"use client";

import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import Link from "next/link";

interface PortfolioProject {
  id: number;
  title: string;
  images: string[]; 
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("portfolio").select("id, title, images");
      if (error) console.error("Ошибка загрузки проектов:", error);
      else setProjects(data as PortfolioProject[]);
    };

    fetchProjects();
  }, []);

  return (
    <Box sx={{ padding: "40px", textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Портфолио
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {projects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <Link href={`/portfolio/${project.id}`} passHref>
              <Card sx={{ position: "relative", cursor: "pointer" }}>
                <CardMedia component="img" height="200" image={project.images[0]} alt={project.title} />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h6">{project.title}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
