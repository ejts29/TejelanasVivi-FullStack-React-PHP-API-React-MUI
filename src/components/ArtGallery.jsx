// tejelanas_vivi\src\components\ArtGallery.jsx

import React, { useState, useEffect } from 'react';
import { Box, IconButton, Grid, CardMedia, Typography, Container } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// CORRECCIÓN CLAVE: Importamos cada imagen como una variable
import Img1 from '../assets/images/Captura-de-pantalla-2025-05-27233309.png';
import Img2 from '../assets/images/IMG-20250528-WA0014.jpg';
import Img3 from '../assets/images/Captura-de-pantalla-2025-05-27233002.png';
import Img4 from '../assets/images/Captura-de-pantalla-2025-05-27233158.png';
import Img5 from '../assets/images/Captura-de-pantalla-2025-05-27233403.png';
import Img6 from '../assets/images/IMG-20250528-WA0004.jpg';
import Img7 from '../assets/images/IMG-20250528-WA0005.jpg';
import Img8 from '../assets/images/IMG-20250528-WA0006.jpg';
import Img9 from '../assets/images/IMG-20250528-WA0008.jpg';
import Img10 from '../assets/images/IMG-20250528-WA0009.jpg';
import Img11 from '../assets/images/IMG-20250528-WA0010.jpg';
import Img12 from '../assets/images/IMG-20250528-WA0011.jpg';


const images = [
    Img1,
    Img2,
    Img3,
    Img4,
    Img5,
    Img6,
    Img7,
    Img8,
    Img9,
    Img10,
    Img11,
    Img12,
];

const ArtGalleryCarousel = () => {
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

    const totalSlides = Math.ceil(images.length / itemsPerView);

    const goToSlide = (index) => {
        if (index < 0) index = totalSlides - 1;
        else if (index >= totalSlides) index = 0;
        setCurrentIndex(index);
    };

    const startIndex = currentIndex * itemsPerView;
    const visibleItems = images.slice(startIndex, startIndex + itemsPerView);

    return (
        <Box
            sx={{
                py: 9,
                px: 2,
                maxWidth: 1200,
                mx: 'auto',
            }}
        >

            <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold" mb={4}>
                Nuestra Galeria de Arte Tejedos vivi
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" maxWidth={700} mx="auto" mb={6}>
                Explora nuestra colección de imágenes que capturan la esencia del tejido y la creatividad. Cada pieza es una obra de arte tejida a mano.
            </Typography>

            <Box position="relative">
                <IconButton
                    aria-label="Anterior imagen"
                    onClick={() => goToSlide(currentIndex - 1)}
                    sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                >
                    <ArrowBackIosNewIcon color="primary" />
                </IconButton>

                <Grid container spacing={2} justifyContent="center">
                    {visibleItems.map((src, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={startIndex + idx}>
                            <CardMedia
                                component="img"
                                // Aquí usamos la variable 'src' (la imagen importada)
                                image={src} 
                                alt={`Imagen ${startIndex + idx + 1}`}
                                sx={{ borderRadius: 2, width: '100%', height: 290, objectFit: 'cover' }}
                            />
                        </Grid>
                    ))}
                </Grid>

                <IconButton
                    aria-label="Siguiente imagen"
                    onClick={() => goToSlide(currentIndex + 1)}
                    sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                >
                    <ArrowForwardIosIcon color="primary" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ArtGalleryCarousel;