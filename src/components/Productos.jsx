// src/components/Productos.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Grid, Container } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
// Importa el cliente de Supabase
import { createClient } from '@supabase/supabase-js'; 

// *** 1. CREDENCIALES DE SUPABASE ***
// REEMPLAZA ESTOS VALORES CON TU URL Y CLAVE PUBLIC ANÓNIMA
const supabaseUrl = 'https://evgykiyuirkjxppqvfjt.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3lraXl1aXJranhwcXF2Zmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1MDA4NTMsImV4cCI6MjAyMDA3Njg1M30.4s-3pUv0OQ6U5F7pW1l9sR0Fq9JbXk5V2kK3bV-7tM0'; 
const supabase = createClient(supabaseUrl, supabaseKey);
// **********************************

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);
    const navigate = useNavigate();
    
    // Maneja el clic en el botón de contacto de cada producto
    const handleContactClick = (productName) => {
        localStorage.setItem("productoSeleccionado", productName);
        navigate("/contacto");
    };
    
    // Efecto para obtener productos desde la API
    useEffect(() => {
        async function getProductos() {
            try {
                // *** 2. CONSULTA SUPABASE ***
                const { data, error } = await supabase
                    .from('productos') // Nombre de la tabla
                    .select('*'); 

                if (error) {
                    throw error;
                }

                setProductos(data);
            } catch (error) {
                console.error('Error al obtener productos:', error.message);
                // Si falla, dejamos el array vacío
                setProductos([]);
            } finally {
                setLoading(false);
            }
        }
        getProductos();
    }, []);
    
    // Efecto para ajustar el número de elementos por vista según el tamaño de la ventana
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

    const totalSlides = Math.ceil(productos.length / itemsPerView);
    const startIndex = currentIndex * itemsPerView;
    const visibleItems = productos.slice(startIndex, startIndex + itemsPerView);

    const goToSlide = (index) => {
        if (index < 0) index = totalSlides - 1;
        else if (index >= totalSlides) index = 0;
        setCurrentIndex(index);
    };
    
    // Renderiza el carrusel de productos
    if (loading) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h6" align="center">Cargando productos...</Typography>
            </Container>
        );
    }

    if (productos.length === 0) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h6" align="center">No hay productos disponibles.</Typography>
            </Container>
        );
    }
    
    // Renderiza el carrusel de productos
    return (
        <Container sx={{ py: 8 }} id="productos" role="region" aria-label="Carrusel de productos">
            <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold" mb={4}>
                Nuestros Productos
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" maxWidth={700} mx="auto" mb={4}>
                Descubre nuestra variedad de productos para tejedores y tejedoras apasionadas.
            </Typography>

            <Box position="relative">
                <IconButton
                    aria-label="Anterior producto"
                    onClick={() => goToSlide(currentIndex - 1)}
                    sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                >
                    <ArrowBackIosNewIcon color="primary" />
                </IconButton>

                <Grid container spacing={4} justifyContent="center">
                    {visibleItems.map((producto) => (
                        <Grid item xs={12} sm={6} md={4} key={producto.id}>
                            <ServiceCard
                                title={producto.nombre}
                                description={producto.descripcion}
                                image={producto.imagenUrl}
                                onContactClick={handleContactClick}
                            />
                        </Grid>
                    ))}
                </Grid>

                <IconButton
                    aria-label="Siguiente producto"
                    onClick={() => goToSlide(currentIndex + 1)}
                    sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1 }}
                >
                    <ArrowForwardIosIcon color="primary" />
                </IconButton>
            </Box>
        </Container>
    );
};

export default Productos;