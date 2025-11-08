//src\components\FAQ.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Collapse, Paper, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        fetch('http://tejelanasvivi-ejts.infinityfree.me/backend/api/productos/FAQ.php')
            .then(res => res.json())
            .then(data => setFaqs(data))
            .catch(err => console.error('Error al cargar FAQ:', err));
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Box id="faq" sx={{ py: 8, px: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold" mb={4}>
                Preguntas Frecuentes
            </Typography>
            <Box maxWidth={700} mx="auto" display="flex" flexDirection="column" gap={2}>
                {faqs.map((item, index) => (
                    <Paper
                        key={index}
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
        </Box>
    );
};

export default FAQ;
