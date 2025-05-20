"use client";
import React, { useEffect, useState } from 'react';
import './Base.css';
import PropTypes from 'prop-types';

export const Base = ({ }) => {
	const [poliza, setPoliza] = useState([]);
	const [actualizar, setActualizar] = useState(false);
	/*const poliza = [
		{nombre:"poliza 1", fecha:"12/12/12"},
		{nombre:"poliza 2", fecha:"12/12/12"},
		{nombre:"poliza 3", fecha:"12/12/12"},
	]*/

	useEffect(() => {
		consultarBodegas();
	}, []);

	const agregar_dato = () => {
		setActualizar(!actualizar);
		setPoliza([...poliza,{nombre:"pepes"}]);
	};

	const consultarBodegas = async () => {
		try {
			const response = await fetch("http://localhost:3030/bodega", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
				//body: JSON.stringify({ correo, contrasenia })
			});

			const data = await response.json();

			if (response.ok) {
				console.log("datos de bodegas:", data);
				setPoliza(data);
				//setUsuario({...usuario, nombre:data.usuario.nombres}); // Guarda los datos en el context
				//navigate('/home', { replace: true });
			} else {
				alert(data.mensaje || "Error en bodega");
			}
		} catch (error) {
			console.error("Error de conexión con el servidor:", error);
			alert("No se pudo conectar al servidor");
		}
	};
	return (
		<div className='base'>
			{poliza.map((u) => {
				return (
				<div>
					<h1>{u.nombre}</h1>
					<h1>{u.zona}</h1>
				</div>
			)})}

			<button onClick={agregar_dato}>agregar</button>
		</div>
	);
};

Base.propTypes = {};
