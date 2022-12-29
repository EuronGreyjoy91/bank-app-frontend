import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound.js';
import Accounts from './pages/Accounts';
import Clients from './pages/Clients';
import NewClient from './pages/NewClient';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cuentas" element={<Accounts />} />
                <Route path="/clientes" element={<Clients />} />
                <Route path="/clientes/nuevo" element={<NewClient />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
