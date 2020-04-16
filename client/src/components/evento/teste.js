import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

export default function TesteEvento() {

    const [isOpenBand, setOpenBand] = useState(true);
    const handleCloseBand = () => setOpenBand(false);

    return (
        <Modal show={isOpenBand} onHide={handleCloseBand} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>a</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseBand}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCloseBand}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}