"use client";
import React, { useEffect, useState } from 'react';
import './Base.css';
import PropTypes from 'prop-types';
import { BotonAceptar } from '../../components/BotonAceptar/BotonAceptar';
import { ModalAgregar } from '../../components/ModalAgregar';

export const Base = ({ }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);


	const [poliza, setPoliza] = useState([]);
	const [actualizar, setActualizar] = useState(false);

	const [documentos, setDocumentos] = useState([]);
	/*const poliza = [
		{nombre:"poliza 1", fecha:"12/12/12"},
		{nombre:"poliza 2", fecha:"12/12/12"},
		{nombre:"poliza 3", fecha:"12/12/12"},
	]*/

	useEffect(() => {
		fetch("http://localhost:3030/login/lista")
			.then(res => res.json())
			.then(data => {
				console.log("Archivos en S3:", data);
				setDocumentos(data);
			});
		//consultarBodegas();
	}, []);

	const agregar_dato = () => {
		setActualizar(!actualizar);
		setPoliza([...poliza, { nombre: "pepes" }]);
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

	const abrirModal = () => {
		console.log("abirmos modal");
		setOpen(true);
	}
	const guardarPolizaBase = () => {
		console.log("logica para guardar una poliza");
	};


	const [archivo, setArchivo] = useState(null);

	const handleArchivoChange = (e) => {
		setArchivo(e.target.files[0]);
	};

	const guardarPDF = async () => {
		if (!archivo) {
			alert("Selecciona un archivo PDF");
			return;
		}

		const formData = new FormData();
		formData.append("archivo", archivo);

		try {
			const res = await fetch("http://localhost:3030/login", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();
			if (res.ok) {
				alert("Archivo subido con éxito");
				guardarPolizaBase(); // llamar lógica padre
				handleClose();
			} else {
				alert(data.error || "Error al subir");
			}
		} catch (err) {
			console.error("Error al subir archivo:", err);
			alert("No se pudo conectar al servidor");
		}
	};

	const descargarArchivo = async (nombre) => {
		const res = await fetch(`http://localhost:3030/login/descarga/${encodeURIComponent(nombre)}`);
		const data = await res.json();
		window.open(data.url, "_blank");
	};

	const eliminarArchivo = async (nombre) => {
		try {
			const res = await fetch(`http://localhost:3030/login/eliminar/${encodeURIComponent(nombre)}`, {
				method: "DELETE",
			});

			const data = await res.json();
			if (res.ok) {
				alert("Archivo eliminado");
				setDocumentos(documentos.filter(doc => doc.nombre !== nombre));
			} else {
				alert(data.error || "No se pudo eliminar");
			}
		} catch (err) {
			console.error("Error al eliminar archivo:", err);
			alert("Error en la conexión con el servidor");
		}
	};

	return (
		<div className='base'>
			<BotonAceptar texto={"boton base"} />
			<button onClick={abrirModal}>Agregar informacion</button>

			<button onClick={agregar_dato}>agregar</button>

			<ModalAgregar open={open} handleClose={handleClose} guardarPoliza={guardarPolizaBase} />

			<h2>Subir un archivo PDF</h2>
			<input type="file" accept="application/pdf" onChange={handleArchivoChange} />
			<button onClick={guardarPDF} >guardar archivo</button>

			<h1>Listar Archivos:</h1>
			<ul>
				{documentos.map((archivo, index) => (
					<li key={index}>
						{archivo.nombre}
						<button onClick={() => descargarArchivo(archivo.nombre)}>Descargar</button>
						<button onClick={() => eliminarArchivo(archivo.nombre)}>Eliminar</button>
					</li>
				))}
			</ul>
		</div>
	);
};

Base.propTypes = {};
