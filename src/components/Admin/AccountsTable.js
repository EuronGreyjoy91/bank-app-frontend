import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { GET_ACCOUNTS_URL } from '../../Commons';

const columns = [
    {
        field: '_id',
        headerName: 'ID',
        flex: 1
    },
    {
        field: 'description',
        headerName: 'Tipo de cuenta',
        flex: 0.5,
        valueGetter: (params) => {
            return params.getValue(params.id, "accountType").description;
        }
    },
    {
        field: 'name',
        headerName: 'Cliente',
        flex: 1,
        valueGetter: (params) => {
            return params.getValue(params.id, "client").name;
        }
    },
    {
        field: 'creationDate',
        headerName: 'Fecha creacion',
        flex: 1,
        valueFormatter: params => moment(params?.value).format("DD/MM/YYYY HH:mm"),
    },
    {
        field: 'alias',
        headerName: 'Alias',
        flex: 1,
    },
    {
        field: 'number',
        headerName: 'Numero',
        type: 'number',
        flex: 1,
    },
    {
        field: 'enable',
        headerName: 'Activa?',
        description: 'This column has a value getter and is not sortable.',
        type: 'boolean',
        sortable: true,
        flex: 0.5,
    },
];

function AccountsTable() {

    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios(GET_ACCOUNTS_URL)
            .then((response) => {
                setAccounts(response.data);
                setError(null);
            })
            .catch(setError);
    }, []);

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid style={{ paddingTop: "40px" }} item xs={12}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={accounts}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row._id}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export default AccountsTable;