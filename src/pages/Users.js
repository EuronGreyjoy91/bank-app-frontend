import Button from "@material-ui/core/Button";
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AdminNavbar from '../components/Admin/AdminNavbar';
import UsersSearchBox from "../components/Admin/UsersSearchBox";
import AlertWithTimer from "../components/Commons/AlertWithTimer";

function Users() {
    const [searchParams] = useSearchParams();

    return (
        <Fragment>
            <AdminNavbar></AdminNavbar>
            {
                searchParams.get('alertStatus') && <AlertWithTimer severity={searchParams.get('alertStatus')} message={searchParams.get('message')}></AlertWithTimer>
            }
            <Container maxWidth={false}>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={8}>
                        <Typography variant="h4">
                            Usuarios
                        </Typography>
                    </Grid>
                    <Grid style={{ paddingTop: "40px" }} item xs={4}>
                        <Box textAlign='right'>
                            <Button component={Link} to="/usuarios/nuevo" variant="contained" color="primary" disabled>
                                Nuevo usuario <AddIcon></AddIcon>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <UsersSearchBox></UsersSearchBox>
            </Container>
        </Fragment>
    )
};

export default Users;