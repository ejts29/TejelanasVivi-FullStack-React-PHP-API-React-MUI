// src/components/QuienesSomos.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { createClient } from '@supabase/supabase-js'; 

// IMPORTACIÓN CORREGIDA DE LA IMAGEN INSTITUCIONAL
// Usamos require() o import para que Vite/Netlify la procesen
import QuienesSomosImage from '../assets/images/Captura-de-pantalla-2025-05-29-171243.png';


// *** 1. CREDENCIALES DE SUPABASE (Clave actualizada) ***
const supabaseUrl = 'https://evgykiyuirkjxppqvfjt.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3lraXl1aXJranhwcXF2Zmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1NjI3NTAsImV4cCI6MjA3ODEzODc1MH0.6wuT3NtmeRBHxkZxCTwrrGzJPjWEw39WIg9qOhVtIHs'; 
const supabase = createClient(supabaseUrl, supabaseKey);
// ******************************************************


const QuienesSomos = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getQuienesSomos() {
            try {
                // *** CONSULTA SUPABASE ***
                const { data, error } = await supabase
                    .from('quienessomos') 
                    .select('*') 
                    .limit(1) 
                    .single(); 

                if (error) {
                    throw error;
                }
                
                // Agregamos la ruta estática de la imagen procesada por Vite
                const processedInfo = {
                    ...data,
                    imagenUrl: QuienesSomosImage // Usamos la variable importada
                };

                setInfo(processedInfo);

            } catch (err) {
                console.error('Error al cargar sección "Quiénes Somos" desde Supabase:', err.message);
                setInfo(null);
            } finally {
                setLoading(false);
            }
        }
        getQuienesSomos();
    }, []);

    // Si aún está cargando, muestra un mensaje
    if (loading) {
        return (
            <Container id="quienes-somos" sx={{ py: 8 }}>
                <Typography align="center" variant="h6" color="text.secondary">Cargando Quiénes Somos...</Typography>
            </Container>
        );
    }

    // Si terminó de cargar y no hay datos válidos (incluyendo errores), no renderiza nada
    // Si la API key es inválida, este componente NO se renderizará.
    if (!info) return null;

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

                {/* Imagen: Ya está corregida para usar la ruta procesada por Vite */}
                {info.imagenUrl && (
                    <Box
                        component="img"
                        src={info.imagenUrl}
                        alt="Imagen Quienes Somos"
                        sx={{
                            // AQUÍ AJUSTAS ANCHO Y ALTO DE LA IMAGEN
                            width: { xs: '100%', md: '400px' }, // Ancho 100% en móvil, 400px en escritorio
                            height: 'auto',                      // Altura automática proporcional
                            maxHeight: '350px',                  // Altura máxima para evitar imágenes muy altas
                            objectFit: 'cover',                  // Corta sin distorsionar
                            borderRadius: 2,                     // Esquinas redondeadas
                            boxShadow: 3                         // Sombra sutil
                        }}
                    />
                )}
            </Box>
        </Container>
    );
};

export default QuienesSomos;