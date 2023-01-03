import Button from '@material-ui/core/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { BASE_ACCOUNTS_URL, BASE_ACCOUNT_TYPES_URL, BASE_CLIENTS_URL } from '../../Commons';

function AccountForm() {

    const [clients, setClients] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios(BASE_CLIENTS_URL)
            .then((response) => {
                setClients(response.data);
                setError(null);
            })
            .catch(setError);
    }, []);

    useEffect(() => {
        axios(BASE_ACCOUNT_TYPES_URL)
            .then((response) => {
                setAccountTypes(response.data);
                setError(null);
            })
            .catch(setError);
    }, []);

    const validationSchema = yup.object({
        clientId: yup
            .string('Selecciona un cliente')
            .required('El cliente es requerido'),
        accountTypeId: yup
            .string('Selecciona un tipo de cuenta')
            .required('El tipo de cuenta es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            clientId: '',
            accountTypeId: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (!Boolean(formik.errors.clientId)) {
                axios
                    .post(BASE_ACCOUNTS_URL, values)
                    .then((response) => {
                        console.log(response)
                        if (response.status === 200) {
                            navigate('/cuentas?alertStatus=success', { replace: true });
                        }
                    });
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <FormControl fullWidth>
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
                <FormControl fullWidth>
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
            </Stack>
            <Button style={{ marginTop: "20px" }} color="primary" variant="contained" type="submit">
                Submit
            </Button>
        </form>
    );
}

export default AccountForm;