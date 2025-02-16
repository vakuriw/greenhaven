"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/supabaseClient";
import { Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

interface BlogArticle {
  id: number;
  title: string;
  image_url: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("id, title, image_url")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) console.error("Ошибка загрузки статей", error);
      else setArticles(data || []);
    };

    fetchArticles();
  }, []);

  return (
    <Container sx={{ padding: "40px", maxWidth: "1000px" }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Блог
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} key={article.id}>
            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <CardMedia component="img" height="200" image={article.image_url} alt={article.title} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Link href={`/blog/${article.id}`} style={{ textDecoration: "none" }}>
                  <Typography variant="h6">{article.title}</Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
