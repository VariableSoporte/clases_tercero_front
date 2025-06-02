"use client";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavegadorUsuario } from '../../components/NavegadorUsuario';
import FormControl from '@mui/material/FormControl';
import { UserContext } from '../../context/UserContext';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './Login.css';
import { BotonAceptar } from '../../components/BotonAceptar/BotonAceptar';


export const Login = ({ }) => {

	//creamos las constantes con sus valores
	const [correo, setCorreo] = useState('');
	const [contrasenia, setContrasenia] = useState('');

	//creo la variable que me muestra el error
	const [correoError, setCorreoError] = useState(false);
	const [contraseniaError, setContraseniaError] = useState(false);


	const navigate = useNavigate();
	const { usuario, setUsuario } = useContext(UserContext);


	const redireccionHome = () => {
		navigate('/home', { replace: true })
	};

	const cambioDatos = () => {
		setUsuario(
			{
				...usuario,
				nombre: "luis"

			}
		);
	}

	//creo una funcion para validar el correo
	const validarCorreo = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	//esta es mi funcion de logeo
	const usuarioLogeo = async () => {
		const correoValido = validarCorreo(correo); //retorna true o false
		const contraseniaValida = contrasenia.length >= 8; //retorna un true o false

		setCorreoError(!correoValido);
		setContraseniaError(!contraseniaValida);

		if (!correoValido || !contraseniaValida) return;

		try {
			const response = await fetch("http://localhost:3030/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ correo, contrasenia })
			});

			const data = await response.json();

			if (response.ok) {
				console.log("Login exitoso:", data);
				setUsuario({ ...usuario, nombre: data.usuario.nombres, activo:data.usuario.activo, id_usuario: data.usuario.id_usuario }); // Guarda los datos en el context
				navigate('/home2', { replace: true });
			} else {
				alert(data.mensaje || "Error en login");
			}
		} catch (error) {
			console.error("Error de conexión con el servidor:", error);
			alert("No se pudo conectar al servidor");
		}
	};

	const saludar_login = (  ) => {
		console.log("saludar desde el login: ");
	};
 
	return (
		<Box sx={{ flexGrow: 1, width: "100vw", height:"100vh" }}>
			<Grid container spacing={2}>
				<Grid size={12}>
					<NavegadorUsuario />
				</Grid>
				<BotonAceptar texto={"Boton login"} funcion_boton={saludar_login}/>
				<Grid size={{ xs: 12, md: 6, xl: 4 }}>
					<h1>Este es el login</h1>
				</Grid>
				<Grid size={{ xs: 12, md: 6 , xl: 4}}>
					<h2>valor del usuario: {usuario.nombre || "sin datos"}</h2>
				</Grid>
				<Grid size={{ xs: 12, md: 6 , xl: 4}}>
				<button onClick={cambioDatos}>cambiar datos</button>
				</Grid>
				<button onClick={redireccionHome} >boton home</button>
				<br />

				<FormControl className='prueba' variant="standard" sx={{ m: 1, width: '300px' }}>
					<InputLabel error={correoError} htmlFor="correo" >Correo</InputLabel>
					<Input id="correo" error={correoError} value={correo} onChange={(e) => setCorreo(e.target.value)} />
					{correoError && <FormHelperText error={correoError} >Correo no válido</FormHelperText>}
				</FormControl>

				<FormControl className='prueba' variant="standard" sx={{ m: 1, width: '300px' }}>
					<InputLabel error={contraseniaError} htmlFor="contrasenia">Contraseña</InputLabel>
					<Input id="contrasenia" error={contraseniaError} type="text" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
					{contraseniaError && <FormHelperText error={contraseniaError}>Debe tener al menos 8 caracteres</FormHelperText>}
				</FormControl>

				<br />

				<Button variant="contained" color="primary" onClick={usuarioLogeo}>
					Iniciar sesión
				</Button>
				<h1>{correo}</h1>
			</Grid>
		</Box>
	);
};


