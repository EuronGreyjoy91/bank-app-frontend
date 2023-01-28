import { ACCOUNT_NUMBER_FILTER, ACCOUNT_TYPE_ID_FILTER, ALIAS_FILTER, BASE_ACCOUNTS_URL, BASE_ACCOUNT_TYPES_URL, authHeader, objectsToUrlParamsString } from '../../../Commons';
import React, { Fragment, useEffect, useState } from 'react';

import AccountsTable from './AccountsTable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import axios from 'axios';

function AccountsSearchBox() {
    const [accountTypes, setAccountTypes] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const [accountTypeId, setAccountTypeId] = useState('');
    const [alias, setAlias] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const handleAccountTypeIdChange = (event) => {
        setAccountTypeId(event.target.value);
    };

    const handleAliasChange = (event) => {
        setAlias(event.target.value);
    };

    const handleAccountNumberChange = (event) => {
        setAccountNumber(event.target.value);
    };

    useEffect(() => {
        axios(BASE_ACCOUNT_TYPES_URL, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setAccountTypes(response.data);
        })
    }, []);

    useEffect(() => {
        searchAccounts('');
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const filters = [
            {
                name: ACCOUNT_TYPE_ID_FILTER,
                value: accountTypeId
            },
            {
                name: ALIAS_FILTER,
                value: alias
            },
            {
                name: ACCOUNT_NUMBER_FILTER,
                value: accountNumber
            }
        ];

        const filteredFilters = filters.filter((filter) => filter.value !== '');
        const urlFilters = objectsToUrlParamsString(filteredFilters);

        searchAccounts(urlFilters);
    }

    const searchAccounts = (filters) => {
        axios.get(`${BASE_ACCOUNTS_URL}?${filters}`, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setAccounts(response.data);
        })
    }

    const handleFormClean = () => {
        setAccountTypeId('');
        setAlias('');
        setAccountNumber('');
        searchAccounts('');
    }

    return (
        <Fragment>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{ paddingTop: "40px" }} item xs={12}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        textAlign='center'
                    >
                        <FormControl>
                            <InputLabel id="account-type-label">Tipo de cuenta</InputLabel>
                            <Select
                                labelId="account-type-label"
                                id="accountTypeId"
                                value={accountTypeId}
                                label="Tipo de cuenta"
                                onChange={handleAccountTypeIdChange}
                            >
                                <MenuItem value="">
                                    <em>Seleccione una opcion</em>
                                </MenuItem>
                                {
                                    accountTypes.map((accountType) => {
                                        return <MenuItem key={accountType._id} value={accountType._id}>{accountType.description}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField id="alias" label="Alias" variant="outlined" onChange={handleAliasChange} value={alias} />
                        <TextField id="accountNumber" label="Nº de cuenta" variant="outlined" value={accountNumber} onChange={handleAccountNumberChange} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid style={{ paddingTop: "40px" }} item xs={12}>
                    <Box textAlign='center'>
                        <Button variant="contained" color="primary" onClick={handleSearchSubmit}>
                            Buscar <SearchIcon></SearchIcon>
                        </Button>
                        <Button style={{ marginLeft: "20px" }} variant="contained" color="secondary" onClick={handleFormClean}>
                            Limpiar <CleaningServicesIcon></CleaningServicesIcon>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <AccountsTable accounts={accounts}></AccountsTable>
        </Fragment>
    );
}

export default AccountsSearchBox;