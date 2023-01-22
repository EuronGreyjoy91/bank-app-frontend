import React, { Fragment } from 'react';

import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import UserForm from '../../components/AdminComponents/Users/UserForm';
import { useParams } from "react-router-dom";

const NewUser = () => {
    const { userId } = useParams();

    return (
        <Fragment>
            <AdminNavbar></AdminNavbar>
            <Container maxWidth={false}>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={8}>
                        <Typography variant="h4">
                            {userId != null ? "Editar usuario" : "Nuevo usuario"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={12} md={4}>
                        <UserForm></UserForm>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
};

export default NewUser;