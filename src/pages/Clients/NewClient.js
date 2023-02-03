import React, { Fragment, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userIsClient, userIsLogged } from '../../Commons';

import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import ClientForm from '../../components/AdminComponents/Clients/ClientForm';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const NewClient = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLogged())
            navigate('/');

        if (userIsClient())
            navigate('/forbidden');
    }, []);

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