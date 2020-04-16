import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

export default function BandasEvento({bandas}) {

    const [bandsOpen, setBandsOpen] = useState(true);
    const handleBandsClose = () => setBandsOpen(false);

    function renderRow(banda) {
        return (
            <tr key={banda.id}>
                <td>{banda.nome}</td>
                <td>{banda.genero}</td>
                <td>
                    <a>Atualizar</a>
                    <a>Excluir</a>
                </td>
            </tr>
        )
    }

    return (
        <Modal show={bandsOpen} onHide={handleBandsClose}>
            <Modal.Header closeButton>
                <Modal.Title>Lista de bandas evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                <Modal.Footer>
                    <Button type='submit' onClick={handleBandsClose}>
                        Salvar
                    </Button>
                    <Button variant="primary" onClick={handleBandsClose}>
                        Descartar
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}