// src/components/QuienesSomos.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';

// 1. IMPORTAMOS EL CLIENTE CENTRALIZADO
import { supabase } from '../services/supabaseClient'; 

// IMPORTACIÓN CORREGIDA DE LA IMAGEN INSTITUCIONAL
// Usamos import para que Vite/Netlify la procesen
import QuienesSomosImage from '../assets/images/Captura-de-pantalla-2025-05-29-171243.png';


const QuienesSomos = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getQuienesSomos() {
            try {
                // *** CONSULTA SUPABASE (Usando el cliente importado) ***
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
                    // CORRECCIÓN DE IMAGEN: Usamos la variable importada
                    imagenUrl: QuienesSomosImage 
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
            <Container id="quienes-somos" sx={{ py: 8, textAlign: 'center' }}>
                <CircularProgress color="primary" />
                <Typography align="center" variant="h6" color="text.secondary">Cargando Quiénes Somos...</Typography>
            </Container>
        );
    }

    // Si terminó de cargar y no hay datos válidos, no renderiza nada
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
                            width: { xs: '100%', md: '400px' }, 
                            height: 'auto',                      
                            maxHeight: '350px',                  
                            objectFit: 'cover',                  
                            borderRadius: 2,                     
                            boxShadow: 3                         
                        }}
                    />
                )}
            </Box>
        </Container>
    );
};

export default QuienesSomos;