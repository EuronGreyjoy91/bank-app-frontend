import * as React from 'react';

import { BASE_USERS_URL, BASE_USER_TYPES_URL, USERNAME_FILTER, USER_TYPE_ID_FILTER, authHeader, objectsToUrlParamsString } from '../../../Commons';
import { Fragment, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import UsersTable from './UsersTable';
import axios from 'axios';

function UsersSearchBox() {
    const [userTypes, setUserTypes] = useState([]);
    const [users, setUsers] = useState([]);

    const [userTypeId, setUserTypeId] = useState('');
    const [userName, setUserName] = useState('');

    const handleUserTypeIdChange = (event) => {
        setUserTypeId(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    useEffect(() => {
        axios(BASE_USER_TYPES_URL, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setUserTypes(response.data);
        })
    }, []);

    useEffect(() => {
        searchUsers('');
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const filters = [
            {
                name: USER_TYPE_ID_FILTER,
                value: userTypeId
            },
            {
                name: USERNAME_FILTER,
                value: userName
            }
        ];

        const filteredFilters = filters.filter((filter) => filter.value !== '');
        const urlFilters = objectsToUrlParamsString(filteredFilters);

        searchUsers(urlFilters);
    }

    const searchUsers = (filters) => {
        axios(`${BASE_USERS_URL}?${filters}`, {
            headers: {
                'Authorization': `Bearer ${authHeader()}`
            }
        }).then((response) => {
            setUsers(response.data);
        })
    }

    const handleFormClean = () => {
        setUserTypeId('');
        setUserName('');
        searchUsers('');
    }

    useEffect(() => {
        searchUsers('');
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
                            <InputLabel id="user-type-label">Tipo de usuario</InputLabel>
                            <Select
                                labelId="user-type-label"
                                id="userTypeId"
                                value={userTypeId}
                                label="Tipo de usuario"
                                onChange={handleUserTypeIdChange}
                            >
                                <MenuItem value="">
                                    <em>Seleccione una opcion</em>
                                </MenuItem>
                                {
                                    userTypes.map((userType) => {
                                        return <MenuItem key={userType._id} value={userType._id}>{userType.description}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField id="userName" label="Usuario" variant="outlined" onChange={handleUserNameChange} value={userName} />
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
            <UsersTable users={users}></UsersTable>
        </Fragment>
    );
}

export default UsersSearchBox;