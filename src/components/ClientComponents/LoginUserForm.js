import * as yup from 'yup';

import { BASE_USERS_URL, BASE_USER_TYPES_URL, CLIENT_USER_TYPE_DESCRIPTION, REPEATED_USERNAME_ERROR } from '../../Commons';
import React, { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Button from "@material-ui/core/Button";
import Grid from '@mui/material/Grid';
import SimpleAlertMessage from "../Commons/SimpleAlertMessage";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import es from 'yup-es';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

function LoginUserForm() {
    yup.setLocale(es);
    const navigate = useNavigate();
    const childStateRef = useRef();

    const showErrorDialog = (message) => {
        const openDialog = childStateRef.current.getHandleClickOpen(message);
        openDialog();
    }

    useEffect(() => {
        axios(BASE_USER_TYPES_URL)
            .then((response) => {
                formik.values.userTypeCode = response.data.find(userType => userType.description === CLIENT_USER_TYPE_DESCRIPTION).code;
            })
    }, []);

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
        repassword: yup
            .string('Vuelva a ingresar la contraseña')
            .min(5)
            .max(100)
            .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
            .required('Vuelva a ingresar la contraseña'),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            repassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios
                .post(BASE_USERS_URL, values)
                .then((response) => {
                    navigate('/?alertStatus=success', { replace: true });
                })
                .catch(error => {
                    if (error.response.data.code === REPEATED_USERNAME_ERROR.code)
                        showErrorDialog("Usuario no valido");
                    else
                        showErrorDialog("Ocurrio un error, intente nuevamente");
                });
        },
    });

    return (
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
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        id="repassword"
                        name="repassword"
                        label="Reingrese la contraseña"
                        type="password"
                        value={formik.values.repassword}
                        onChange={formik.handleChange}
                        error={formik.touched.repassword && Boolean(formik.errors.repassword)}
                        helperText={formik.touched.repassword && formik.errors.repassword}
                    />
                </Grid>
            </Grid>
            <Grid style={{ paddingTop: "40px" }} container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={4}>
                    <Box textAlign='center'>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Registrarse
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <SimpleAlertMessage ref={childStateRef}></SimpleAlertMessage>
        </form>
    )
}

export default LoginUserForm;