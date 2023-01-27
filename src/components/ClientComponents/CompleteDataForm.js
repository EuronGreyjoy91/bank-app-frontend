import * as yup from 'yup';

import { BASE_CLIENTS_URL, BASE_CLIENT_TYPES_URL, PERSONA_JURIDICA_CLIENT_TYPE_CODE, REPEATED_DOCUMENT_ERROR, VALIDATION_ERROR } from '../../Commons';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SimpleAlertMessage from '../Commons/SimpleAlertMessage';
import Stack from '@mui/material/Stack';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import es from 'yup-es';
import { logout } from '../../Commons';
import { useFormik } from 'formik';

function CompleteDataForm() {
    yup.setLocale(es);
    const { userId } = useParams();
    const [clientTypes, setClientTypes] = useState([]);

    const childStateRef = useRef();

    const showErrorDialog = (message) => {
        const openDialog = childStateRef.current.getHandleClickOpen(message);
        openDialog();
    }

    const navigate = useNavigate();

    const validationSchema = yup.object({
        clientTypeCode: yup
            .string('Selecciona un tipo de cliente')
            .required('El tipo de cliente es requerido'),
        name: yup
            .string('Ingrese un nombre')
            .required('El nombre es requerido')
            .min(3)
            .max(200),
        lastName: yup
            .string('Ingrese un nombre')
            .required('El nombre es requerido')
            .min(3)
            .max(200),
        document: yup
            .string('Ingrese un numero de documento')
            .required('El documento es requerido')
            .min(8)
            .max(8)
            .matches(/^\d+$/, 'Solo numeros'),
        cuitCuil: yup
            .string('Ingrese Cuit / Cuil')
            .required('El Cuit / Cuil es requerido')
            .min(8)
            .max(11)
            .matches(/^\d+$/, 'Solo numeros'),
        businessName: yup
            .string(),
        adress: yup
            .string()
    });

    const formik = useFormik({
        initialValues: {
            clientTypeCode: '',
            name: '',
            lastName: '',
            document: '',
            cuitCuil: '',
            businessName: '',
            adress: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.businessName === '')
                delete values.businessName;

            if (values.adress === '')
                delete values.adress;

            values.userId = userId;

            axios
                .post(BASE_CLIENTS_URL, values)
                .then((response) => {
                    logout();
                    navigate('/?alertStatus=success&message=Datos actualizados con exito. Vuelva a ingresar', { replace: true });
                }).catch(error => {
                    handleErrorResponse(error);
                });
        },
    });

    const handleErrorResponse = (error) => {
        if (error.response.data.code === VALIDATION_ERROR.code)
            showErrorDialog("Hay un problema con los datos enviados, revise e intente nuevamente");
        else if (error.response.data.code === REPEATED_DOCUMENT_ERROR.code)
            showErrorDialog("El documento o el cuit cargado ya se encuentra utilizado.");
        else
            showErrorDialog("Ocurrio un error, intente nuevamente.");
    }

    useEffect(() => {
        axios
            .get(BASE_CLIENT_TYPES_URL)
            .then((response) => {
                setClientTypes(response.data);
            })
    }, []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="client-type-id-label">Tipo de cliente</InputLabel>
                    <Select
                        labelId="client-type-code-label"
                        id="clientTypeCode"
                        name="clientTypeCode"
                        value={formik.values.clientTypeCode}
                        label="Tipo de cliente"
                        onChange={formik.handleChange}
                        error={formik.touched.clientTypeCode && Boolean(formik.errors.clientTypeCode)}
                    >
                        <MenuItem value="">
                            <em>Seleccione una opci&oacute;n</em>
                        </MenuItem>
                        {
                            clientTypes.map((clientType) => {
                                return <MenuItem key={clientType._id} value={clientType.code}>{clientType.description}</MenuItem>
                            })
                        }
                    </Select>
                    {formik.touched.clientTypeCode && formik.errors.clientTypeCode && <FormHelperText>{formik.errors.clientTypeCode}</FormHelperText>}
                </FormControl>
                <FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="name"
                        name="name"
                        label="Nombre"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="lastName"
                        name="lastName"
                        label="Apellido"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="document"
                        name="document"
                        label="Documento"
                        value={formik.values.document}
                        onChange={formik.handleChange}
                        error={formik.touched.document && Boolean(formik.errors.document)}
                        helperText={formik.touched.document && formik.errors.document}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        variant="outlined"
                        id="cuitCuil"
                        name="cuitCuil"
                        label="Cuit / Cuil"
                        value={formik.values.cuitCuil}
                        onChange={formik.handleChange}
                        error={formik.touched.cuitCuil && Boolean(formik.errors.cuitCuil)}
                        helperText={formik.touched.cuitCuil && formik.errors.cuitCuil}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="businessName"
                        name="businessName"
                        label="Razon Social"
                        value={formik.values.businessName}
                        onChange={formik.handleChange}
                        error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                        helperText={formik.touched.businessName && formik.errors.businessName}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        variant="outlined"
                        id="adress"
                        name="adress"
                        label="Direccion"
                        value={formik.values.adress}
                        onChange={formik.handleChange}
                        error={formik.touched.adress && Boolean(formik.errors.adress)}
                        helperText={formik.touched.adress && formik.errors.adress}
                    />
                </FormControl>
            </Stack>
            <Button style={{ marginTop: "20px" }} color="primary" variant="contained" type="submit">
                Guardar
            </Button>
            <SimpleAlertMessage ref={childStateRef}></SimpleAlertMessage>
        </form >
    );
}

export default CompleteDataForm;