"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import OrderModal from "@/app/my-components/OrderModal";
import Image from "next/image"; 
interface Service {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: string;
}

interface ServiceOption {
  id: number;
  title: string;
  description: string;
  image_url: string;
  price: string;
}

export default function VerticalServicePage() {
  const [service, setService] = useState<Service | null>(null);
  const [options, setOptions] = useState<ServiceOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      const { data, error } = await supabase.from("services").select("*").eq("id", 1).single();
      if (error) console.error("Ошибка загрузки услуги", error);
      else setService(data);
    };

    const fetchOptions = async () => {
      const { data, error } = await supabase.from("service_options").select("*").eq("service_id", 1);
      if (error) console.error("Ошибка загрузки вариантов услуг", error);
      else setOptions(data || []);
    };

    fetchService();
    fetchOptions();
  }, []);

  if (!service) return <Typography variant="h4">Загрузка...</Typography>;

  return (
    <Container sx={{ padding: "40px", maxWidth: "800px" }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        {service.title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Image
          src={service.image_url}
          alt={service.title}
          width={800} 
          height={500}
          style={{ borderRadius: "10px", objectFit: "cover" }}
          unoptimized 
        />
      </Box>
      <Typography variant="body1" paragraph>{service.description}</Typography>
      <Typography variant="h5" color="green" gutterBottom>{service.price}</Typography>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
        Заказать
      </Button>

      {/* Варианты озеленения */}
      {options.length > 0 && (
        <>
          <Typography variant="h4" textAlign="center" marginTop="40px">
            Варианты
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {options.map((option) => (
              <Grid item xs={12} sm={6} key={option.id}>
                <Card>
                  <CardMedia>
                    <Image
                      src={option.image_url}
                      alt={option.title}
                      width={400} 
                      height={250}
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6">{option.title}</Typography>
                    <Typography variant="body2">{option.description}</Typography>
                    <Typography variant="h6" color="green">{option.price}</Typography>
                    <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                      Заказать
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Секция с консультацией */}
      <Box sx={{ textAlign: "center", marginTop: "40px" }}>
        <Typography variant="h5">Остались вопросы?</Typography>
        <Button
          variant="contained"
          color="success"
          sx={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Заказать консультацию
        </Button>
      </Box>

      {/* Модальное окно */}
      <OrderModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
}
