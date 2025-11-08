//src\components\QuienesSomos.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';

const QuienesSomos = () => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        // Aquí llamamos a la API de QuienesSomos
        fetch('http://tejelanasvivi-ejts.infinityfree.me/backend/api/productos/QuienesSomos.php')
            .then(res => res.json())
            .then(data => setInfo(data))
            .catch(err => console.error('Error al cargar sección "Quiénes Somos":', err));
    }, []);

    // Si aún no hay datos o hay error, no renderiza nada
    if (!info || info.error) return null;

    return (
        <Container id="quienes-somos" sx={{ py: 8 }}>
            {/* Título principal */}
            <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold">
                {info.titulo}
            </Typography>

            {/* Descripción general */}
            <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
                {info.descripcion}
            </Typography>

            {/* Contenedor principal de contenido e imagen */}
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} alignItems="center">
                {/* Bloque de Misión y Visión */}
                <Box flex={1}>
                    <Typography variant="h6" gutterBottom>Misión</Typography>
                    <Typography color="text.secondary">{info.mision}</Typography>
                    <Typography variant="h6" gutterBottom mt={4}>Visión</Typography>
                    <Typography color="text.secondary">{info.vision}</Typography>
                </Box>

                {/* Imagen: Aquí puedes ajustar tamaño */}
                {info.imagenUrl && (
                    <Box
                        component="img"
                        src={info.imagenUrl}
                        alt="Imagen Quienes Somos"
                        sx={{
                            // AQUÍ AJUSTAS ANCHO Y ALTO DE LA IMAGEN
                            width: { xs: '100%', md: '400px' }, // Ancho 100% en móvil, 400px en escritorio
                            height: 'auto',                     // Altura automática proporcional
                            maxHeight: '350px',                 // Altura máxima para evitar imágenes muy altas
                            objectFit: 'cover',                 // Corta sin distorsionar
                            borderRadius: 2,                    // Esquinas redondeadas
                            boxShadow: 3                        // Sombra sutil
                        }}
                    />
                )}
            </Box>
        </Container>
    );
};

export default QuienesSomos;
