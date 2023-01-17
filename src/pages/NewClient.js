import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { Fragment } from 'react';
import { useParams } from "react-router-dom";
import AdminNavbar from '../components/Admin/AdminNavbar';
import ClientForm from '../components/Admin/ClientForm';

const NewClient = () => {
    const { clientId } = useParams();

    return (
        <Fragment>
            <AdminNavbar></AdminNavbar>
            <Container maxWidth={false}>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={8}>
                        <Typography variant="h4">
                            {clientId != null ? "Editar cliente" : "Nuevo cliente"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={12} md={4}>
                        <ClientForm></ClientForm>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
};

export default NewClient;