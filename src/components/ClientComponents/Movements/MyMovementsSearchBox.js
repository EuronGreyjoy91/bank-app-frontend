import { BASE_CLIENTS_URL, BASE_MOVEMENT_TYPES_URL, MOVEMENT_TYPE_ID_FILTER, authHeader, objectsToUrlParamsString } from '../../../Commons';
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FormControl from '@mui/material/FormControl';
import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MyMovementsTable from './MyMovementsTable';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import axios from 'axios';

function MyMovementsSearchBox() {
    const [movementsTypes, setMovementsTypes] = useState([]);
    const [movements, setMovements] = useState([]);

    const [movementTypeId, setMovementTypeId] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    const handleMovementTypeIdChange = (event) => {
        setMovementTypeId(event.target.value);
    };

    useEffect(() => {
        axios(BASE_MOVEMENT_TYPES_URL, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setMovementsTypes(response.data);
        })
    }, []);

    useEffect(() => {
        searchMovements('');
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const filters = [
            {
                name: MOVEMENT_TYPE_ID_FILTER,
                value: movementTypeId
            }
        ];

        const filteredFilters = filters.filter((filter) => filter.value !== '');
        const urlFilters = objectsToUrlParamsString(filteredFilters);

        searchMovements(urlFilters);
    }

    const searchMovements = (filters) => {
        axios.get(`${BASE_CLIENTS_URL}/${user.clientId}/movements?${filters}`, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setMovements(response.data);
        })
    }

    const handleFormClean = () => {
        setMovementTypeId('');
        searchMovements('');
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
                            <InputLabel id="client-type-label">Tipo de movimiento</InputLabel>
                            <Select
                                labelId="movement-type-label"
                                id="movementTypeId"
                                value={movementTypeId}
                                label="Tipo de movimiento"
                                onChange={handleMovementTypeIdChange}
                            >
                                <MenuItem value="">
                                    <em>Seleccione una opcion</em>
                                </MenuItem>
                                {
                                    movementsTypes.map((movementType) => {
                                        return <MenuItem key={movementType._id} value={movementType._id}>{movementType.description}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
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
            <MyMovementsTable movements={movements}></MyMovementsTable>
        </Fragment>
    );
}

export default MyMovementsSearchBox;