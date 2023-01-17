import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import es from 'yup-es';
import { BASE_USERS_URL, BASE_USER_TYPES_URL, CLIENT_USER_TYPE_DESCRIPTION, REPEATED_ERROR } from '../../Commons';
import SimpleAlertMessage from "./SimpleAlertMessage";

function UserForm() {
    yup.setLocale(es);
    const navigate = useNavigate();
    const [userTypes, setUserTypes] = useState([]);
    const [error, setError] = useState(null);
    const childStateRef = useRef();

    const showErrorDialog = () => {
        const openDialog = childStateRef.current.getHandleClickOpen();
        openDialog();
    }

    useEffect(() => {
        axios(BASE_USER_TYPES_URL)
            .then((response) => {
                setUserTypes(response.data);
                formik.values.userTypeId = response.data.find(userType => userType.description === CLIENT_USER_TYPE_DESCRIPTION)._id;
                setError(null);
            })
            .catch(setError);
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
                    if (error.response.data.code === REPEATED_ERROR.code) {
                        showErrorDialog();
                        formik.values.userName = ''
                    }
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
                        label="Password"
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
            <SimpleAlertMessage message={'Usuario no valido'} ref={childStateRef}></SimpleAlertMessage>
        </form>
    )
}

export default UserForm;