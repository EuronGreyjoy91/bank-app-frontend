import * as yup from 'yup';

import { BASE_CLIENTS_URL, BASE_MOVEMENT_URL, INVALID_AMOUNT_ERROR, NOT_FOUND_ERROR, VALIDATION_ERROR, authHeader } from '../../../Commons';
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

function MyTransferForm() {
    yup.setLocale(es);

    const { clientId } = useParams();
    const [accounts, setAccounts] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    const childStateRef = useRef();

    const showErrorDialog = (message) => {
        const openDialog = childStateRef.current.getHandleClickOpen(message);
        openDialog();
    }

    const navigate = useNavigate();

    const validationSchema = yup.object({
        accountId: yup
            .string('Seleccione una cuenta')
            .required('La cuenta es requerida'),
        concept: yup
            .string('Ingrese un concepto')
            .required('El concepto es requerido'),
        aliasNumber: yup
            .string('Ingrese alias o numero de cuenta destino')
            .required('El alias o numero de cuenta destino es requerido'),
        amount: yup
            .number()
            .min(0)
            .required('El monto es requerido')
    });

    const formik = useFormik({
        initialValues: {
            movementTypeCode: 'TRANSFER',
            aliasNumber: '',
            concept: '',
            amount: '',
            accountId: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            formik.values.clientId = clientId;

            axios
                .post(BASE_MOVEMENT_URL, values, {
                    headers: {
                        'Authorization': `Bearer ${authHeader()}`
                    }
                })
                .then((response) => {
                    navigate(`/${user.clientId}/movimientos?alertStatus=success&message=Movimiento creado con exito`, { replace: true });
                }).catch(error => {
                    handleErrorResponse(error);
                });

        },
    });

    const handleErrorResponse = (error) => {
        if (error.response.data.code === VALIDATION_ERROR.code)
            showErrorDialog("Hay un problema con los datos enviados, revise e intente nuevamente");
        else if (error.response.data.code === INVALID_AMOUNT_ERROR.code)
            showErrorDialog("No tenes saldo disponible para transferir esa cantidad");
        else if (error.response.data.code === NOT_FOUND_ERROR.code)
            showErrorDialog("Cuenta destino no encontrada");
        else
            showErrorDialog("Ocurrio un error, intente nuevamente.");
    }

    useEffect(() => {
        axios
            .get(`${BASE_CLIENTS_URL}/${user.clientId}/accounts`, {
                headers: {
                    'Authorization': `Bearer ${authHeader()}`
                }
            })
            .then((response) => {
                setAccounts(response.data);
            })
    }, []);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="account-id-label">Cuenta origen</InputLabel>
                    <Select
                        labelId="account-id-label"
                        id="accountId"
                        name="accountId"
                        value={formik.values.accountId}
                        label="Cuenta"
                        onChange={formik.handleChange}
                        error={formik.touched.accountId && Boolean(formik.errors.accountId)}
                    >
                        <MenuItem value="">
                            <em>Seleccione una opci&oacute;n</em>
                        </MenuItem>
                        {
                            accounts.map((account) => {
                                return <MenuItem key={account._id} value={account._id}>{`${account.accountType.description} - ${account.number} - ${account.alias} - $ ${account.balance}`}</MenuItem>
                            })
                        }
                    </Select>
                    {formik.touched.accountId && formik.errors.accountId && <FormHelperText>{formik.errors.accountId}</FormHelperText>}
                </FormControl>
                <FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="concept"
                        name="concept"
                        label="Concepto"
                        value={formik.values.concept}
                        onChange={formik.handleChange}
                        error={formik.touched.concept && Boolean(formik.errors.concept)}
                        helperText={formik.touched.concept && formik.errors.concept}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="aliasNumber"
                        name="aliasNumber"
                        label="Alias / Numero cuenta destino"
                        value={formik.values.aliasNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.aliasNumber && Boolean(formik.errors.aliasNumber)}
                        helperText={formik.touched.aliasNumber && formik.errors.aliasNumber}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        id="amount"
                        name="amount"
                        label="Monto"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
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

export default MyTransferForm;