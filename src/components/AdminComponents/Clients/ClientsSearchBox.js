import * as React from 'react';

import { BASE_CLIENTS_URL, BASE_CLIENT_TYPES_URL, CLIENT_TYPE_ID_FILTER, CUIT_CUIL_FILTER, DOCUMENT_FILTER, authHeader, objectsToUrlParamsString } from '../../../Commons';
import { Fragment, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ClientsTable from './ClientsTable';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function ClientsSearchBox() {
    const [clientTypes, setClientTypes] = useState([]);
    const [clients, setClients] = useState([]);

    const [clientTypeId, setClientTypeId] = useState('');
    const [cuitCuil, setCuitCuil] = useState('');
    const [document, setDocument] = useState('');

    const handleClientTypeIdChange = (event) => {
        setClientTypeId(event.target.value);
    };

    const handleCuitCuilChange = (event) => {
        setCuitCuil(event.target.value);
    };

    const handleDocumentChange = (event) => {
        setDocument(event.target.value);
    };

    useEffect(() => {
        axios(BASE_CLIENT_TYPES_URL, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setClientTypes(response.data);
        })
    }, []);

    useEffect(() => {
        searchClients('');
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const filters = [
            {
                name: CLIENT_TYPE_ID_FILTER,
                value: clientTypeId
            },
            {
                name: CUIT_CUIL_FILTER,
                value: cuitCuil
            },
            {
                name: DOCUMENT_FILTER,
                value: document
            }
        ];

        const filteredFilters = filters.filter((filter) => filter.value !== '');
        const urlFilters = objectsToUrlParamsString(filteredFilters);

        searchClients(urlFilters);
    }

    const searchClients = (filters) => {
        axios(`${BASE_CLIENTS_URL}?${filters}`, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setClients(response.data);
        })
    }

    const handleFormClean = () => {
        setClientTypeId('');
        setCuitCuil('');
        setDocument('');
        searchClients('');
    }

    useEffect(() => {
        searchClients('');
    }, []);

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
                            <InputLabel id="client-type-label">Tipo de cliente</InputLabel>
                            <Select
                                labelId="client-type-label"
                                id="clientTypeId"
                                value={clientTypeId}
                                label="Tipo de cliente"
                                onChange={handleClientTypeIdChange}
                            >
                                <MenuItem value="">
                                    <em>Seleccione una opcion</em>
                                </MenuItem>
                                {
                                    clientTypes.map((clientType) => {
                                        return <MenuItem key={clientType._id} value={clientType._id}>{clientType.description}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField id="cuitCuil" label="Cuit / Cuil" variant="outlined" onChange={handleCuitCuilChange} value={cuitCuil} />
                        <TextField id="documento" label="Nº de documento" variant="outlined" value={document} onChange={handleDocumentChange} />
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
            <ClientsTable clients={clients}></ClientsTable>
        </Fragment>
    );
}

export default ClientsSearchBox;