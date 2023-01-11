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
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { BASE_ACCOUNTS_URL, BASE_ACCOUNT_TYPES_URL, BASE_CLIENTS_URL } from '../../Commons';

function AccountForm() {
    const { accountId } = useParams();
    const [clients, setClients] = useState([]);
    const [account, setAccount] = useState(null);
    const [accountTypes, setAccountTypes] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const validationSchema = yup.object({
        clientId: yup
            .string('Selecciona un cliente')
            .required('El cliente es requerido'),
        accountTypeId: yup
            .string('Selecciona un tipo de cuenta')
            .required('El tipo de cuenta es requerido'),
        alias: yup
            .string('')
            .min(10)
            .max(200)
    });

    const formik = useFormik({
        initialValues: {
            clientId: '',
            accountTypeId: '',
            alias: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (accountId == null) {
                axios
                    .post(BASE_ACCOUNTS_URL, values)
                    .then((response) => {
                        if (response.status === 200) {
                            navigate('/cuentas?alertStatus=success&message=Cuenta guardada con exito', { replace: true });
                        }
                        else if (response.status === 400 || response.status === 404) {

                        }
                        else {
                            console.log('Error');
                        }
                    });
            }
            else {
                axios
                    .patch(`${BASE_ACCOUNTS_URL}/${accountId}`, values)
                    .then((response) => {
                        if (response.status === 200) {
                            navigate('/cuentas?alertStatus=success&message=Cuenta guardada con exito', { replace: true });
                        }
                        else if (response.status === 400 || response.status === 404) {

                        }
                        else {
                            console.log('Error');
                        }
                    });
            }
        },
    });

    useEffect(() => {
        axios
            .get(BASE_CLIENTS_URL)
            .then((response) => {
                setClients(response.data);
                setError(null);
            })
            .catch(setError);

        axios
            .get(BASE_ACCOUNT_TYPES_URL)
            .then((response) => {
                setAccountTypes(response.data);
                setError(null);
            })
            .catch(setError);

        axios
            .get(`${BASE_ACCOUNTS_URL}/${accountId}`)
            .then((response) => {
                setAccount(response.data);
                formik.values.clientId = response.data.client._id;
                formik.values.accountTypeId = response.data.accountType._id;
                formik.values.alias = response.data.alias;
            })
            .catch(setError);
    }, []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <FormControl fullWidth disabled={accountId != null}>
                    <InputLabel id="client-id-label">Cliente</InputLabel>
                    <Select
                        labelId="client-id-label"
                        id="clientId"
                        name="clientId"
                        value={formik.values.clientId}
                        label="Cliente"
                        onChange={formik.handleChange}
                        error={formik.touched.clientId && Boolean(formik.errors.clientId)}
                    >
                        <MenuItem value="">
                            <em>Seleccione una opci&oacute;n</em>
                        </MenuItem>
                        {
                            clients.map((client) => {
                                return <MenuItem key={client._id} value={client._id}>{client.name} - {client.document}</MenuItem>
                            })
                        }
                    </Select>
                    {formik.touched.clientId && formik.errors.clientId && <FormHelperText>{formik.errors.clientId}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth disabled={accountId != null}>
                    <InputLabel id="account-type-id-label">Tipo de cuenta</InputLabel>
                    <Select
                        labelId="account-type-id-label"
                        id="accountTypeId"
                        name="accountTypeId"
                        value={formik.values.accountTypeId}
                        label="Tipo de cuenta"
                        onChange={formik.handleChange}
                        error={formik.touched.accountTypeId && Boolean(formik.errors.accountTypeId)}
                    >
                        <MenuItem value="">
                            <em>Seleccione una opci&oacute;n</em>
                        </MenuItem>
                        {
                            accountTypes.map((accountType) => {
                                return <MenuItem key={accountType._id} value={accountType._id}>{accountType.description}</MenuItem>
                            })
                        }
                    </Select>
                    {formik.touched.accountTypeId && formik.errors.accountTypeId && <FormHelperText>{formik.errors.accountTypeId}</FormHelperText>}
                </FormControl>
                <FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="alias"
                        name="alias"
                        label="Alias (opcional)"
                        value={formik.values.alias}
                        onChange={formik.handleChange}
                        error={formik.touched.alias && Boolean(formik.errors.alias)}
                        helperText={formik.touched.alias && formik.errors.alias}
                    />
                </FormControl>
            </Stack>
            <Button style={{ marginTop: "20px" }} color="primary" variant="contained" type="submit">
                Guardar
            </Button>
        </form>
    );
}

export default AccountForm;