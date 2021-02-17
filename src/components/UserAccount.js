import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {getUser, updateUser, getBookedSeats, removeSeats} from '../actions';
import Account from '../icons/account.svg';
import Bus from '../icons/noto-v1_bus.svg';

const Content = styled.section`
    padding: 32px;
    @media (min-width: 700px) {
        max-width: 1114px;
        margin-inline-start: auto;
        margin-inline-end: auto;
    }
`;

const Container = styled.div`
    @media (min-width: 800px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 32px;
        column-gap: 32px;
    }
`;

const Heading = styled.header`
    display: flex;
    flex-direction: row;

    h1 {
        margin-inline-start: 32px;
        font-size: 36px;
    }
`;

const UserName = styled.p`
    color: #E53170;
`;

const Fieldset = styled.fieldset`
    border: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-block-start: 16px;
`;

const Input = styled.input`
    padding: 16px;
    border: none;
    background: #000000;
    margin-block-start: 8px;
    color: orange;
    width: 70%;

    @media (mix-width: 700px) {
        width: 100%;
    }
`;

const Button = styled.button`
    padding-block: 16px;
    padding-inline: 32px;
    border: none;
    margin-block-start: 32px;
    background: #E53170;
    color: white;
`;

const Booking = styled.article`
    margin-block-start: 64px;

    @media (min-width: 700px) {
        margin-block-start: 0;
    }
`;

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
        height: 48px;
        margin-block-start: 40px;
        background: #FF8906;
        padding-block: 16px;
        padding-inline: 32px;
        border: none;
        color: white;
    }
`;

const DisabledButton = styled.button`
    height: 48px;
    margin-block-start: 40px;
    background: #FF8906;
    padding-block: 16px;
    padding-inline: 32px;
    border: none;
    color: white;
    cursor: not-allowed;
`;

function UserAccount({user, updateUser, seats, removeSeats}) {
    const [firstName, setFirstName] = useState("Clopedia");
    const [lastName, setLastName] = useState("Nomenjanahary");
    const [contact, setContact] = useState("0344523930");

    function handleSubmit(e) {
        e.preventDefault();
        updateUser();
    }

    return (
        <Content>
            <Heading>
                <img src={Account} alt="account" />
                <h1>
                    <p>My account:</p>
                    <UserName>{firstName} {lastName}</UserName>
                </h1>
            </Heading>
            <Container>
                <article>
                    <header>
                        <h3>
                            My personnal informations:
                        </h3>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <Fieldset>
                            <label>First name</label>
                            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" placeholder="Enter your firstName" />
                        </Fieldset>
                        <Fieldset>
                            <label>Last name</label>
                            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" placeholder="Enter your lastName" />
                        </Fieldset>
                        <Fieldset>
                            <label>Phone number</label>
                            <Input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} name="contact" placeholder="Type your contact" />
                        </Fieldset>
                        <Button type="submit">Update</Button>
                    </form>
                </article>
                <Booking>
                    <header>
                        <h3>
                            My bookings:
                        </h3>
                    </header>
                    <nav>
                        <ul>
                            {seats.map(seat => {
                                const date = new Date(seat.departureTime * 1000);
                                
                                return (
                                    <ListItem key={seat.id}>
                                        <img src={Bus} alt="bus" />
                                        <div>
                                            <p>{seat.destination}</p>
                                            <p>{date.toLocaleDateString()}, <small>{date.toLocaleString("en-US", {hour: "numeric"})}</small></p>
                                        </div>
                                        <div>
                                            {seat.bookedSeats > 1 
                                                ? <p>{seat.bookedSeats} seats</p>
                                                : <p>{seat.bookedSeats} seat</p>
                                            }
                                            <p>{seat.price * seat.bookedSeats} Ar</p>
                                        </div>
                                        <button onClick={() => removeSeats(seat.id)} type='button'>Cancel</button>
                                    </ListItem>
                                )
                            })}
                        </ul>
                    </nav>
                </Booking>
            </Container>
        </Content>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
        seats: state.seats
    }
}

const mapDispatchToProps = {
    getUser,
    updateUser,
    getBookedSeats,
    removeSeats
}

export default connect(mapStateToProps, mapDispatchToProps) (UserAccount);
