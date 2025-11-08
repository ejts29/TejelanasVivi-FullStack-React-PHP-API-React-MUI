import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    FormControlLabel,
    Checkbox,
    Chip,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const isValidPhone = (phone) => {
    return /^\d{7,15}$/.test(phone);
};

const ContactForm = ({ selectedProduct, selectedService }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        categoria: '',
        mensaje: '',
        metodoEnvio: '',
        metodoPago: '',
        privacy: false,
    });

    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const [captchaToken, setCaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);

    useEffect(() => {
        if (selectedProduct) {
            setFormData(prev => ({
                ...prev,
                categoria: 'productos',
                mensaje: `Me gustaría obtener más información sobre el producto: ${selectedProduct}.`,
                asunto: 'productos_info'
            }));
        } else if (selectedService) {
            setFormData(prev => ({
                ...prev,
                categoria: 'servicios',
                mensaje: `Me gustaría obtener más información sobre el servicio: ${selectedService}.`,
                asunto: 'consulta_general'
            }));
        }
    }, [selectedProduct, selectedService]);

    const validate = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El Nombre Completo es obligatorio.';
        } else if (formData.nombre.trim().length < 3) {
            newErrors.nombre = 'El Nombre Completo debe tener al menos 3 caracteres.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El Correo Electrónico es obligatorio.';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'El Correo Electrónico no es válido.';
        }

        if (formData.telefono.trim() && !isValidPhone(formData.telefono)) {
            newErrors.telefono = 'El Número Telefónico no es válido (solo dígitos, entre 7 y 15).';
        }

        if (!formData.asunto.trim()) newErrors.asunto = 'El asunto es obligatorio.';
        if (!formData.categoria.trim()) newErrors.categoria = 'La categoría es obligatoria.';
        if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje no puede estar vacío.';
        if (!formData.metodoEnvio.trim()) newErrors.metodoEnvio = 'Debes seleccionar un método de envío.';
        if (!formData.metodoPago.trim()) newErrors.metodoPago = 'Debes seleccionar un método de pago.';
        if (!formData.privacy) newErrors.privacy = 'Debes aceptar la política de privacidad para enviar el mensaje.';
        if (!captchaToken) newErrors.captcha = 'Debes completar el reCAPTCHA.';

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({ ...prev, privacy: e.target.checked }));
        if (errors.privacy) {
            setErrors(prev => ({ ...prev, privacy: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch('http://tejelanasvivi-ejts.infinityfree.me/backend/api/productos/contacto.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, captchaToken })
                });

                const result = await response.json();
                if (response.ok) {
                    setSnackbar({
                        open: true,
                        message: '¡Gracias por contactarnos! Te responderemos pronto.',
                        severity: 'success'
                    });

                    // Reset form
                    setFormData({
                        nombre: '',
                        email: '',
                        telefono: '',
                        asunto: '',
                        categoria: '',
                        mensaje: '',
                        metodoEnvio: '',
                        metodoPago: '',
                        privacy: false
                    });

                    // Reset reCAPTCHA
                    setCaptchaToken(null);
                    if (recaptchaRef.current) recaptchaRef.current.reset();

                } else {
                    setSnackbar({
                        open: true,
                        message: result.error || 'Error al enviar el mensaje',
                        severity: 'error'
                    });
                }
            } catch (err) {
                setSnackbar({
                    open: true,
                    message: 'Error de conexión con el servidor',
                    severity: 'error'
                });
            }
        } else {
            setSnackbar({
                open: true,
                message: 'Por favor, corrige los errores en el formulario',
                severity: 'error'
            });
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Box
            id="contacto"
            sx={{
                py: 8,
                px: 2,
                bgcolor: 'secondary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Paper elevation={6} sx={{
                maxWidth: 600,
                width: '100%',
                mx: 'auto',
                p: { xs: 3, md: 5 },
                borderRadius: 2,
                bgcolor: 'background.paper',
            }}>
                <Typography variant="h4" align="center" gutterBottom color="primary" fontWeight="bold" mb={3}>
                    Contáctanos
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary" mb={4}>
                    ¿Tienes alguna pregunta o quieres más información sobre nuestros productos y talleres? Escríbenos y te responderemos a la brevedad.
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        label="Nombre Completo *"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        error={Boolean(errors.nombre)}
                        helperText={errors.nombre}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Correo Electrónico *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Número Telefónico"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                        error={Boolean(errors.telefono)}
                        helperText={errors.telefono}
                        margin="normal"
                        variant="outlined"
                    />

                    <FormControl fullWidth margin="normal" error={Boolean(errors.asunto)} variant="outlined">
                        <InputLabel id="asunto-label">Asunto *</InputLabel>
                        <Select
                            labelId="asunto-label"
                            label="Asunto *"
                            name="asunto"
                            value={formData.asunto}
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>Selecciona un asunto</em></MenuItem>
                            <MenuItem value="consulta_general">Consulta General</MenuItem>
                            <MenuItem value="Compra">Compra</MenuItem>
                            <MenuItem value="productos_info">Información de Productos</MenuItem>
                            <MenuItem value="talleres_inscripcion">Inscripción a Talleres</MenuItem>
                            <MenuItem value="colaboracion">Propuesta de Colaboración</MenuItem>
                            <MenuItem value="otro">Otro</MenuItem>
                        </Select>
                        {errors.asunto && <Typography variant="caption" color="error">{errors.asunto}</Typography>}
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={Boolean(errors.categoria)} variant="outlined">
                        <InputLabel id="categoria-label">Categoría *</InputLabel>
                        <Select
                            labelId="categoria-label"
                            label="Categoría *"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>Selecciona una categoría</em></MenuItem>
                            <MenuItem value="productos">Productos</MenuItem>
                            <MenuItem value="talleres">Talleres</MenuItem>
                            <MenuItem value="servicios">Servicios</MenuItem>
                            <MenuItem value="pedidos_personalizados">Pedidos Personalizados</MenuItem>
                            <MenuItem value="eventos">Eventos</MenuItem>
                            <MenuItem value="general">General</MenuItem>
                        </Select>
                        {errors.categoria && <Typography variant="caption" color="error">{errors.categoria}</Typography>}
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={Boolean(errors.metodoEnvio)} variant="outlined">
                        <InputLabel id="metodo-envio-label">Método de Envío *</InputLabel>
                        <Select
                            labelId="metodo-envio-label"
                            label="Método de Envío *"
                            name="metodoEnvio"
                            value={formData.metodoEnvio}
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>Selecciona un método de envío</em></MenuItem>
                            <MenuItem value="retiro_tienda">Retiro en Tienda</MenuItem>
                            <MenuItem value="chilexpress">Chilexpress</MenuItem>
                            <MenuItem value="starken">Starken</MenuItem>
                        </Select>
                        {errors.metodoEnvio && <Typography variant="caption" color="error">{errors.metodoEnvio}</Typography>}
                    </FormControl>

                    <FormControl fullWidth margin="normal" error={Boolean(errors.metodoPago)} variant="outlined">
                        <InputLabel id="metodo-pago-label">Método de Pago *</InputLabel>
                        <Select
                            labelId="metodo-pago-label"
                            label="Método de Pago *"
                            name="metodoPago"
                            value={formData.metodoPago}
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>Selecciona un método de pago</em></MenuItem>
                            <MenuItem value="efectivo">Efectivo</MenuItem>
                            <MenuItem value="tarjeta_credito">Tarjeta de Crédito</MenuItem>
                            <MenuItem value="tarjeta_debito">Tarjeta de Débito</MenuItem>
                            <MenuItem value="transferencia">Transferencia Bancaria</MenuItem>
                        </Select>
                        {errors.metodoPago && <Typography variant="caption" color="error">{errors.metodoPago}</Typography>}
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Mensaje *"
                        name="mensaje"
                        multiline
                        rows={5}
                        value={formData.mensaje}
                        onChange={handleChange}
                        error={Boolean(errors.mensaje)}
                        helperText={errors.mensaje}
                        margin="normal"
                        variant="outlined"
                    />

                    <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdDZk8rAAAAAOWEVBR9nBVuog2JbX_zSO6eccOO"
                            onChange={setCaptchaToken}
                            onExpired={() => setCaptchaToken(null)}
                        />
                    </Box>
                    {errors.captcha && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                            {errors.captcha}
                        </Typography>
                    )}

                    <FormControlLabel
                        control={<Checkbox checked={formData.privacy} onChange={handleCheckboxChange} name="privacy" />}
                        label={
                            <span>
                                Acepto la <Chip component="a" href="/politica-de-privacidad" target="_blank" clickable label="política de privacidad" color="primary" size="small" />
                            </span>
                        }
                        sx={{ display: 'block', mt: 2 }}
                    />
                    {errors.privacy && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                            {errors.privacy}
                        </Typography>
                    )}

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5 }}>
                        Enviar Mensaje
                    </Button>
                </form>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactForm;