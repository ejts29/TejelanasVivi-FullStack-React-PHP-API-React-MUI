// src/components/FAQ.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Collapse, Paper, IconButton, CircularProgress, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// CORRECCIÓN CLAVE: 
// Eliminamos la definición duplicada (supabaseUrl, supabaseKey, createClient)
// e IMPORTAMOS el cliente centralizado.
import { supabase } from '../services/supabaseClient'; 
// **********************************


const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFAQ() {
            try {
                // *** CONSULTA SUPABASE (Usando el cliente importado) ***
                const { data, error } = await supabase
                    .from('faq') // Nombre de la tabla
                    .select('*'); // Selecciona todas las filas y columnas

                if (error) {
                    // Si la clave API es inválida, se arrojará un error aquí
                    throw error;
                }

                setFaqs(data);
            } catch (err) {
                // Manejo de errores
                console.error("Error al cargar FAQ desde Supabase:", err.message);
                setFaqs([]); // Dejar la lista vacía si falla
            } finally {
                setLoading(false);
            }
        }
        getFAQ();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Box id="faq" sx={{ py: 8, px: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold" mb={4}>
                Preguntas Frecuentes
            </Typography>
            
            {/* Muestra el estado de carga */}
            {loading && (
                <Container sx={{ textAlign: 'center', py: 5 }}>
                    <CircularProgress color="primary" />
                    <Typography align="center" color="text.secondary" mt={2}>Cargando preguntas...</Typography>
                </Container>
            )}
            
            {/* Renderiza las FAQs */}
            {!loading && faqs.length > 0 && (
                <Box maxWidth={700} mx="auto" display="flex" flexDirection="column" gap={2}>
                    {faqs.map((item, index) => (
                        <Paper
                            key={item.id || index} 
                            sx={{ p: 2, cursor: 'pointer' }}
                            onClick={() => toggleFAQ(index)}
                            aria-expanded={openIndex === index}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') toggleFAQ(index);
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {item.question}
                                </Typography>
                                <IconButton
                                    size="small"
                                    sx={{
                                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s',
                                    }}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </Box>
                            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                                <Typography mt={2} color="text.secondary">
                                    {item.answer}
                                </Typography>
                            </Collapse>
                        </Paper>
                    ))}
                </Box>
            )}

            {!loading && faqs.length === 0 && (
                <Typography align="center" color="error">
                    No se pudieron cargar las preguntas frecuentes. Por favor, verifica la consola para errores de API.
                </Typography>
            )}
        </Box>
    );
};

export default FAQ;