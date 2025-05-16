"use client";
import React, { useContext } from 'react';
import './Home.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { NavegadorAdmin } from '../../components/NavegadorAdmin';
import { UserContext } from '../../context/UserContext';

export const Home = ({}) => {
	const navigate = useNavigate();
	const {usuario, setUsuario} = useContext(UserContext);

	const redireccionLogin =()=>{
		
		navigate('/login',{replace:true});
	};

	const cambioNombre = ()=>{
		setUsuario({
			nombre: "pepe",
			edad: 5
			});
	};

	return (
		<div className='home'>
			<NavegadorAdmin/>
 			<h1>Ruta del home</h1>
			<h2>este es el valor del usuario nombre: {usuario.nombre || "sin nombre"}</h2>
			<h2>este es el valor del usuario edad: {usuario.edad || "sin edad"}</h2>
			<button onClick={cambioNombre}>cambiar nombre</button>
			<button onClick={redireccionLogin}>rediccion login</button>
			<Button className='botonReact' variant="contained" color="error" onClick={redireccionLogin}> direccion login </Button>
 		</div>
	);
};


