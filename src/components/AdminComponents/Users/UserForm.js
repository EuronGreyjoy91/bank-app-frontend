import * as yup from 'yup';

import { BASE_USERS_URL, BASE_USER_TYPES_URL, REPEATED_USERNAME_ERROR, authHeader } from '../../../Commons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SimpleAlertMessage from '../../Commons/SimpleAlertMessage';
import Stack from '@mui/material/Stack';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import es from 'yup-es';
import { useFormik } from 'formik';

function UserForm() {
    yup.setLocale(es);
    const { userId } = useParams();
    const [userTypes, setUserTypes] = useState([]);

    const navigate = useNavigate();
    const childStateRef = useRef();

    const showErrorDialog = (message) => {
        const openDialog = childStateRef.current.getHandleClickOpen(message);
        openDialog();
    }

    const validationSchema = yup.object({
        userTypeCode: yup
            .string('Selecciona un tipo de usuario')
            .required('El tipo de usuario es requerido'),
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
            userTypeCode: '',
            userName: '',
            password: '',
            repassword: ''
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (userId == null) {
                axios
                    .post(BASE_USERS_URL, values, {
                        headers: {
                            'Authorization': `Bearer ${authHeader()}`
                        }
                    })
                    .then((response) => {
                        navigate('/usuarios/?alertStatus=success&message=Usuario guardado con exito', { replace: true });
                    })
                    .catch(error => {
                        handleErrorResponse(error);
                    });
            }
            else {
                axios
                    .patch(`${BASE_USERS_URL}/${userId}`, values, {
                        headers: {
                            'Authorization': `Bearer ${authHeader()}`
                        }
                    })
                    .then((response) => {
                        navigate('/usuarios?alertStatus=success&message=Usuario guardado con exito', { replace: true });
                    }).catch(error => {
                        handleErrorResponse(error);
                    });
            }
        },
    });

    const handleErrorResponse = (error) => {
        if (error.response.data.code === REPEATED_USERNAME_ERROR.code)
            showErrorDialog("Usuario no valido");
        else
            showErrorDialog("Ocurrio un error, intente nuevamente.");
    }

    useEffect(() => {
        axios
            .get(BASE_USER_TYPES_URL, {
                headers: {
                    'Authorization': `Bearer ${authHeader()}`
                }
            })
            .then((response) => {
                setUserTypes(response.data);

                if (userId != null) {
                    axios
                        .get(`${BASE_USERS_URL}/${userId}`)
                        .then((response) => {
                            formik.setFieldValue("userName", response.data.userName);
                            formik.setFieldValue("password", response.data.password);
                            formik.setFieldValue("repassword", response.data.password);
                            formik.setFieldValue("userTypeCode", response.data.userType.code);
                        })
                }
            })
    }, []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <FormControl fullWidth disabled = {userId != null}>
                    <InputLabel id="user-type-id-label">Tipo de usuario</InputLabel>
                    <Select
                        labelId="user-type-code-label"
                        id="userTypeCode"
                        name="userTypeCode"
                        value={formik.values.userTypeCode}
                        label="Tipo de usuario"
                        onChange={formik.handleChange}
                        error={formik.touched.userTypeCode && Boolean(formik.errors.userTypeCode)}
                    >
                        <MenuItem value="">
                            <em>Seleccione una opci&oacute;n</em>
                        </MenuItem>
                        {
                            userTypes.map((userType) => {
                                return <MenuItem key={userType._id} value={userType.code}>{userType.description}</MenuItem>
                            })
                        }
                    </Select>
                    {formik.touched.userTypeCode && formik.errors.userTypeCode && <FormHelperText>{formik.errors.userTypeCode}</FormHelperText>}
                </FormControl>
                <FormControl>
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
                </FormControl>
                <FormControl>
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
                </FormControl>
                <FormControl>
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
                </FormControl>
            </Stack>
            <Button style={{ marginTop: "20px" }} color="primary" variant="contained" type="submit">
                Guardar
            </Button>
            <SimpleAlertMessage ref={childStateRef}></SimpleAlertMessage>
        </form>
    );
}

export default UserForm;