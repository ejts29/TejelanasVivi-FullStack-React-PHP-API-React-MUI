//src\components\Hero.jsx

import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import HeroImage from '../assets/images/El-arte-del-tejido-en-tus-manos.jpg';
const Hero = () => (
    <Box
        id="inicio"
        sx={{
            pt: { xs: 10, md: 15 },
            pb: { xs: 8, md: 12 },
            px: 3,
           backgroundImage: `linear-gradient(to right, rgba(245, 245, 220, 0.9) 40%, rgba(245, 245, 220, 0.5) 70%, rgba(245, 245, 220, 0) 100%), url(${HeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'primary.main',
            maxWidth: '1200px',
            mx: 'auto',
            borderRadius: 2,
        }}
    >
        <Typography variant="h2" fontWeight="bold" mb={2}>
            El arte del tejido en tus manos
        </Typography>
        <Typography variant="h6" mb={4} color="text.secondary" maxWidth={600}>
            Descubre nuestra selección de insumos de calidad para tejido y únete a nuestros talleres presenciales en Laguna de Zapallar.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" href="#productos">
                Ver productos
            </Button>
            <Button variant="outlined" href="#talleres">
                Explorar talleres
            </Button>
        </Stack>
    </Box>
);

export default Hero;
