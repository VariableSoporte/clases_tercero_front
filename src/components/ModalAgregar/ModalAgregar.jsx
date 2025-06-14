"use client";
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};


export const ModalAgregar = ({ open, handleClose, guardarPoliza }) => {

	return (
		<div>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							Agregar Poliza
						</Typography>
						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
							<TextField
								error
								id="input text"
								label="Error"
								defaultValue="Hello World"
							/>
							<Button variant="contained" onClick={guardarPoliza}>Guardar</Button>
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

ModalAgregar.propTypes = {};

