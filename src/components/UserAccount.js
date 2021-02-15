import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {getUser, updateUser} from '../actions';

const Container = styled.div`
    @media (min-width: 600px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
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
`;

const Button = styled.button`
    padding-block: 16px;
    padding-inline: 32px;
    border: none;
    margin-block-start: 32px;
    background: #E53170;
    color: white;
    margin-inline-start: 72%;

    @media (min-width: 600px) {
        margin-inline-start: 50%;
    }
`;

function UserAccount({user, updateUser}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contact, setContact] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        updateUser();
    }
    console.log(user);
    return (
        <div>
            {user.map(user => {
                return (
                    <section key={user.id}>
                        <header>
                            <h1>My account: {user.passengerFirstName} {user.passengerLastName}</h1>
                        </header>
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
                                        <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" placeholder={user.passengerFirstName} />
                                    </Fieldset>
                                    <Fieldset>
                                        <label>Last name</label>
                                        <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" placeholder={user.passengerLastName} />
                                    </Fieldset>
                                    <Fieldset>
                                        <label>Phone number</label>
                                        <Input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} name="contact" placeholder={user.passengerPhoneNumber} />
                                    </Fieldset>
                                    <Button type="submit">Update</Button>
                                </form>
                            </article>
                            <article>
                                <header>
                                    <h3>
                                        My booking:
                                    </h3>
                                </header>
                            </article>
                        </Container>
                    </section>
                )
            })}
        </div>
    )
}

const mapDispatchToProps = {
    getUser,
    updateUser
}

export default connect((state) => ({user: state.user}), mapDispatchToProps) (UserAccount);
