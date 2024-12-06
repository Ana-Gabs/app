import React, { useState, useEffect } from 'react';
import {WEBSERVICE_IP} from '../../functions/roots/webserviceIP'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Grid, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { CancelButton, GuardarButton, AlertBox, SuccessAlertBox, DialogTitleWithIcons } from '../../functions/ModalsF';
import { validarCamposVacios } from '../../functions/ModalsF';
import { determinarCuadrante } from '../../functions/EisenhowerF';

const AgregarActividadModal = ({ open, onClose, onSubmit, usuarioId }) => {
    const [formData, setFormData] = useState({
        usuarioId: usuarioId || '',
        nombreActividad: '',
        fechaInicio: '',
        fechaFin: '',
        importancia: '',
        urgencia: '',
        descripcion: '',
        estado: 'Pendiente',
        fechaCreacion: new Date().toISOString(),
        fechaTermino: null,
        dificultad: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        if (usuarioId) {
            setFormData(prev => ({ ...prev, usuarioId }));
        }
    }, [usuarioId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGuardar = async () => {
        const camposVacios = validarCamposVacios(formData, setShowAlert, setEmptyFields);
        if (!camposVacios) {
            const cuadranteCalculado = determinarCuadrante(
                formData.fechaFin,
                formData.importancia,
                formData.urgencia,
                parseInt(formData.dificultad, 10)
            );

            const dataConFormatoISO = {
                ...formData,
                fechaInicio: new Date(formData.fechaInicio).toISOString(),
                fechaFin: new Date(formData.fechaFin).toISOString(),
                fechaCreacion: new Date().toISOString(),
                fechaTermino: null,
                cuadrante: cuadranteCalculado
            };

            try {
                const response = await fetch(`${WEBSERVICE_IP}/actividades/crear`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataConFormatoISO),
                });

                if (response.ok) {
                    const nuevaActividad = await response.json();
                    onSubmit(nuevaActividad);
                    setShowSuccessAlert(true);
                    setTimeout(() => setShowSuccessAlert(false), 5000);
                    onClose();
                } else {
                    console.error('Error al crear la actividad');
                }
            } catch (error) {
                console.error('Error al guardar la actividad:', error);
            }
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitleWithIcons title="Agregar Actividad" onClose={onClose} editIcon={<CalendarMonthIcon />} />
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12}>
                            <FormControl component="fieldset" fullWidth error={emptyFields.includes('dificultad')}>
                                <FormLabel component="legend">Dificultad</FormLabel>
                                <RadioGroup
                                    row
                                    name="dificultad"
                                    value={formData.dificultad}
                                    onChange={handleChange}
                                >
                                    <Box display="flex" justifyContent="space-between" width="100%">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <FormControlLabel
                                                key={value}
                                                value={String(value)}
                                                control={<Radio />}
                                                label={String(value)}
                                            />
                                        ))}
                                    </Box>
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
                                error={emptyFields.includes('descripcion')}
                                helperText={emptyFields.includes('descripcion') ? 'Campo obligatorio' : ''}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <AlertBox showAlert={showAlert} setShowAlert={setShowAlert} />
                {showSuccessAlert && (
                    <SuccessAlertBox message="Actividad guardada exitosamente" />
                )}
            </DialogContent>
            <DialogActions>
                <CancelButton onClose={onClose} />
                <GuardarButton onClick={handleGuardar} />
            </DialogActions>
        </Dialog>
    );
};

export default AgregarActividadModal;
