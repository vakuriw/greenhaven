import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#327435' }}> {/* Фон хедера */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            GreenHaven
          </Link>
        </Typography>
        <Box>
          <Link href="/portfolio" passHref>
            <Button color="inherit" sx={{ color: '#ffffff' }}> {/* Белый текст */}
              Портфолио
            </Button>
          </Link>
          <Link href="/blog" passHref>
            <Button color="inherit" sx={{ color: '#ffffff' }}> {/* Белый текст */}
              Блог
            </Button>
          </Link>          
          <Link href="/services" passHref>
            <Button color="inherit" sx={{ color: '#ffffff' }}> {/* Белый текст */}
              Услуги
            </Button>
          </Link>
          <Link href="/constructor" passHref>
            <Button color="inherit" sx={{ color: '#ffffff' }}> {/* Белый текст */}
              Конструктор
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
