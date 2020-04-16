import React, {useState} from 'react';
import axios from 'axios';
import {Button, Modal} from "react-bootstrap";

export default function CadastroBanda({load}) {

    const [nomeBanda, setNomeBanda] = useState('');
    const [generoBanda, setGeneroBanda] = useState('');

    const [isOpenBand, setOpenBand] = useState(true);
    const handleCloseBand = () => setOpenBand(false);

    async function handleSubmit(e) {
        e.preventDefault();

        await axios.post(`http://localhost:8080/agenda-react/banda/?nomeBanda=${nomeBanda}&generoBanda=${generoBanda}`)
            .then(resp => {
                load();
                return resp
            });

        setNomeBanda('');
        setGeneroBanda('');
    }

    return (
        <Modal show={isOpenBand} onHide={handleCloseBand}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Banda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <p>Banda</p>
                    <input
                        type='text'
                        name='nomeBanda'
                        placeholder='Digite o nome da banda'
                        id='nomeBanda'
                        value={nomeBanda}
                        onChange={e => setNomeBanda(e.target.value)}
                    /><br/><br/>
                    <p>Genero</p>
                    <select
                        name='generoBanda'
                        id='generoBanda'
                        value={generoBanda}
                        onChange={e => setGeneroBanda(e.target.value)}
                    >
                        <option>Generos</option>
                        <option>Axé</option>
                        <option>Forró</option>
                        <option>Rock</option>
                    </select><br/><br/>
                    <Modal.Footer>
                        <Button type='submit' onClick={handleCloseBand}>
                            Salvar
                        </Button>
                        <Button variant="primary" onClick={handleCloseBand}>
                            Descartar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
}