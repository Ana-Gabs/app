import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/imagen3.jpg';
import '../App.css';
import {WEBSERVICE_IP} from '../functions/roots/webserviceIP'

const Suscripcion = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioId = sessionStorage.getItem('usuarioId');
        console.log(sessionStorage.getItem('usuarioId'));

        if (!usuarioId) {
            alert('Error: Usuario no identificado. Por favor, inicia sesión nuevamente.');
            navigate('/inicio-sesion');
            return;
        }
    
        if (!document.querySelector('#paypal-button-container > div')) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '500.00',
                                currency_code: 'MXN'
                            }
                        }]
                    });
                },
                
                onApprove: async (data, actions) => {
                    try {
                        // Capturar el pago
                        const order = await actions.order.capture();
                        console.log('Pago simulado exitosamente:', order);
                
                        // Registrar la suscripción en la base de datos
                        const response = await fetch(`${WEBSERVICE_IP}/subscripciones/suscripciones`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                usuarioId,
                                tipoSuscripcion: 'Premium',
                                fechaInicio: new Date().toISOString(),
                                fechaFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                                activa: true
                            })
                        });
                        
                        const data = await response.json();
                        console.log(data); 
                
                        if (response.ok) {
                            console.log('Suscripción registrada exitosamente.');
                      
                            // Enviar el correo de bienvenida
                            await fetch(`${WEBSERVICE_IP}/subscripciones/enviar-correo-suscripcion`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({ usuarioId }), // Reemplaza con el correo del usuario
                            });
                      
                            alert('Suscripción activada con éxito.');
                            navigate('/calendario');
                          } else {
                            console.error('Error al registrar la suscripción.');
                            alert('Hubo un problema al registrar la suscripción.');
                          }
                        } catch (error) {
                          console.error('Error en el flujo de aprobación:', error);
                          alert('Hubo un error en el proceso de pago. Inténtalo nuevamente.');
                        }
                }
            }).render('#paypal-button-container');
        }
        
    }, [navigate]);

    const handleCancel = () => {
        navigate('/calendario');
    };

    return (
        <div className="suscripcion-container">
            <div className="suscripcion-image">
                <img src={backgroundImage} alt="Suscripción" />
            </div>
            <div className="suscripcion-card">
                <h1>Suscripción</h1>
                <div className="price-container">
                    <h2>$ 500.00</h2>
                </div>
                <div className="features-container">
                    <ul>
                        <li>Calendario</li>
                        <li>Gestión de asistencias</li>
                        <li>Análisis de resultados</li>
                        <li>Notificaciones</li>
                        <li>Soporte</li>
                    </ul>
                </div>
                <div id="paypal-button-container"></div>
                <button className="pay-button" onClick={handleCancel}>Cancelar</button>
            </div>
        </div>
    );
};

export default Suscripcion;
