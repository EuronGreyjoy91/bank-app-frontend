import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import es from 'yup-es';
import { BASE_CLIENTS_URL, BASE_CLIENT_TYPES_URL, PERSONA_JURIDICA_CLIENT_TYPE_CODE, REPEATED_DOCUMENT_ERROR, VALIDATION_ERROR } from '../../Commons';
import SimpleAlertMessage from '../Commons/SimpleAlertMessage';

function ClientForm() {
    yup.setLocale(es);
    const { clientId } = useParams();
    const [clientTypes, setClientTypes] = useState([]);
    const [error, setError] = useState(null);

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

            if (clientId == null) {
                axios
                    .post(BASE_CLIENTS_URL, values)
                    .then((response) => {
                        navigate('/clientes?alertStatus=success&message=Cliente guardado con exito', { replace: true });
                    }).catch(error => {
                        handleErrorResponse(error);
                    });
            }
            else {
                axios
                    .patch(`${BASE_CLIENTS_URL}/${clientId}`, values)
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
            .get(BASE_CLIENT_TYPES_URL)
            .then((response) => {
                setClientTypes(response.data);
                setError(null);
            })
            .catch(setError);

        axios
            .get(`${BASE_CLIENTS_URL}/${clientId}`)
            .then((response) => {
                formik.values.name = response.data.name;
                formik.values.lastName = response.data.lastName;
                formik.values.document = response.data.document;
                formik.values.cuitCuil = response.data.cuitCuil;
                formik.values.clientTypeCode = response.data.clientType.code;

                if (response.data.clientType.code === PERSONA_JURIDICA_CLIENT_TYPE_CODE) {
                    formik.values.businessName = response.data.businessName;
                    formik.values.adress = response.data.adress;
                }

                formik.handleChange();
            })
            .catch(setError);
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

export default ClientForm;