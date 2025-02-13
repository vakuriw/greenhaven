import React from 'react';
import Link from 'next/link';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

export default function ServicesPage() {
  // Данные об услугах
  const services = [
    {
      title: 'Вертикальное озеленение',
      image: '/images/vertical-gardening.jpg',
      link: '/services/vertical',
    },
    {
      title: 'Озеленение растениями',
      image: '/images/plant-gardening.jpg',
      link: '/services/plants',
    },
    {
      title: 'Озеленение офисов',
      image: '/images/office-gardening.jpg',
      link: '/services/offices',
    },
    {
      title: 'Уход за растениями',
      image: '/images/plant-care.jpg',
      link: '/services/care',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Основной контент страницы */}
      <Box sx={{ padding: '40px', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Наши услуги
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center', padding: '0 5px' }}>
              <Link href={service.link} passHref legacyBehavior>
                <Card
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '300px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                >
                  {/* Картинка услуги */}
                  <CardMedia component="img" height="250" image={service.image} alt={service.title} />
                  {/* Название услуги */}
                  <CardContent
                    sx={{
                      position: 'absolute',
                      padding: '5px 10px',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      background: 'rgba(87, 87, 87, 0.6)',
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6">{service.title}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Контакты */}
      <Box sx={{ padding: '100px', textAlign: 'center', marginTop: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Контакты
        </Typography>
        <Typography variant="body1">Адрес: г. Ижевск, ул. Коммунаров, д. 224Д</Typography>
        <Typography variant="body1">Телефон: +7 (922) 3324554</Typography>
        <Typography variant="body1">Email: info@greenhaven.ru</Typography>
      </Box>
    </Box>
  );
}
