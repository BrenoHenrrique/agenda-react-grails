import React, {useState} from 'react';

import './styles.css'
import BandasEvento from "./bandasEvento";

function tabelaEvento({eventos, bandas}) {

    const [openEventBand, setOpenEventBand] = useState(false);

    function renderRow(evento){
        return (
            <tr key={evento.id}>
                <td>{evento.lugarEvento.nome}</td>
                <td>{evento.diaEvento}</td>
                <td>
                    <a onClick={() => setOpenEventBand(!openEventBand)}>Bandas</a>
                    {openEventBand ? <BandasEvento bandas={bandas}/> : "" }

                    <a>Atualizar</a>
                    <a>Excluir</a>
                </td>
            </tr>
        );
    }

    return (
        <div>
            <div className='pesquisa'>
                <form>
                    <input type='text' placeholder='Nome do Evento...'/>
                    <button type="submit" name="btnPesquisar" value="">Procurar</button>
                </form>
            </div>

            <div className='tabela'>

                <strong>Tabela Eventos</strong>
                <table>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Genero</th>
                        <th>Ações</th>
                    </tr>
                    </thead>

                    <tbody>

                    {eventos.map(e => renderRow(e))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default tabelaEvento;