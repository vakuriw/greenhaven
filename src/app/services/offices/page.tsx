"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Container, Typography, Box, Button } from "@mui/material";
import OrderModal from "@/app/my-components/OrderModal";

interface Service {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: string;
}

export default function OfficesServicePage() {
  const [service, setService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const { data, error } = await supabase.from("services").select("*").eq("id", 3).single();
      if (error) console.error("Ошибка загрузки услуги", error);
      else setService(data);
    };

    fetchService();
  }, []);

  if (!service) return <Typography variant="h4">Загрузка...</Typography>;

  return (
    <Container sx={{ padding: "40px", maxWidth: "800px" }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        {service.title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <img src={service.image_url} alt={service.title} style={{ width: "800px", maxWidth: "100%", borderRadius: "10px" }} />
      </Box>
      <Typography variant="body1" paragraph>{service.description}</Typography>
      <Typography variant="h5" color="green" gutterBottom>{service.price}</Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Заказать
      </Button>

      {/* Секция с консультацией */}
      <Box sx={{ textAlign: "center", marginTop: "40px" }}>
        <Typography variant="h5">Остались вопросы?</Typography>
        <Button variant="contained"
      color="success"
      sx={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        '&:hover': {
          backgroundColor: '#388e3c',
        },
      }}
      onClick={() => setIsModalOpen(true)}>
          Заказать консультацию
        </Button>
      </Box>

      {/* Модальное окно */}
      <OrderModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
}
