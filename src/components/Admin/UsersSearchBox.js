import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as React from 'react';
import { Fragment, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { BASE_USERS_URL, BASE_USER_TYPES_URL, objectsToUrlParamsString, USER_TYPE_ID_FILTER, USERNAME_FILTER } from '../../Commons';
import UsersTable from './UsersTable';

function UsersSearchBox() {
    const [userTypes, setUserTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const [userTypeId, setUserTypeId] = useState('');
    const [userName, setUserName] = useState('');

    const handleUserTypeIdChange = (event) => {
        setUserTypeId(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    useEffect(() => {
        axios(BASE_USER_TYPES_URL)
            .then((response) => {
                setUserTypes(response.data);
                setError(null);
            })
            .catch(setError);
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
        axios(`${BASE_USERS_URL}?${filters}`)
            .then((response) => {
                setUsers(response.data);
                setError(null);
            })
            .catch(setError);
    }

    const handleFormClean = () => {
        setUserTypeId('');
        setUserName('');
        searchUsers('');
    }

    useEffect(() => {
        axios(BASE_USERS_URL)
            .then((response) => {
                setUsers(response.data);
                setError(null);
            })
            .catch(setError);
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