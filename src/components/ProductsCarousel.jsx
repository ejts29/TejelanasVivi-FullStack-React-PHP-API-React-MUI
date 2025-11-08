import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from './ProductCard';

// CORRECCIÓN: Rutas de imágenes actualizadas para usar guiones (como en tus archivos)
const productsData = [
  { title: 'Lana Merino Premium', description: '100% lana merino...', price: '$12.500', image: 'src/assets/images/Lana-Merino-Premium.jpg' },
  { title: 'Set de Agujas de Bambú', description: 'Juego completo...', price: '$18.900', image: 'src/assets/images/Set-de-Agujas-de-Bambú.jpg' },
  { title: 'Hilo de Algodón Orgánico', description: 'Algodón 100%...', price: '$8.900', image: 'src/assets/images/Hilo-de-Algodon-Organico.jpg' },
  { title: 'Kit de Accesorios', description: 'Todo lo que necesitas...', price: '$15.500', image: 'src/assets/images/Kit-de-Accesorios.jpg' },
  { title: 'Lana de Alpaca', description: 'Lana de alpaca...', price: '$14.900', image: 'src/assets/images/Lana-de-Alpaca.jpg' },
];

const ProductsCarousel = ({ onContactProduct }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerView(3);
      else if (width >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(productsData.length / itemsPerView);
  const goToSlide = (index) => {
    if (index < 0) index = totalSlides - 1;
    else if (index >= totalSlides) index = 0;
    setCurrentIndex(index);
  };

  const startIndex = currentIndex * itemsPerView;
  const visibleItems = productsData.slice(startIndex, startIndex + itemsPerView);

  return (
    <Box
      id="productos"
      role="region"
      aria-label="Carrusel de productos destacados"
      sx={{ py: 8, px: 2, bgcolor: 'secondary.main', maxWidth: 1200, mx: 'auto' }}
    >
      <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold" mb={4}>
        Productos Destacados
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" maxWidth={700} mx="auto" mb={6}>
        Descubre nuestra selección de insumos para tejido...
      </Typography>
      <Box position="relative">
        <IconButton
          aria-label="Producto anterior"
          onClick={() => goToSlide(currentIndex - 1)}
          sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 1 }}
        >
          <ArrowBackIosNewIcon color="primary" />
        </IconButton>
        <Grid container spacing={2} justifyContent="center" role="list" aria-live="polite">
          {visibleItems.map((product, i) => (
            <Grid item xs={12} sm={6} md={4} key={product.title} role="listitem">
              <ProductCard {...product} onContactProduct={onContactProduct} />
            </Grid>
          ))}
        </Grid>
        <IconButton
          aria-label="Producto siguiente"
          onClick={() => goToSlide(currentIndex + 1)}
          sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1 }}
        >
          <ArrowForwardIosIcon color="primary" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProductsCarousel;