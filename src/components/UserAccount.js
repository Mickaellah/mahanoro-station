import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {getUser, updateUser} from '../actions';
import Account from '../icons/account.svg';

const Content = styled.section`
    padding: 32px;
    @media (min-width: 700px) {
        max-width: 800px;
        margin-inline-start: auto;
        margin-inline-end: auto;
    }
`;

const Container = styled.div`
    @media (min-width: 600px) {
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

function UserAccount({user, updateUser}) {
    const [firstName, setFirstName] = useState("Clopedia");
    const [lastName, setLastName] = useState("Nomenjanahary");
    const [contact, setContact] = useState("0344523930");

    function handleSubmit(e) {
        e.preventDefault();
        updateUser();
    }

    return (
        <div>
            {user.map(user => {
                return (
                    <Content key={user.id}>
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
                            <article>
                                <header>
                                    <h3>
                                        My booking:
                                    </h3>
                                </header>
                            </article>
                        </Container>
                    </Content>
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
