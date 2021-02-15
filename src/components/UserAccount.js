import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {getUser} from '../actions';

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

function UserAccount({user}) {
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
                                <form>
                                    <Fieldset>
                                        <label>First name</label>
                                        <Input type="text" name="firstName" placeholder={user.passengerFirstName} />
                                    </Fieldset>
                                    <Fieldset>
                                        <label>Last name</label>
                                        <Input type="text" name="lastName" placeholder={user.passengerLastName} />
                                    </Fieldset>
                                    <Fieldset>
                                        <label>Phone number</label>
                                        <Input type="tel" name="contact" placeholder={user.passengerPhoneNumber} />
                                    </Fieldset>
                                    <Button>Update</Button>
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
    getUser
}

export default connect((state) => ({user: state.user}), mapDispatchToProps) (UserAccount);
