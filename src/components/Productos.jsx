// src/components/Productos.jsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Grid, Container, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
// Importa el cliente de Supabase
//import { createClient } from '@supabase/supabase-js'; 

// --- IMPORTACIONES DE IMÁGENES ---
// Importamos las imágenes estáticas para que Vite/Netlify las procesen
import imgMerino from '../assets/images/Lana-Merino-Premium.jpg';
import imgAgujas from '../assets/images/Set-de-Agujas-de-Bambú.jpg';
import imgAlgodon from '../assets/images/Hilo-de-Algodon-Organico.jpg';
import imgKit from '../assets/images/Kit-de-Accesorios.jpg';
import imgAlpaca from '../assets/images/Lana-de-Alpaca.jpg';

// Mapeo para conectar el nombre del producto de la BD con la variable importada
const productImages = {
    'Lana Merino Premium': imgMerino,
    'Set de Agujas de Bambú': imgAgujas,
    'Hilo de Algodón Orgánico': imgAlgodon,
    'Kit de Accesorios': imgKit,
    'Lana de Alpaca': imgAlpaca,
};

// *** 1. CREDENCIALES DE SUPABASE (Corregidas y completas) ***
// BORRA ESTAS LÍNEAS COMPLETAS EN LOS 4 ARCHIVOS
import { supabase } from '../services/supabaseClient';
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
                // CONSULTA SUPABASE
                const { data, error } = await supabase
                    .from('productos')
                    .select('*'); 

                if (error) {
                    throw error;
                }

                // Mapeamos los datos para asignar la imagen procesada por Vite
                const mappedData = data.map(product => ({
                    ...product,
                    // Usamos la variable importada para la ruta de la imagen
                    image: productImages[product.nombre] || product.imagenUrl
                }));


                setProductos(mappedData);
            } catch (error) {
                console.error('Error al obtener productos:', error.message);
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
            <Container sx={{ py: 5, textAlign: 'center' }}>
                <CircularProgress color="primary" />
                <Typography variant="h6" align="center" mt={2}>Cargando productos...</Typography>
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
                                // Aquí usamos la imagen mapeada (variable importada)
                                image={producto.image}
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