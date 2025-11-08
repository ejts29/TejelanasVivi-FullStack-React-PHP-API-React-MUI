import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Chip } from '@mui/material';

// Ejemplo de imágenes (ajústalas según tus archivos reales)
// CORRECCIÓN: Nombres de archivo actualizados para coincidir con los archivos reales (con guiones).
import TejidoPrincipiantes from '../assets/images/Tejido-para-Principiantes1.png';
import TejidoPrendas from '../assets/images/Tejido-de-Prendas1.png';
import TecnicasAvanzadas from '../assets/images/Tecnicas-Avanzadas1.png';
import TejidoHogar from '../assets/images/tejido-para-el-hogar.jpg';
import CertificacionPintura from '../assets/images/certificacion-en-pintura-y-estampado.png';

// Array con los datos de los talleres
const workshops = [
    {
        title: 'Tejido para Principiantes',
        level: 'Básico',
        description: 'Aprende las técnicas básicas del tejido a palillo...',
        date: '15 de junio',
        price: '$35.000',
        image: TejidoPrincipiantes,
    },
    {
        title: 'Tejido de Prendas',
        level: 'Intermedio',
        description: 'Aprende a tejer prendas completas como chalecos...',
        date: '22 de junio',
        price: '$45.000',
        image: TejidoPrendas,
    },
    {
        title: 'Técnicas Avanzadas',
        level: 'Avanzado',
        description: 'Domina técnicas complejas como calados...',
        date: '29 de junio',
        price: '$55.000',
        image: TecnicasAvanzadas,
    },
    {
        title: 'Tejido para el Hogar',
        level: 'Especializado',
        description: 'Crea hermosas piezas para decorar tu hogar...',
        date: '6 de julio',
        price: '$50.000',
        image: TejidoHogar,
    },
    {
        title: 'Certificación en pintura y estampado',
        level: 'Especializado',
        description: 'Crea hermosas piezas para decorar tu hogar...',
        date: '6 de julio',
        price: '$50.000',
        image: CertificacionPintura,
    },
];

// Componente Workshops
const Workshops = () => {
    const handleSignUp = (title) => {
        alert(`Te has inscrito en el taller: ${title}`);
    };

    return (
        <Box component="section" id="talleres" sx={{ py: 8, bgcolor: 'background.paper', maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4, md: 6 } }}>
            {/* Título y descripción de la sección */}
            <Box textAlign="center" mb={6}>
                <Typography variant="h4" color="primary" fontWeight="bold" mb={2}>
                    Nuestros Talleres
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth={600} mx="auto">
                    Aprende el arte del tejido en un ambiente acogedor...
                </Typography>
            </Box>

            {/* Cuadrícula de tarjetas */}
            <Grid container spacing={4} alignItems="stretch">
                {workshops.map(({ title, level, description, date, price, image }) => (
                    <Grid item xs={12} sm={6} md={4} key={title}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3, borderRadius: 2 }}>
                            {/* Imagen del taller */}
                            <CardMedia
                                component="img"
                                sx={{ height: 200, objectFit: 'cover' }}
                                image={image}
                                alt={title}
                            />
                            {/* Contenido de la tarjeta */}
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                        {title}
                                    </Typography>
                                    <Chip label={level} color="secondary" size="small" sx={{ fontWeight: 'medium' }} />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                                    {description}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            Próxima fecha: {date}
                                        </Typography>
                                        <Typography variant="subtitle1" color="primary" fontWeight="bold">
                                            {price}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleSignUp(title)}
                                        sx={{ borderRadius: '9999px' }}
                                    >
                                        Inscribirme
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Workshops;