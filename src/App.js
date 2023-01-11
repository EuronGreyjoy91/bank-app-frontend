import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Accounts from './pages/Accounts';
import Clients from './pages/Clients';
import Home from './pages/Home';
import NewAccount from './pages/NewAccount';
import NewClient from './pages/NewClient';
import NewUser from './pages/NewUser';
import PageNotFound from './pages/PageNotFound.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cuentas" element={<Accounts />} />
                <Route path="/cuentas/nueva" element={<NewAccount />} />
                <Route path="/cuentas/:accountId/editar" element={<NewAccount />} />
                <Route path="/clientes" element={<Clients />} />
                <Route path="/clientes/nuevo" element={<NewClient />} />
                <Route path="/usuarios/nuevo" element={<NewUser />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
