"use client";
import React from 'react';
import './NavegadorUsuario.css';
import PropTypes from 'prop-types';

export const NavegadorUsuario = ({}) => {
	return (
		<div className='navegadorusuario'>
 			<div className='navegador'>
				<a href="#contactos">Contacto</a>
				<a href="#mensajes">Mensajes</a>
			</div>
 		</div>
	);
};

NavegadorUsuario.propTypes = {};

