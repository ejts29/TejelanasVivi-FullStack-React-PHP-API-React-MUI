// src\components\Services.jsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ServiceCard from './ServiceCard';

// CORRECCIÓN: Rutas de imágenes actualizadas para usar guiones (como en tus archivos)
const servicesData = [
    {
        title: 'Insumos para Tejido',
        description: 'Encuentra la mejor selección de lanas, hilos, agujas y accesorios para tus proyectos de tejido. Trabajamos con materiales de primera calidad.',
        image: 'src/assets/images/Insumos-para-Tejido.jpg',
    },
    {
        title: 'Talleres Presenciales',
        description: 'Aprende a tejer con nuestros talleres presenciales en Laguna de Zapallar. Grupos reducidos y atención personalizada para todos los niveles.',
        image: 'src/assets/images/Talleres-Presenciales.jpg', // Corregido de TalleresPresenciales1.jpg y espacios
    },
    {
        title: 'Productos Personalizados',
        description: 'Creamos piezas tejidas a mano según tus especificaciones. Desde prendas de vestir hasta accesorios para el hogar, todo hecho con amor.',
        image: 'src/assets/images/Productos-Personalizados.jpg',
    },
];

const Services = ({ onContactService }) => ( // Renombrado onContact a onContactService
    <Box id="servicios" sx={{ py: 8, px: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold">
            Nuestros Servicios
        </Typography>
        <Typography variant="subtitle1" align="center" mb={6} color="text.secondary" maxWidth={700} mx="auto">
            Ofrecemos todo lo que necesitas para desarrollar tu pasión por el tejido, desde materiales de calidad hasta talleres personalizados.
        </Typography>
        <Grid container justifyContent="center" spacing={4}>
            {servicesData.map((service) => (
                <Grid item key={service.title} xs={12} sm={6} md={4}>
                    <ServiceCard {...service} onContactClick={onContactService} /> {/* Pasada onContactService */}
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default Services;