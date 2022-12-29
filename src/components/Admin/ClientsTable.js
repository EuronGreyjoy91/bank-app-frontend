import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { GET_CLIENTS_URL } from '../../Commons';

const columns = [
    {
        field: '_id',
        headerName: 'ID',
        flex: 1
    },
    {
        field: 'description',
        headerName: 'Tipo de cliente',
        flex: 0.5,
        valueGetter: (params) => {
            return params.getValue(params.id, "clientType").description;
        }
    },
    {
        field: 'Name',
        headerName: 'Nombre',
        flex: 1,
        valueGetter: (params) => `${params.row.name} ${params.row.lastName}`
    },
    {
        field: 'cuitCuil',
        headerName: 'Cuit / Cuil',
        flex: 0.5
    },
    {
        field: 'creationDate',
        headerName: 'Fecha creacion',
        flex: 1,
        valueFormatter: params => moment(params?.value).format("DD/MM/YYYY HH:mm"),
    },
    {
        field: 'document',
        headerName: 'Documento',
        flex: 0.5,
    },
    {
        field: 'enable',
        headerName: 'Activo?',
        description: 'This column has a value getter and is not sortable.',
        type: 'boolean',
        sortable: true,
        flex: 0.5,
    },
];

function ClientsTable() {

    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios(GET_CLIENTS_URL)
            .then((response) => {
                console.log(response.data);
                setClients(response.data);
                setError(null);
            })
            .catch(setError);
    }, []);

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid style={{ paddingTop: "40px" }} item xs={12}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={clients}
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

export default ClientsTable;