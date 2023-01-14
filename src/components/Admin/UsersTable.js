import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Fragment } from 'react';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { BASE_USERS_URL } from '../../Commons';

const patchAccount = (account) => {
    axios
        .patch(`${BASE_USERS_URL}/${account.accountId}`, account)
        .then((response) => {
            if (response.status === 200) {
                window.location.replace("/usuarios?alertStatus=success&message=Usuario modificado con exito");
            }
        });
}

const renderActionsButton = (params) => {
    return (
        <Fragment>
            <Tooltip title={params.row.enable ? "Desactivar" : "Activar"}>
                <IconButton
                    variant="contained"
                    color={params.row.enable ? "error" : "success"}
                    onClick={() => {
                        patchAccount({ accountId: params.row._id, enable: !params.row.enable });
                    }}
                >
                    {params.row.enable ? <DisabledByDefaultIcon /> : <CheckBoxIcon />}
                </IconButton>
            </Tooltip>
        </Fragment>
    )
}

const columns = [
    {
        field: '_id',
        headerName: 'ID',
        flex: 1
    },
    {
        field: 'description',
        headerName: 'Tipo de usuario',
        flex: 0.5,
        valueGetter: (params) => {
            return params.row.userType.description;
        }
    },
    {
        field: 'userName',
        headerName: 'Usuario',
        flex: 1,
        valueGetter: (params) => `${params.row.userName}`
    },
    {
        field: 'creationDate',
        headerName: 'Fecha creacion',
        flex: 1,
        valueFormatter: params => moment(params?.value).format("DD/MM/YYYY HH:mm"),
    },
    {
        field: 'enable',
        headerName: 'Activo?',
        description: 'This column has a value getter and is not sortable.',
        type: 'boolean',
        sortable: true,
        flex: 0.5,
    },
    {
        field: 'actions',
        headerName: 'Acciones',
        sortable: false,
        flex: 0.5,
        renderCell: renderActionsButton,
        disableClickEventBubbling: true,
    },
];

function UsersTable({ users }) {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid style={{ paddingTop: "40px" }} item xs={12}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={users}
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

export default UsersTable;