import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

export default function CadastroLugar({load}){

    const [nomeLugar, setNomeLugar] = useState('');
    const [capacidade, setCapacidade] = useState('');

    const [isOpenLocal, setOpenLocal] = useState(true);
    const handleCloseLocal = () => setOpenLocal(false);

    async function handleAddLocal(e) {
        e.preventDefault();

        await axios.post(`http://localhost:8080/agenda-react/lugar/?nomeLugar=${nomeLugar}&capacidade=${capacidade}`)
            .then(resp => {
                load();
                return resp
            });

        setNomeLugar('');
        setCapacidade('');
    }

    return(
        <Modal show={isOpenLocal} onHide={handleCloseLocal}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Lugar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleAddLocal}>
                    <p>Lugar</p>
                    <input
                        type='text'
                        name='nomeLugar'
                        placeholder='Digite o nome do lugar'
                        id='nomeLugar'
                        value={nomeLugar}
                        onChange={e => setNomeLugar(e.target.value)}
                    /><br/><br/>
                    <p>Genero</p>
                    <input
                        type='text'
                        name='capacidade'
                        placeholder='Qual a capacidade'
                        id='capacidade'
                        value={capacidade}
                        onChange={e => setCapacidade(e.target.value)}
                    /><br/><br/>
                    <Modal.Footer>
                        <Button type='submit' onClick={handleCloseLocal}>
                            Salvar
                        </Button>
                        <Button variant="primary" onClick={handleCloseLocal}>
                            Descartar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    )
}