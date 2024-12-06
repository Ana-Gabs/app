import React, { useState, useEffect } from 'react';
import {WEBSERVICE_IP} from '../../functions/roots/webserviceIP';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Grid, FormLabel } from '@mui/material';
import { CancelButton, GuardarButton, AlertBox, SuccessAlertBox, DialogTitleWithIcons } from '../../functions/ModalsF';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { determinarCuadrante } from '../../functions/EisenhowerF';  // Asegúrate de que la función esté disponible

const EditarActividadModal = ({ open, onClose, actividad, onSubmit }) => {
    console.log(actividad);
    const [formData, setFormData] = useState({
        nombreActividad: '',
        fechaInicio: '',
        fechaFin: '',
        importancia: '',
        urgencia: '',
        descripcion: '',
        dificultad: '', 
        estado: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        if (actividad) {
            setFormData({
                nombreActividad: actividad.nombreActividad || '',
                fechaInicio: actividad.fechaInicio ? new Date(actividad.fechaInicio).toISOString().slice(0, 16) : '',
                fechaFin: actividad.fechaFin ? new Date(actividad.fechaFin).toISOString().slice(0, 16) : '',
                importancia: actividad.importancia || '',
                urgencia: actividad.urgencia || '',
                descripcion: actividad.descripcion || '',
                dificultad: String(actividad.dificultad || ''), 
                estado: actividad.estado || ''
            });
        }
    }, [actividad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGuardar = async () => {
        if (!actividad._id) {
            console.error("ID de la actividad no encontrado");
            return;
        }

        const camposVacios = Object.keys(formData).filter((key) => !formData[key] && key !== 'descripcion');
        if (camposVacios.length > 0) {
            setShowAlert(true);
            setEmptyFields(camposVacios);
            return;
        }
        const cuadranteCalculado = determinarCuadrante(
            formData.fechaFin,
            formData.importancia,
            formData.urgencia,
            parseInt(formData.dificultad, 10)
        );
        const actividadActualizada = {
            ...actividad,
            ...formData,
            fechaInicio: new Date(formData.fechaInicio).toISOString(),
            fechaFin: new Date(formData.fechaFin).toISOString(),
            cuadrante: cuadranteCalculado,  
        };

        const actividadId = String(actividadActualizada._id);  

        try {
            const response = await fetch(`${WEBSERVICE_IP}/actividades/editar/${actividadId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(actividadActualizada),
            });

            if (response.ok) {
                const data = await response.json();
                setShowSuccessAlert(true);
                setTimeout(() => setShowSuccessAlert(false), 3000);
                onSubmit(data); 
            } else {
                console.error('Error al actualizar la actividad');
            }
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIcons title="Editar Actividad" onClose={onClose} editIcon={<CalendarMonthIcon />} />
            <DialogContent>
                <Box pt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre de la Actividad"
                                name="nombreActividad"
                                value={formData.nombreActividad}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('nombreActividad')}
                                helperText={emptyFields.includes('nombreActividad') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha de Inicio"
                                name="fechaInicio"
                                type="datetime-local"
                                InputLabelProps={{ shrink: true }}
                                value={formData.fechaInicio}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('fechaInicio')}
                                helperText={emptyFields.includes('fechaInicio') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha de Fin"
                                name="fechaFin"
                                type="datetime-local"
                                InputLabelProps={{ shrink: true }}
                                value={formData.fechaFin}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('fechaFin')}
                                helperText={emptyFields.includes('fechaFin') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Importancia"
                                name="importancia"
                                select
                                value={formData.importancia}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('importancia')}
                                helperText={emptyFields.includes('importancia') ? 'Campo obligatorio' : ''}
                            >
                                <MenuItem value="Alta">Alta</MenuItem>
                                <MenuItem value="Media">Media</MenuItem>
                                <MenuItem value="Baja">Baja</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Urgencia"
                                name="urgencia"
                                select
                                value={formData.urgencia}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('urgencia')}
                                helperText={emptyFields.includes('urgencia') ? 'Campo obligatorio' : ''}
                            >
                                <MenuItem value="Alta">Alta</MenuItem>
                                <MenuItem value="Media">Media</MenuItem>
                                <MenuItem value="Baja">Baja</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Estado"
                                name="estado"
                                select
                                value={formData.estado}
                                onChange={handleChange}
                                fullWidth
                                error={emptyFields.includes('estado')}
                                helperText={emptyFields.includes('estado') ? 'Campo obligatorio' : ''}
                            >
                                <MenuItem value="Pendiente">Pendiente</MenuItem>
                                <MenuItem value="En proceso">En proceso</MenuItem>
                                <MenuItem value="Terminada">Terminada</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" fullWidth error={emptyFields.includes('dificultad')}>
                                <FormLabel component="legend">Dificultad</FormLabel>
                                <RadioGroup
                                    row
                                    name="dificultad"
                                    value={formData.dificultad}
                                    onChange={handleChange}
                                >
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <FormControlLabel
                                            key={value}
                                            value={String(value)}
                                            control={<Radio />}
                                            label={String(value)}
                                        />
                                    ))}
                                </RadioGroup>
                                {emptyFields.includes('dificultad') && <p style={{ color: 'red' }}>Campo obligatorio</p>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción"
                                name="descripcion"
                                multiline
                                rows={3}
                                value={formData.descripcion}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                {showAlert && <AlertBox />}
                {showSuccessAlert && <SuccessAlertBox />}
                <CancelButton onClick={onClose} />
                <GuardarButton onClick={handleGuardar} />
            </DialogActions>
        </Dialog>
    );
};

export default EditarActividadModal;
