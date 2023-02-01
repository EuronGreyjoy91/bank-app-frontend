import * as yup from 'yup';

import { BASE_USERS_URL, NOT_FOUND_ERROR, VALIDATION_ERROR, authHeader } from '../Commons';
import React, { useRef } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import AlertWithTimer from '../components/Commons/AlertWithTimer';
import Box from '@mui/material/Box';
import Button from "@material-ui/core/Button";
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LoginNavbar from '../components/Commons/LoginNavbar';
import SimpleAlertMessage from '../components/Commons/SimpleAlertMessage';
import TextField from "@material-ui/core/TextField";
import { Typography } from '@mui/material';
import axios from 'axios';
import es from 'yup-es';
import { useFormik } from 'formik';

const Home = () => {
    yup.setLocale(es);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const childStateRef = useRef();

    const showErrorDialog = (message) => {
        const openDialog = childStateRef.current.getHandleClickOpen(message);
        openDialog();
    }

    const validationSchema = yup.object({
        userName: yup
            .string('Ingrese un nombre de usuario')
            .min(5)
            .max(100)
            .required('El nombre de usuario es requerido'),
        password: yup
            .string('Ingrese una contraseña')
            .min(5)
            .max(100)
            .required('La contraseña es requerida'),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios
                .post(`${BASE_USERS_URL}/login`, values, {
                    headers: {
                        'Authorization': `Bearer ${authHeader()}`
                    }
                }).then((response) => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('user', JSON.stringify(response.data.user));

                    if (response.data.user.userType === 'ADMIN')
                        navigate('/cuentas', { replace: true });
                    else if (response.data.user.clientId == null)
                        navigate(`/${response.data.user.id}/completar-datos`, { replace: true });
                    else
                        navigate(`/${response.data.user.clientId}/cuentas`, { replace: true });
                        
                }).catch(error => {
                    handleErrorResponse(error);
                });
        },
    });

    const handleErrorResponse = (error) => {
        if (error.response.data.code === NOT_FOUND_ERROR.code)
            showErrorDialog("Usuario no encontrado");
        else if (error.response.data.code === VALIDATION_ERROR.code)
            showErrorDialog("Usuario y/o contraseña invalida");
        else
            showErrorDialog("Ocurrio un error, intente nuevamente.");
    }

    return (
        <Fragment>
            <LoginNavbar></LoginNavbar>
            {
                searchParams.get('alertStatus') && <AlertWithTimer severity={searchParams.get('alertStatus')} message={searchParams.get('message')}></AlertWithTimer>
            }
            <Container>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={12}>
                        <Typography align="center" variant="h3">
                            Login
                        </Typography>
                    </Grid>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="userName"
                                name="userName"
                                label="Usuario"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                error={formik.touched.userName && Boolean(formik.errors.userName)}
                                helperText={formik.touched.userName && formik.errors.userName}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Contraseña"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{ paddingTop: "40px" }} container spacing={2} justifyContent="center" >
                        <Grid item xs={12} md={4}>
                            <Box textAlign='center'>
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Entrar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid style={{ paddingTop: "20px" }} container spacing={2} justifyContent="center" >
                        <Grid item xs={12} md={6}>
                            <Box textAlign='center'>
                                ¿No tenes usuario? <Link href="/login/usuarios/nuevo">Registrate!</Link>
                            </Box>
                        </Grid>
                    </Grid>
                    <SimpleAlertMessage ref={childStateRef}></SimpleAlertMessage>
                </form>
            </Container>
        </Fragment>
    )
};

export default Home;