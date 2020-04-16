import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

export default function CadastroEvento() {
    const [isOpenEvent, setOpenEvent] = useState(false);
    const handleCloseEvent = () => setOpenEvent(false);

    return (
        <Modal show={isOpenEvent} onHide={handleCloseEvent}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Lugar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleAddEvent}>
                    <p>Lugares</p>
                    <select
                        name="idLugar"
                        id="idLugar"
                        value={idLugar}
                        onChange={e => setIdLugar(e.target.value)}
                    >
                        <option>Selecione um local</option>
                        <option>...</option>
                        {lugares.map(lugar => {
                            return (
                                <option key={lugar.id} value={lugar.id}>{lugar.nome}</option>
                            );
                        })}
                    </select><br/><br/>
                    <p>Data</p>
                    <input
                        type='date'
                        name='dia'
                        placeholder='Digite o dia'
                        id='dia'
                        value={dia}
                        onChange={e => setDia(e.target.value)}
                    /><br/><br/>
                    <Modal.Footer>
                        <Button type='submit' onClick={handleCloseEvent}>
                            Salvar
                        </Button>
                        <Button variant="primary" onClick={handleCloseEvent}>
                            Descartar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
}