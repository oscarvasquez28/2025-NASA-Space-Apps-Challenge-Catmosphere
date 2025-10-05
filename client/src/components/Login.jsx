
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel, Stack, Paper, Alert } from '@mui/material';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
	email: '',
	password: '',
	name: '',
	lastname: '',
	has_asthma: false,
	has_allergies: false,
	has_cardiovascular_conditions: false,
	is_pregnant: false,
	is_athlete: false,
	has_kids_at_home: false,
	has_seniors_at_home: false,
	spends_time_outdoors: false,
};


function Login() {
	const [form, setForm] = useState(initialState);
	const [isRegister, setIsRegister] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(null);
		try {
			if (isRegister) {
			// Registro
			const payload = { ...form, password_hash: form.password };
            console.log(payload);
			const res = await api.post('/users', payload);
				setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
				setIsRegister(false);
			} else {
				// Login
				const res = await api.post('/users/login', {
					email: form.email,
					password: form.password,
				});
				// Guardar estado de login (puedes guardar token, etc.)
				sessionStorage.setItem('isLoggedIn', 'true');
				setSuccess('Login exitoso. Redirigiendo...');
				setTimeout(() => navigate('/'), 1200);
			}
		} catch (err) {
			setError(err.response?.data?.msg || 'Error en la operación');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
			<Paper elevation={3} sx={{ p: 4, minWidth: 340, maxWidth: 400 }}>
				<Typography variant="h5" mb={2} align="center">
					{isRegister ? 'Registro' : 'Iniciar Sesión'}
				</Typography>
				{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
				{success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
				<form onSubmit={handleSubmit}>
					<Stack spacing={2}>
						{isRegister && (
							<>
								<TextField label="Nombre" name="name" value={form.name} onChange={handleChange} required fullWidth />
								<TextField label="Apellido" name="lastname" value={form.lastname} onChange={handleChange} required fullWidth />
							</>
						)}
						<TextField label="Email" name="email" value={form.email} onChange={handleChange} required fullWidth type="email" />
						<TextField label="Contraseña" name="password" value={form.password} onChange={handleChange} required fullWidth type="password" />
						{isRegister && (
							<>
								<Typography variant="subtitle1" mt={2}>Perfil de Sensibilidad</Typography>
								<FormControlLabel control={<Checkbox name="has_asthma" checked={form.has_asthma} onChange={handleChange} />} label="Asma" />
								<FormControlLabel control={<Checkbox name="has_allergies" checked={form.has_allergies} onChange={handleChange} />} label="Alergias" />
								<FormControlLabel control={<Checkbox name="has_cardiovascular_conditions" checked={form.has_cardiovascular_conditions} onChange={handleChange} />} label="Condiciones cardiovasculares" />
								<FormControlLabel control={<Checkbox name="is_pregnant" checked={form.is_pregnant} onChange={handleChange} />} label="Embarazo" />
								<Typography variant="subtitle1" mt={2}>Estilo de Vida</Typography>
								<FormControlLabel control={<Checkbox name="is_athlete" checked={form.is_athlete} onChange={handleChange} />} label="Atleta" />
								<FormControlLabel control={<Checkbox name="has_kids_at_home" checked={form.has_kids_at_home} onChange={handleChange} />} label="Niños en casa" />
								<FormControlLabel control={<Checkbox name="has_seniors_at_home" checked={form.has_seniors_at_home} onChange={handleChange} />} label="Adultos mayores en casa" />
								<FormControlLabel control={<Checkbox name="spends_time_outdoors" checked={form.spends_time_outdoors} onChange={handleChange} />} label="Pasa tiempo al aire libre" />
							</>
						)}
						<Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
							{isRegister ? 'Registrarse' : 'Entrar'}
						</Button>
						<Button color="secondary" fullWidth onClick={() => { setIsRegister((v) => !v); setError(null); setSuccess(null); }}>
							{isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
						</Button>
					</Stack>
				</form>
			</Paper>
		</Box>
	);
}

export default Login;
