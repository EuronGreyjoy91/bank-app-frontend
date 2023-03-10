import { Link, useNavigate } from 'react-router-dom';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import SavingsIcon from '@mui/icons-material/Savings';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { logout } from '../../Commons';

function ClientNavbar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <AppBar position="static">
            <Container maxWidth="auto">
                <Toolbar disableGutters>
                    <AccountBalanceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BANK APP |
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem component="a" href={`/${user.clientId}/cuentas`} key={'Mis cuentas'} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Mis cuentas</Typography>
                            </MenuItem>
                            <MenuItem component="a" href={`/${user.clientId}/movimientos`} key={'Movimientos'} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Mis movimientos</Typography>
                            </MenuItem>
                            <MenuItem key={'Logout'} onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AccountBalanceIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BANK-APP
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            component={Link} to={`/${user.clientId}/cuentas`}
                            key={'Mis cuentas'}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Mis cuentas&nbsp;
                            <SavingsIcon style={{ verticalAlign: "middle" }}></SavingsIcon>
                        </Button>
                        <Button
                            component={Link} to={`/${user.clientId}/movimientos`}
                            key={'Movimientos'}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Mis movimientos&nbsp;
                            <TimelineOutlinedIcon style={{ verticalAlign: "middle" }}></TimelineOutlinedIcon>
                        </Button>
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            sx={{ my: 2, color: 'white', display: 'block', marginLeft: 'auto' }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ClientNavbar;