import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LoginNavbar from '../components/LoginNavbar';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from '@mui/material/Box';

const Home = () => (
    <Fragment>
        <LoginNavbar />
        <Container>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{ paddingTop: "40px" }} item xs={12}>
                    <Typography align="center" variant="h3">
                        Login
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="name-input"
                        name="name"
                        label="Usuario"
                        type="text"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        id="age-input"
                        name="age"
                        label="Contraseña"
                        type="password"
                    />
                </Grid>
            </Grid>
            <Grid style={{ paddingTop: "10px" }} container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={6}>
                    <Box textAlign='center'>
                        <Button variant="contained" color="primary" type="submit">
                            Enviar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid style={{ paddingTop: "10px" }} container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={6}>
                    <Box textAlign='center'>
                        <Button variant="contained" color="secondary" type="submit">
                            Registrarse
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Fragment>
);

export default Home;