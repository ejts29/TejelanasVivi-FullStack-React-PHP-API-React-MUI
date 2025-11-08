import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Grid, Container } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from './ProductCard';
// Importa el cliente de Supabase
import { supabase } from '../services/supabaseClient';


// *** 1. CREDENCIALES DE SUPABASE ***

// **********************************

// --- IMPORTACIONES DE IMÁGENES CORREGIDAS (Sintaxis compatible con Vite/Netlify) ---
import imgMerino from '../assets/images/Lana-Merino-Premium.jpg';
import imgAgujas from '../assets/images/Set-de-Agujas-de-Bambú.jpg';
import imgAlgodon from '../assets/images/Hilo-de-Algodon-Organico.jpg';
import imgKit from '../assets/images/Kit-de-Accesorios.jpg';
import imgAlpaca from '../assets/images/Lana-de-Alpaca.jpg';

// Definimos el mapeo de nombres de producto a las variables importadas
const productImages = {
    'Lana Merino Premium': imgMerino,
    'Set de Agujas de Bambú': imgAgujas,
    'Hilo de Algodón Orgánico': imgAlgodon,
    'Kit de Accesorios': imgKit,
    'Lana de Alpaca': imgAlpaca,
};

const ProductsCarousel = ({ onContactProduct }) => {
    // Cambiamos productsData estático por estado dinámico
    const [productsData, setProductsData] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    // EFECTO 1: Obtener productos desde Supabase
    useEffect(() => {
        async function getProductosDestacados() {
            try {
                // Consulta la tabla 'productos' (Limitamos a 5 o la cantidad que quieras destacar)
                const { data, error } = await supabase
                    .from('productos')
                    .select('*')
                    .limit(5); 

                if (error) {
                    throw error;
                }

                // Mapea la URL estática de la imagen para que React la pueda usar
                const mappedData = data.map(product => ({
                    ...product,
                    // Asignamos la imagen importada usando el diccionario 'productImages'
                    image: productImages[product.nombre] || product.imagenUrl 
                }));

                setProductsData(mappedData);
            } catch (error) {
                console.error('Error al obtener productos destacados:', error.message);
                setProductsData([]);
            } finally {
                setLoading(false);
            }
        }
        getProductosDestacados();
    }, []);

    // EFECTO 2: Ajustar la vista del carrusel (el código que ya tenías)
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

    if (loading) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h6" align="center">Cargando destacados...</Typography>
            </Container>
        );
    }

    // Si no hay datos, no renderiza el carrusel
    if (productsData.length === 0) return null; 

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
                        <Grid item xs={12} sm={6} md={4} key={product.nombre || i} role="listitem">
                            <ProductCard 
                                title={product.nombre || product.title} 
                                description={product.descripcion || product.description}
                                // Aseguramos que el precio se muestre con formato
                                price={`$${(product.precio || 0).toLocaleString('es-CL', { minimumFractionDigits: 2 })}`} 
                                image={product.image}
                                onContactProduct={onContactProduct} 
                            />
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