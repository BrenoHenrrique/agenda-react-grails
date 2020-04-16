import React, {useState, useEffect} from 'react';
import axios from "axios";

import './css/index.css';
import './components/banda/styles.css';

import MensagemTabela from "./components/others/mensagemTabela";
import CadastroBanda from "./components/banda/cadastroBanda";
import TabelaBanda from './components/banda/tabelaBanda';
import CadastroLugar from "./components/lugar/cadastroLugar";
import TabelaLugar from './components/lugar/tabelaLugar';
import TabelaEvento from './components/evento/tabelaEvento';

export default function App() {

    const [bandas, setBandas] = useState([]);
    const [lugares, setLugares] = useState([]);

    const [eventos, setEventos] = useState([]);
    const [idEvento, setIdEvento] = useState([]);
    const [idLugar, setIdLugar] = useState('');
    const [dia, setDia] = useState('');

    const [openBand, setOpenBand] = useState(false);
    const [openLocal, setOpenLocal] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);

    const [listBand, setListBand] = useState(false);
    const [listLocal, setListLocal] = useState(false);
    const [listEvent, setListEvent] = useState(false);

    //FUNÇÕES REFERENTES A BANDA

    async function loadListBand() {
        const response = await axios.get('http://localhost:8080/agenda-react/banda/');
        setBandas(response.data.entities);
    }

    useEffect(() => {
        loadListBand().then(r => r);
    }, []);

    //FUNÇÕES REFERENTES AO LOCAL

    async function loadListLocal() {
        const response = await axios.get('http://localhost:8080/agenda-react/lugar/');
        setLugares(response.data.entities);
    }

    useEffect(() => {
        loadListLocal().then(r => r);
    }, []);

    //FUNÇÕES REFERENTES AO EVENTO

    async function loadListEvent() {
        const response = await axios.get('http://localhost:8080/agenda-react/evento/');
        setEventos(response.data.entities);
        setIdEvento(response.data);
    }

    useEffect(() => {
        loadListEvent().then(() => {
        });
    }, []);

    async function handleAddEvent(e) {
        e.preventDefault();

        await axios.post(`http://localhost:8080/agenda-react/evento/?idLugar=${idLugar}&dia=${dia}`)
            .then(resp => {
                loadListEvent();
                return resp
            });

        setIdLugar('');
        setDia('');
    }

    async function alterEvent(ident) {
        let response = await axios.get(`http://localhost:8080/agenda-react/evento/${ident}`);
        setIdEvento(response.data);
    }

    async function delEvent(ident) {
        const conf = window.confirm('Tem certeza que deseja excluir este item?');
        if (conf === true) {
            const response = await axios.delete(`http://localhost:8080/agenda-react/evento/${ident}`);
            await loadListEvent();
            return response
        }
    }

    return (
        <div className='principal'>
            <div>
                <strong className='titulo'>Sistema para cadastro de eventos</strong>
                <nav className='menu'>
                    <ul>
                        <li><a onClick={() => setOpenBand(!openBand)}>Adicionar Banda</a></li>
                        {openBand ? <CadastroBanda load={loadListBand}/> : ""}

                        <li><a onClick={() => setOpenLocal(!openLocal)}>Adicionar Lugar</a></li>
                        {openLocal ? <CadastroLugar load={loadListLocal}/> : ""}

                        <li><a onClick={() => setOpenEvent(!openEvent)}>Adicionar Evento</a></li>

                        <li className='drop'><a>Listas</a>
                            <ul>
                                <li><a onClick={() => {
                                    setListBand(!listBand), setListLocal(false), setListEvent(false)
                                }}>Listar Banda</a></li>
                                <li><a onClick={() => {
                                    setListLocal(!listLocal), setListBand(false), setListEvent(false)
                                }}>Listar Lugar</a></li>
                                <li><a onClick={() => {
                                    setListEvent(!listEvent), setListLocal(false), setListBand(false)
                                }}>Listar Evento</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className='conteudo'>
                {!listBand && !listLocal && !listEvent ? <MensagemTabela/> : ""}
                {listBand ? <TabelaBanda bandas={bandas} load={loadListBand}/> : ""}
                {listLocal ? <TabelaLugar lugares={lugares} load={loadListLocal}/> : ""}
                {listEvent ? <TabelaEvento eventos={eventos}/> : ""}
            </div>
        </div>
    );
}
