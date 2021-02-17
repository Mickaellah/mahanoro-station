import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import Confirming from '../icons/confirming.svg';

const ModalContainer = styled.div`
    position: absolute;
    left: 80%;
    top: 60%;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(150%);

    @media (min-width: 600px) {
        left: 55%;
        top: 10%;
        transform: translateY(0%);
        transform: translateX(20%);
    }
`;

const ModalBox = styled.div`
    width: 300px;
    background-color: white;
    padding: 48px;
    text-align: center;
    transform: translate(-50%, -50%);
    border: 5px solid #E53170;

    @media (min-width: 600px) {
        transform: translate(-115%, 0%);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CloseButton = styled.span`
    float: right;
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.25rem;
    color: white;
    margin-block-start: -32px;
    margin-inline-end: -32px;
    color: black;
`;

const Button = styled.div`
    padding-block: 16px;
    padding-inline: 32px;
    border: none;
    margin-block-start: 32px;
    background: #E53170;
    color: white;
    cursor: pointer;

    a {
        color: white;
    }
`;

export default function Modal(props) {
    if (!props.show) {
        return null
    }
    return (
        <ModalContainer>
            <div>
                <ModalBox>
                    <Container>
                        <img src={Confirming} alt="confirm" />
                        <h2>Booking confirmed!</h2>
                        <CloseButton onClick={props.onClose}>X</CloseButton>
                    </Container>
                    <p>
                        Thank you for trusting our services. Your booking has been added to your account. You can review it there.
                    </p>
                    <Button>
                        <Link to="/user">Checkbox your acount</Link>
                    </Button>
                </ModalBox>
            </div>
        </ModalContainer>
    )
}
