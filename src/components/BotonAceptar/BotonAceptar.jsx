"use client";
import React from 'react';
import './BotonAceptar.css';
import PropTypes from 'prop-types';

export const BotonAceptar = ({texto = "sin nombre", funcion_boton = ()=>{console.log("sin funcion")}}) => {

	const saluda = ()=>{
		
		funcion_boton();
		//console.log("hola desde la base")
	};

	return (
		<div>
			<button onClick={saluda}>{texto}</button>
		</div>
	);
};

