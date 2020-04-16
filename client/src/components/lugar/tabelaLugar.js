import React, {useState} from 'react';
import axios from "axios";

import './styles.css'

import AtualizarLugar from './atualizarLugar';

export default function TabelaLugar({lugares, load}) {

    const [lugar, setLugar] = useState([]);

    const [open, setOpen] = useState(false);

    async function getLocal(id) {
        await axios.get(`http://localhost:8080/agenda-react/lugar/${id}`).then(resp => {
            setLugar(resp.data.entities);
            setOpen(!open);
        });
    }

    async function delLocal(id) {
        const conf = window.confirm('Tem certeza que deseja excluir este item?');
        if (conf === true) {
            await axios.delete(`http://localhost:8080/agenda-react/lugar/${id}`).then(resp => {
                load();
                return resp
            })
        }
    }

    function renderRow(lugar) {
        return (
            <tr key={lugar.id}>
                <td>{lugar.nome}</td>
                <td>{lugar.capacidade}</td>
                <td>
                    <a onClick={() => getLocal(lugar.id)}>Atualizar</a>
                    <a onClick={() => delLocal(lugar.id)}>Excluir</a>
                </td>
            </tr>
        )
    }

    return (
        <div>
            {open ? <AtualizarLugar lugar={lugar} load={load}/> : ""}
            <div className='pesquisa'>
                <form>
                    <input type='text' placeholder='Nome do Lugar...'/>
                    <button type="submit" name="btnPesquisar" value="">Procurar</button>
                </form>
            </div>

            <div className='tabela'>
                <strong>Tabela Lugares</strong>
                <table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Capacidade</th>
                        <th>Ações</th>
                    </tr>
                    </thead>

                    <tbody>

                    {lugares.map(e => renderRow(e))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}