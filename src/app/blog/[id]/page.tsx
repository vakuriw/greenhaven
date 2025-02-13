"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/supabaseClient";
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image"; 

interface BlogArticle {
  id: number;
  title: string;
  image_url: string;
  content?: string;
}

export default function BlogArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [randomArticles, setRandomArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Ошибка загрузки статьи", error);
      else setArticle(data);
    };

    const fetchRandomArticles = async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("id, title, image_url")
        .neq("id", id)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) console.error("Ошибка загрузки случайных статей", error);
      else setRandomArticles(data || []);
    };

    fetchArticle();
    fetchRandomArticles();
  }, [id]);

  if (!article) return <Typography variant="h4">Загрузка...</Typography>;

  return (
    <Container sx={{ padding: "40px", maxWidth: "800px" }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        {article.title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Image
          src={article.image_url}
          alt={article.title}
          width={800}
          height={500}
          style={{ borderRadius: "10px", objectFit: "cover" }}
          unoptimized 
        />
      </Box>
      <Box sx={{ textAlign: "left", marginTop: "20px", paddingLeft: "10px" }}>
        {(article.content || "").split("\n").map((paragraph, index) => {
          const words = paragraph.trim().split(" ");
          const isHeading =
            words.length > 1 && // Заголовки обычно больше 1 слова
            words.length <= 13 && // Не слишком длинные (до 10 слов)
            /^[А-ЯЁA-Z]/.test(paragraph) && // Начинаются с заглавной буквы
            !paragraph.includes("."); // Без точки в середине или конце

          if (isHeading) {
            return (
              <Typography key={index} variant="h6" fontWeight="bold" paragraph>
                {paragraph}
              </Typography>
            );
          }

          if (/^[а-яёa-z]/.test(paragraph)) {
            return (
              <Typography key={index} variant="body1" paragraph sx={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "8px" }}>•</span> {paragraph}
              </Typography>
            );
          }

          return (
            <Typography key={index} variant="body1" paragraph>
              {paragraph}
            </Typography>
          );
        })}
      </Box>
      <Typography variant="h5" textAlign="center" gutterBottom sx={{ marginTop: "40px" }}>
        Другие статьи
      </Typography>
      {randomArticles.map((article) => (
        <Box key={article.id} sx={{ marginTop: "10px" }}>
          <Link href={`/blog/${article.id}`} style={{ textDecoration: "none" }}>
            <Typography variant="h6" color="primary">{article.title}</Typography>
          </Link>
        </Box>
      ))}
    </Container>
  );
}
