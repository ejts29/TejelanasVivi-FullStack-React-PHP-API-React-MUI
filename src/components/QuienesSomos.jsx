// src/components/QuienesSomos.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
// 1. Importa el cliente de Supabase
import { createClient } from '@supabase/supabase-js'; 

// *** 1. CREDENCIALES DE SUPABASE ***
// REEMPLAZA ESTOS VALORES CON TU URL Y CLAVE PUBLIC ANÓNIMA REAL
const supabaseUrl = 'https://evgykiyuirkjxppqvfjt.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3lraXl1aXJranhwcXF2Zmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1MDA4NTMsImV4cCI6MjAyMDA3Njg1M30.4s-3pUv0OQ6U5F7pW1l9sR0Fq9JbXk5V2kK3bV-7tM0'; 
const supabase = createClient(supabaseUrl, supabaseKey);
// **********************************


const QuienesSomos = () => {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getQuienesSomos() {
            try {
                // *** 2. CONSULTA SUPABASE (Reemplazo del fetch) ***
                const { data, error } = await supabase
                    .from('quienessomos') // Nombre de la tabla
                    .select('*')         // Selecciona todas las columnas
                    .limit(1)           // Limita a 1 registro
                    .single();          // Obtiene el objeto directamente (sin el array [])

                if (error) {
                    throw error;
                }
                
                setInfo(data);
            } catch (err) {
                console.error('Error al cargar sección "Quiénes Somos" desde Supabase:', err.message);
                setInfo(null); // Asegura que no se muestre información incompleta o vieja
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

                {/* Imagen: Aquí puedes ajustar tamaño */}
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