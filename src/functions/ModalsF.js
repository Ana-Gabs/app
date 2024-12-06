// ./functions/ModalsF.js
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const modalStyles = {
    modal: {
        maxWidth: '600px', 
        width: '80%', 
        '@media (min-width: 600px)': {
            maxWidth: '700px', 
        },
        '@media (min-width: 900px)': {
            maxWidth: '900px',
        },
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#809BCE',
        color: 'white',
        padding: '16px 24px', 
        minHeight: '50px',
    },
    titleBox: {
        display: 'flex',
        alignItems: 'center',
    },
    editIcon: {
        marginRight: 8,
    },
    closeButton: {
        color: 'white',
    },
    dialogContent: {
        padding: '24px', // padding al contenido del diálogo
    },
    cancelButton: {
        color: 'white',
        backgroundColor: '#D32F2F', // Cambia el color de fondo según tu preferencia
        '&:hover': {
            backgroundColor: '#8B3840', // Cambia el color de fondo al pasar el ratón
        },
        textTransform: 'none', // Texto en minúsculas
        fontWeight: 'bold', // Texto en negritas
        display: 'flex',
        alignItems: 'center',
    },
    // Define los estilos de los campos de texto
    textField: {
        // Define los estilos de los campos de texto
    },
    button: {
        // Define los estilos de los botones
    },
    selectMenu: {
        // Define los estilos de los selectores y menús desplegables
    },
    alert: {
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        opacity: 1,
        transition: 'opacity 0.5s',
    },
};

// Funciones Reutilizables
export function validarCamposVacios(formData, setShowAlert, setEmptyFields) {
    // Verificar qué campos del formulario están vacíos
    const camposVacios = Object.entries(formData).filter(([key, value]) => value === '').map(([key]) => key);

    if (camposVacios.length > 0) {
        // Mostrar el alerta
        setShowAlert(true);
        // Establecer los campos vacíos en el estado
        setEmptyFields(camposVacios);
        // Ocultar el alerta después de 5 segundos
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    } else {
        // Limpiar los campos vacíos si todos están llenos
        setEmptyFields([]);
    }

    return camposVacios.length > 0;
}


export function DialogTitleWithIcons({ title, onClose, editIcon }) {
    return (
        <Box style={modalStyles.dialogTitle}>
            <Box style={modalStyles.titleBox}>
                {editIcon && React.cloneElement(editIcon, { style: modalStyles.editIcon })} {/* Renderiza el icono pasado como prop */}
                <Typography variant="h6" fontWeight="bold">{title}</Typography> {/* Cambia el tamaño de la fuente y pone en negritas */}
            </Box>
            <CloseButton onClose={onClose} />
        </Box>
    );
}

export function CloseButton({ onClose }) {
    return (
        <IconButton edge="end" style={modalStyles.closeButton} onClick={onClose} aria-label="close">
            <CloseIcon />
        </IconButton>
    );
}

export function CancelButton({ onClose }) {
    return (
        <Button onClick={onClose} style={modalStyles.cancelButton}>
            <CloseIcon />
            <Typography variant="button" style={{ textTransform: 'none', fontWeight: 'bold', marginLeft: 8 }}>Cancelar</Typography>
        </Button>
    );
}

export function GuardarButton({ onClick }) {
    return (
        <Button
            onClick={onClick}
            style={{ ...modalStyles.cancelButton, backgroundColor: '#198754' }}
            startIcon={<SaveIcon />}
        >
            <Typography variant="button" style={{ textTransform: 'none', fontWeight: 'bold', marginLeft: 8 }}>
                Guardar
            </Typography>
        </Button>
    );
}

// Nueva función para manejar cierre de modal
export function handleCloseModal(onClose, event, reason) {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
        onClose();
    }
}

// Función para guardar los cambios realizados en el formulario
export function guardarCambios(formData) {
}

// Función para cerrar la modal
export function cerrarModal(onClose) {
    onClose();
}

export function AlertBox({ showAlert, setShowAlert }) {
    const [alertOpacity, setAlertOpacity] = useState(1);

    useEffect(() => {
        let timer;
        if (showAlert) {
            setAlertOpacity(1);
            timer = setTimeout(() => {
                setAlertOpacity(0);
                setTimeout(() => {
                    setShowAlert(false);
                }, 500); // Duración de la transición de opacidad
            }, 4500); // Tiempo antes de comenzar la transición de opacidad
        }
        return () => clearTimeout(timer);
    }, [showAlert, setShowAlert]);

    return (
        showAlert && (
            <Box style={{ ...modalStyles.alert, opacity: alertOpacity }}>
                <Alert variant="filled" severity="warning" onClose={() => setShowAlert(false)}>
                    Por favor, completa todos los campos.
                </Alert>
            </Box>
        )
    );
}

export function SuccessAlertBox({ showSuccessAlert, setShowSuccessAlert }) {
    const [alertOpacity, setAlertOpacity] = useState(1);

    useEffect(() => {
        let timer;
        if (showSuccessAlert) {
            setAlertOpacity(1);
            timer = setTimeout(() => {
                setAlertOpacity(0);
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 500); // Duración de la transición de opacidad
            }, 4500); // Tiempo antes de comenzar la transición de opacidad
        }
        return () => clearTimeout(timer);
    }, [showSuccessAlert, setShowSuccessAlert]);

    return (
        showSuccessAlert && (
            <Box style={{ ...modalStyles.alert, opacity: alertOpacity }}>
                <Alert variant="filled" severity="success" onClose={() => setShowSuccessAlert(false)}>
                    Guardado exitosamente.
                </Alert>
            </Box>
        )
    );
}


export function PasswordField({ label, name, value, onChange, error, helperText }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <TextField
                type={showPassword ? 'text' : 'password'}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                fullWidth
                error={error}
                helperText={helperText}
                style={modalStyles.textField}
            />
            <IconButton
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
        </Box>
    );
}




