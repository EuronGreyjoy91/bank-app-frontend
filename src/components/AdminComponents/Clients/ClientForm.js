import * as yup from 'yup';

import { BASE_CLIENTS_URL, BASE_CLIENT_TYPES_URL, BASE_USERS_URL, PERSONA_JURIDICA_CLIENT_TYPE_CODE, REPEATED_DOCUMENT_ERROR, VALIDATION_ERROR, authHeader } from '../../../Commons';
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

function ClientForm() {
    yup.setLocale(es);
    const { clientId } = useParams();
    const [clientTypes, setClientTypes] = useState([]);
    const [users, setUsers] = useState([]);

    const childStateRef = useRef();

    const showErrorDialog = (message) => {
        const openDialog = childStateRef.current.getHandleClickOpen(message);
        openDialog();
    }

    const navigate = useNavigate();

    const validationSchema = yup.object({
        userId: yup
            .string('Seleccione un usuario')
            .required('El usuario es requerido'),
        clientTypeCode: yup
            .string('Seleccione un tipo de cliente')
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
            userId: '',
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

            if (clientId == null) {
                axios
                    .post(BASE_CLIENTS_URL, values, {
                        headers: {
                            'Authorization': `Bearer ${authHeader()}`
                        }
                    })
                    .then((response) => {
                        navigate('/clientes?alertStatus=success&message=Cliente guardado con exito', { replace: true });
                    }).catch(error => {
                        handleErrorResponse(error);
                    });
            }
            else {
                axios
                    .patch(`${BASE_CLIENTS_URL}/${clientId}`, values, {
                        headers: {
                            'Authorization': `Bearer ${authHeader()}`
                        }
                    })
                    .then((response) => {
                        navigate('/clientes?alertStatus=success&message=Cliente guardado con exito', { replace: true });
                    }).catch(error => {
                        handleErrorResponse(error);
                    });
            }
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
            .get(BASE_CLIENT_TYPES_URL, {
                headers: {
                    'Authorization': `Bearer ${authHeader()}`
                }
            })
            .then((response) => {
                setClientTypes(response.data);
            });

        axios
            .get(BASE_USERS_URL, {
                headers: {
                    'Authorization': `Bearer ${authHeader()}`
                }
            })
            .then((response) => {
                setUsers(response.data);
            })

        if (clientId != null) {
            axios
                .get(`${BASE_CLIENTS_URL}/${clientId}`, {
                    headers: {
                        'Authorization': `Bearer ${authHeader()}`
                    }
                })
                .then((response) => {
                    formik.setFieldValue("userId", response.data.user._id);
                    formik.setFieldValue("name", response.data.name);
                    formik.setFieldValue("lastName", response.data.lastName);
                    formik.setFieldValue("document", response.data.document);
                    formik.setFieldValue("cuitCuil", response.data.cuitCuil);
                    formik.setFieldValue("clientTypeCode", response.data.clientType.code);

                    if (response.data.clientType.code === PERSONA_JURIDICA_CLIENT_TYPE_CODE) {
                        formik.setFieldValue("businessName", response.data.businessName);
                        formik.setFieldValue("adress", response.data.adress);
                    }
                })
        }
    }, []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="user-id-label">Usuario</InputLabel>
                    <Select
                        labelId="user-label"
                        id="userId"
                        name="userId"
                        value={formik.values.userId}
                        label="Usuario"
                        onChange={formik.handleChange}
                        error={formik.touched.userId && Boolean(formik.errors.userId)}
                    >
                        <MenuItem value="">
                            <em>Seleccione una opci&oacute;n</em>
                        </MenuItem>
                        {
                            users.map((user) => {
                                return <MenuItem key={user._id} value={user._id}>{user.userName}</MenuItem>
                            })
                        }
                    </Select>
                    {formik.touched.userId && formik.errors.userId && <FormHelperText>{formik.errors.userId}</FormHelperText>}
                </FormControl>
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

export default ClientForm;