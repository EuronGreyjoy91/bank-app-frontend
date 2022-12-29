import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { Fragment } from 'react';
import AdminNavbar from '../components/Admin/AdminNavbar';

const NewClient = () => (
    <Fragment>
        <AdminNavbar></AdminNavbar>
        <Container maxWidth={false}>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{ paddingTop: "40px" }} item xs={8}>
                    <Typography variant="h4">
                        Nuevo cliente
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    </Fragment>
);

export default NewClient;