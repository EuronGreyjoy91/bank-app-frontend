import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React, { Fragment } from 'react';
import { useSearchParams } from "react-router-dom";
import AlertWithTimer from '../components/Commons/AlertWithTimer';
import LoginNavbar from '../components/Commons/LoginNavbar';

const Home = () => {
    const [searchParams] = useSearchParams();

    return <Fragment>
        <LoginNavbar />
        {
            searchParams.get('alertStatus') && <AlertWithTimer severity={searchParams.get('alertStatus')} message={'Usuario creado con exito!'}></AlertWithTimer>
        }
        <Container>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{ paddingTop: "40px" }} item xs={12}>
                    <Typography align="center" variant="h3">
                        Login
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        id="age-input"
                        name="age"
                        label="Contraseña"
                        type="password"
                    />
                </Grid>
            </Grid>
            <Grid style={{ paddingTop: "40px" }} container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={4}>
                    <Box textAlign='center'>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Entrar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid style={{ paddingTop: "40px" }} container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={6}>
                    <Box textAlign='center'>
                        <Link href="#">¿Olvidaste tu contraseña?</Link>
                    </Box>
                </Grid>
            </Grid>
            <Grid style={{ paddingTop: "20px" }} container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={6}>
                    <Box textAlign='center'>
                        ¿No tenes usuario? <Link href="/usuarios/nuevo">Registrate!</Link>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Fragment>
};

export default Home;