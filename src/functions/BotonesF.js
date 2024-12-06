// ./functions/BotonesF.js

import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const CircularButton = styled(Button)`
    && {
        background-color: #EAC4D5;
        color: white;
        width: 56px; 
        height: 56px;
        min-width: 0;
        border-radius: 50%;
        margin: 10px;
        transition: transform 0.2s ease, box-shadow 0.2s ease; 
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color: #EFA1C4;
            transform: scale(1.05); 
        }

        &:active {
            transform: scale(0.95); 
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); 
        }
    }
`;

const RegularButton = styled(Button)`
    && {
        background-color: #EAC4D5;
        color: white;
        margin: 10px;
        font-weight: bold; 
        text-transform: none;
        font-size: 16px;
        transition: transform 0.2s ease, box-shadow 0.2s ease; 
        
        &:hover {
            background-color: #EFA1C4;
            transform: scale(1.05); 
        }

        &:active {
            transform: scale(0.95); 
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); 
        }
    }
`;

const MediumButton = styled(Button)`
    && {
        background-color: #EAC4D5;
        color: white;
        margin: 10px;
        font-weight: bold; 
        text-transform: none;
        font-size: 16px;
        transition: transform 0.2s ease, box-shadow 0.2s ease; 
        width: 100%; // Tamaño intermedio
        
        &:hover {
            background-color: #EFA1C4;
            transform: scale(1.05); 
        }

        &:active {
            transform: scale(0.95); 
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); 
        }
    }
`;

export function AgregarButtonWithIcon({ onClick, icon, children, isCircular, isMediumScreen }) {
    let ButtonComponent;
    if (isCircular) {
        ButtonComponent = CircularButton;
    } else if (isMediumScreen) {
        ButtonComponent = MediumButton;
    } else {
        ButtonComponent = RegularButton;
    }

    return (
        <ButtonComponent onClick={onClick}>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon && React.cloneElement(icon, { style: { color: 'white' } })}
                {!isCircular && children}
            </Box>
        </ButtonComponent>
    );
}
