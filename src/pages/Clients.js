import Button from "@material-ui/core/Button";
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/Admin/AdminNavbar';
import ClientsSearchBox from '../components/Admin/ClientsSearchBox';
import ClientsTable from '../components/Admin/ClientsTable';

const Clients = () => (
    <Fragment>
        <AdminNavbar></AdminNavbar>
        <Container maxWidth={false}>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{ paddingTop: "40px" }} item xs={8}>
                    <Typography variant="h4">
                        Clientes
                    </Typography>
                </Grid>
                <Grid style={{ paddingTop: "40px" }} item xs={4}>
                    <Box textAlign='right'>
                        <Button component={Link} to="/clientes/nuevo" variant="contained" color="primary">
                            Nuevo cliente <AddIcon></AddIcon>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <br></br>
            <ClientsSearchBox></ClientsSearchBox>
            <br></br>
            <ClientsTable></ClientsTable>
        </Container>
    </Fragment>
);

export default Clients;