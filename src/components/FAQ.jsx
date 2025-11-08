// src/components/FAQ.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Collapse, Paper, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Importa el cliente de Supabase
import { createClient } from '@supabase/supabase-js'; 

// *** 1. CREDENCIALES DE SUPABASE ***
// REEMPLAZA ESTOS VALORES CON TU URL Y CLAVE PUBLIC ANÓNIMA REAL
const supabaseUrl = 'https://evgykiyuirkjxppqvfjt.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3lraXl1aXJranhwcXF2Zmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1MDA4NTMsImV4cCI6MjAyMDA3Njg1M30.4s-3pUv0OQ6U5F7pW1l9sR0Fq9JbXk5V2kK3bV-7tM0'; 
const supabase = createClient(supabaseUrl, supabaseKey);
// **********************************


const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getFAQ() {
            try {
                // *** 2. CONSULTA SUPABASE ***
                const { data, error } = await supabase
                    .from('faq') // Nombre de la tabla
                    .select('*'); // Selecciona todas las filas y columnas

                if (error) {
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
            
            {/* Muestra mensaje de carga o de error */}
            {loading && <Typography align="center" color="text.secondary">Cargando preguntas...</Typography>}
            
            {/* Renderiza las FAQs */}
            {!loading && faqs.length > 0 && (
                <Box maxWidth={700} mx="auto" display="flex" flexDirection="column" gap={2}>
                    {faqs.map((item, index) => (
                        <Paper
                            key={item.id || index} // Usar item.id si existe, si no, usar index
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
                <Typography align="center" color="error">No se pudieron cargar las preguntas frecuentes.</Typography>
            )}
        </Box>
    );
};

export default FAQ;