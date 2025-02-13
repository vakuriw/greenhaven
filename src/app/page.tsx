import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Приветственный блок */}
      <Box
        sx={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/intro-pic3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "100px 40px",
          textAlign: "center",
          color: "white",
          minHeight: "200px",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Добро пожаловать в GreenHaven!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Мы создаем уют и красоту с помощью растений.
        </Typography>
        <Link href="/constructor" passHref>
          <Button variant="contained" sx={{
            marginTop: "20px",
            color: "black", 
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#a6daa9',
            },
            }}>
            Попробовать конструктор
          </Button>
        </Link>
      </Box>


      {/* О нас */}
      <Box sx={{ padding: '40px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          О нас
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '600px', margin: '0 auto' }}>
          Компания GreenHaven занимается озеленением интерьеров, предоставляя высококачественные услуги и широкий выбор растений.
          Мы верим, что растения способны превратить любое пространство в уютный оазис.
        </Typography>
      </Box>

      {/* Услуги */}
      <Box sx={{ backgroundColor: '#f1f8e9', padding: '40px', textAlign: 'center' }}>
  <Typography variant="h4" gutterBottom>
    Наши услуги
  </Typography>
  <Grid container spacing={4} justifyContent="center">
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Вертикальное озеленение
          </Typography>
          <Typography variant="body2">
            Создавайте уникальные зеленые стены, которые украшают пространство и очищают воздух.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Озеленение растениями
          </Typography>
          <Typography variant="body2">
            Подбираем растения, которые подойдут для вашего интерьера и создадут уютную атмосферу.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Уход за растениями
          </Typography>
          <Typography variant="body2">
            Профессиональный уход за вашими растениями: полив, обрезка, подкормка.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  <Link href="/services" passHref>
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
    >
      Все услуги
    </Button>
  </Link>
</Box>


      {/* Контакты */}
      <Box sx={{ padding: '40px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Контакты
        </Typography>
        <Typography variant="body1">
          Адрес: г. Ижевск, ул. Коммунаров, д. 224Д
        </Typography>
        <Typography variant="body1">Телефон: +7 (922) 3324554</Typography>
        <Typography variant="body1">Email: info@greenhaven.ru</Typography>
      </Box>
    </main>
  );
}
