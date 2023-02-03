import * as yup from 'yup';

import { BASE_ACCOUNTS_URL, BASE_ACCOUNT_TYPES_URL, CUENTA_CORRIENTE_ACCOUNT_TYPE_CODE, REPEATED_ACCOUNT_TYPE_ERROR, REPEATED_ALIAS_ERROR, VALIDATION_ERROR, authHeader } from '../../../Commons';
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

function MyAccountForm() {
    yup.setLocale(es);
    const { accountId } = useParams();
    const [accountTypes, setAccountTypes] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    const childStateRef = useRef();

    const showErrorDialog = (message) => {
        const openDialog = childStateRef.current.getHandleClickOpen(message);
        openDialog();
    }

    const navigate = useNavigate();

    const validationSchema = yup.object({
        accountTypeCode: yup
            .string('Selecciona un tipo de cuenta')
            .required('El tipo de cuenta es requerido'),
        alias: yup
            .string('Ingrese un alias valido')
            .min(10)
            .max(200)
    });

    const formik = useFormik({
        initialValues: {
            accountTypeCode: '',
            alias: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.alias === '')
                delete values.alias;

            formik.values.clientId = user.clientId;

            if (accountId == null) {
                axios
                    .post(BASE_ACCOUNTS_URL, values, {
                        headers: {
                            'Authorization': `Bearer ${authHeader()}`
                        }
                    })
                    .then((response) => {
                        navigate(`/${user.clientId}/cuentas?alertStatus=success&message=Cuenta guardada con exito`, { replace: true });
                    }).catch(error => {
                        handleErrorResponse(error);
                    });
            }
            else {
                axios
                    .patch(`${BASE_ACCOUNTS_URL}/${accountId}`, values, {
                        headers: {
                            'Authorization': `Bearer ${authHeader()}`
                        }
                    })
                    .then((response) => {
                        navigate(`/${user.clientId}/cuentas?alertStatus=success&message=Cuenta guardada con exito`, { replace: true });
                    }).catch(error => {
                        handleErrorResponse(error);
                    });
            }
        },
    });

    const handleErrorResponse = (error) => {
        if (error.response.data.code === VALIDATION_ERROR.code)
            showErrorDialog("Hay un problema con los datos enviados, revise e intente nuevamente");
        else if (error.response.data.code === REPEATED_ALIAS_ERROR.code)
            showErrorDialog("El alias ya se encuentra utilizado.");
        else if (error.response.data.code === REPEATED_ACCOUNT_TYPE_ERROR.code)
            showErrorDialog("Ya posees ese tipo de cuenta.");
        else
            showErrorDialog("Ocurrio un error, intente nuevamente.");
    }

    useEffect(() => {
        axios
            .get(BASE_ACCOUNT_TYPES_URL, {
                headers: {
                    'Authorization': `Bearer ${authHeader()}`
                }
            })
            .then((response) => {
                setAccountTypes(response.data);
                formik.values.offLimitAmount = response.data.find((accountType) => accountType.code === CUENTA_CORRIENTE_ACCOUNT_TYPE_CODE).offLimitAmount;
            })

        if (accountId != null) {
            axios
                .get(`${BASE_ACCOUNTS_URL}/${accountId}`, {
                    headers: {
                        'Authorization': `Bearer ${authHeader()}`
                    }
                })
                .then((response) => {
                    formik.setFieldValue("accountTypeCode", response.data.accountType.code);
                    formik.setFieldValue("alias", response.data.alias);
                    formik.setFieldValue("offLimitAmount", response.data.offLimitAmount);
                })
        }
    }, []);

    const goBack = () => {
		navigate(`/${user.clientId}/cuentas`);
	}

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <FormControl fullWidth disabled={accountId != null}>
                    <InputLabel id="account-type-id-label">Tipo de cuenta</InputLabel>
                    <Select
                        labelId="account-type-code-label"
                        id="accountTypeCode"
                        name="accountTypeCode"
                        value={formik.values.accountTypeCode}
                        label="Tipo de cuenta"
                        onChange={formik.handleChange}
                        error={formik.touched.accountTypeCode && Boolean(formik.errors.accountTypeCode)}
                    >
                        <MenuItem value="">
                            <em>Seleccione una opci&oacute;n</em>
                        </MenuItem>
                        {
                            accountTypes.map((accountType) => {
                                return <MenuItem key={accountType._id} value={accountType.code}>{accountType.description}</MenuItem>
                            })
                        }
                    </Select>
                    {formik.touched.accountTypeCode && formik.errors.accountTypeCode && <FormHelperText>{formik.errors.accountTypeCode}</FormHelperText>}
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
            <Button style={{ marginTop: "20px", marginRight: "5px" }} color="secondary" variant="contained" onClick={goBack}>
                Cancelar
            </Button>
            <Button style={{ marginTop: "20px" }} color="primary" variant="contained" type="submit">
                Guardar
            </Button>
            <SimpleAlertMessage ref={childStateRef}></SimpleAlertMessage>
        </form>
    );
}

export default MyAccountForm;