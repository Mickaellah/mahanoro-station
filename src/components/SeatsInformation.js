import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import {getCities} from '../actions';
import Modal from './Modal';
import chair from '../icons/chair-24px.svg';

const MainContainer = styled.section`
    padding: 32px;
    text-align: center;
`;

const Header = styled.h1`
    text-transform: uppercase;

    small {
        text-transform: capitalize;
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
        grid-column-gap: 32px;
        column-gap: 32px;
    }
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

const SelectedSeats = styled.img`
    width: 48px;
    height: 48px;
    padding-inline: 8px;
    background-color: orange;
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
`;

const TotalPriceContainer = styled.div`
    transform: translate(55%);
`;

const Price = styled.div`
    display: flex;
    margin-inline-start: 40px;

    p {
        color: orange;
    }

    b {
        margin-block-start: 16px;
    }
`;

function SeatsInformation({cities, getCities}) {
    useEffect(() => {
        getCities();
    }, []);
    const [isChecked, setIsChecked] = useState(false);
    const [show, setShow] = useState(false);

    function handleCheckbox() {
        setIsChecked(!isChecked);
    }

    const {id} = useParams();
    const {destination} = useParams();
    
    const destinationCity = cities.filter((city) => city.destination.toLowerCase() == destination.toLowerCase());

    const seatInformation = destinationCity.filter((city) => Number(city.id) === Number(id));
    return (
        <MainContainer >
            <header>
                <Header>Book a seat to: <small>{destination}</small></Header>
            </header>
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
                                    } else if (seat.isAvailable && isChecked) {
                                        return <SelectedSeats src={chair} alt="seat" />
                                    } else {
                                        return <Seat src={chair} alt="seat" />
                                    }
                                }
                                return (
                                    <form key={seat.id}>
                                        <input type='checkbox' value={isChecked} onChange={handleCheckbox} />
                                        <label>
                                            {seats()}
                                        </label>
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
                                    <BoldText>{dateObject.toLocaleString("en-US", {hour: "numeric"})}, {dateObject.toLocaleDateString()}</BoldText>
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
                                    <Button onClick={() => { console.log("I am clicked"); setShow(true)}}>Book {} seats</Button>
                                    <Modal onClose={() => setShow(false)} show={show} />
                                </TotalPriceContainer>
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