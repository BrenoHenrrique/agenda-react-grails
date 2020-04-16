import React, {useState} from 'react';
import axios from "axios";

import './styles.css'

import AtualizarBanda from "./atualizarBanda";

export default function TabelaBanda({bandas, load}) {

    const [banda, setBanda] = useState([]);

    const [open, setOpen] = useState(false);

    async function getBand(id){
        await axios.get(`http://localhost:8080/agenda-react/banda/${id}`).then(resp => {
            setBanda(resp.data.entities);
            setOpen(!open);
        });
    }

    async function delBand(id) {
        const conf = window.confirm('Tem certeza que deseja excluir este item?');
        if (conf === true) {
            await axios.delete(`http://localhost:8080/agenda-react/banda/${id}`).then(resp => {
                load();
                return resp
            });
        }
    }

    function renderRow(banda) {
        return (
            <tr key={banda.id}>
                <td>{banda.nome}</td>
                <td>{banda.genero}</td>
                <td>
                    <a onClick={() => getBand(banda.id)}>Atualizar</a>
                    <a onClick={() => delBand(banda.id)}>Excluir</a>
                </td>
            </tr>
        )
    }

    return (
        <div>
            {open ? <AtualizarBanda banda={banda} load={load}/> : ''}
            <div className='pesquisa'>
                <form>
                    <input type='text' placeholder='Nome da banda...'/>
                    <button type="submit" name="btnPesquisar" value="">Procurar</button>
                </form>
            </div>

            <div className='tabela'>
                <strong>Tabela Bandas</strong>
                <table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Genero</th>
                        <th>Ações</th>
                    </tr>
                    </thead>

                    <tbody>

                    {bandas.map(e => renderRow(e))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}