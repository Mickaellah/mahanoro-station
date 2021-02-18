import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import {getCities} from '../actions';
import Modal from './Modal';
import chair from '../icons/seat.svg';
import Bus from '../icons/noto-v1_bus.svg';

const MainContainer = styled.section`
    padding: 32px;
    text-align: center;

    @media (min-width: 700px) {
        max-width: 1114px;
        margin-inline-start: auto;
        margin-inline-end: auto;
    }
`;

const Heading = styled.header`
    display: flex;
    flex-direction: row;

    p {
        margin-block-end: 0;
    }
`;


const Header = styled.h1`
    margin-inline-start: 32px;
    text-transform: uppercase;

    p {
        margin-block-start: 0;
    }
`;

const SeatInformationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const SeatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 20px;
    column-gap: 20px;
    grid-row-gap: 20px;
    row-gap: 20px;
`;

const Container = styled.div`
    @media (min-width: 600px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 48px;
        column-gap: 48px;
    }
`;

const Destination = styled.p`
    color: #E53170;
    margin-block-end: 10px;
    text-transform: capitalize;
`;

const DriverInformation = styled.article`
    text-align: start;
`;


const Seat = styled.img`
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),
linear-gradient(0deg, #E53170, #E53170);
    padding-inline: 8px;
    width: 48px;
    height: 48px;
`;

const AvailableSeat = styled.img`
    width: 48px;
    height: 48px;
`;

const Information = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const BoldText = styled.p`
    font-weight: bold;
`;

const Button = styled.button`
    padding-block: 16px;
    padding-inline: 32px;
    border: none;
    background: #E53170;
    color: white;
    margin-inline-start: 88px;
`;

const TotalPriceContainer = styled.div`
    transform: translate(45%);
`;

const Price = styled.div`
    display: flex;
    margin-inline-start: 40px;

    p {
        color: orange;
    }

    b {
        margin-block-start: 24px;
    }
`;

const TotalPrice = styled.p`
    text-transform: uppercase;
`;

const Input = styled.input`
    display: none;
`;

const Label = styled.label`
    cursor: pointer;
`;

function SeatsInformation({cities, getCities}) {
    const {id} = useParams();
    useEffect(() => {
        getCities();
    }, []);
    const [isChecked, setIsChecked] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [show, setShow] = useState(false);

    const {destination} = useParams();
    
    const destinationCity = cities.filter((city) => city.destination.toLowerCase() == destination.toLowerCase());

    const seatInformation = destinationCity.filter((city) => Number(city.id) === Number(id));

    let inputs = document.getElementsByTagName("input");
    let checkboxes = [];
    let checkedCheckboxes = [];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            checkboxes.push(inputs[i]);
            if (inputs[i].checked) {
                checkedCheckboxes.push(inputs[i]);
            }
        }
    }
    let numberOfCheckedCheckboxes = checkedCheckboxes.length;
    return (
        <MainContainer >
            <Heading>
                <img src={Bus} alt="bus" />
                <Header>
                    <p>Book a seat to:</p>
                    <Destination>{destination}</Destination>
                </Header>
            </Heading>
            <SeatInformationContainer>
            {seatInformation.map(city => {
                const miliseconds = city.departureTime * 1000;
                const dateObject = new Date(miliseconds);
                return (
                <Container key={city.id}>
                    <article>
                        <header>
                            <Header>
                                Pick a seat
                            </Header>
                        </header>
                        <SeatsContainer>
                            {city.seats.map(seat => {
                                function seats() {
                                    if (seat.isAvailable) {
                                        return <AvailableSeat src={chair} alt="seat" />
                                    } else {
                                        return <Seat src={chair} alt="seat" />
                                    }
                                }

                                function handleCheckbox() {
                                    setIsChecked(!isChecked);
                                    setIsAvailable(!seat.isAvailable);
                                }

                                return (
                                    <form key={seat.id}>
                                        <Label className="label">
                                            <Input type='checkbox' value={isChecked} onChange={handleCheckbox} />
                                            {seats()}
                                        </Label>
                                    </form>
                                )
                            })}
                        </SeatsContainer>
                        </article>
                        <DriverInformation>
                            <header>
                                <Header>
                                    Trip informations:
                                </Header>
                            </header>
                            <div>
                                <Information>
                                    <p>Departure time:</p>
                                    <BoldText>{dateObject.toLocaleTimeString("en-US")}, {dateObject.toLocaleDateString()}</BoldText>
                                </Information>
                                <Information>
                                    <p>Driver:</p>
                                    <BoldText>{city.driverName}</BoldText>
                                </Information>
                                <Information>
                                    <p>Driver's contact:</p>
                                    <BoldText>{city.driverContact}</BoldText>
                                </Information>
                                <Information>
                                    <p>Estimated duration:</p>
                                    <BoldText>{city.estimatedDuration}</BoldText>
                                </Information>
                                <Information>
                                    <p>Breaks:</p>
                                    <BoldText>{city.breaks}</BoldText>
                                </Information>
                                <TotalPriceContainer>
                                    <Price>
                                        <p>{city.price}</p> <b>Ar/seat</b>
                                    </Price>
                                    <Button onClick={() => setShow(true)}>
                                        Book {numberOfCheckedCheckboxes} seats
                                    </Button>
                                    {numberOfCheckedCheckboxes === 0 
                                        ? <TotalPrice>Total: {city.price} Ar</TotalPrice>
                                        :<TotalPrice>Total: {city.price * numberOfCheckedCheckboxes} Ar</TotalPrice>
                                    }
                                </TotalPriceContainer>
                                <Modal onClose={() => setShow(false)} show={show} />
                            </div>
                        </DriverInformation>
                    </Container>
                )
            })}
                </SeatInformationContainer>
        </MainContainer>
    )
}

const mapDispatchToProps = {
    getCities
}

export default connect((state) => ({cities: state.cities}) , mapDispatchToProps) (SeatsInformation);