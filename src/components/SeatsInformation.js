import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import {getCities} from '../actions';
import chair from '../icons/chair-24px.svg';

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


const Seat = styled.img`
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),
linear-gradient(0deg, #E53170, #E53170);
    padding-inline: 8px;
    width: 48px;
    height: 48px;
`;

function SeatsInformation({cities, getCities}) {
    useEffect(() => {
        getCities();
    }, []);

    const {id} = useParams();
    const {destination} = useParams();
    
    const destinationCity = cities.filter((city) => city.destination.toLowerCase() == destination.toLowerCase());

    const seatInformation = destinationCity.filter((city) => Number(city.id) === Number(id));
    return (
        <section>
            <header>
                <h1>Book a seat to: <small>{destination}</small></h1>
            </header>
                <SeatInformationContainer>
                {seatInformation.map(city => {
                const miliseconds = city.departureTime * 1000;
                const dateObject = new Date(miliseconds);
                    return (
                    <div key={city.id}>
                        <article>
                            <header>
                                <h2>
                                    Pick a seat
                                </h2>
                            </header>
                            <SeatsContainer>
                                {city.seats.map(seat => {
                                    return (
                                        <div key={seat.id}>
                                            <Seat src={chair} alt="seat"/>
                                        </div>
                                    )
                                })}
                            </SeatsContainer>
                        </article>
                        <article>
                            <header>
                                <h2>
                                    Trip informations:
                                </h2>
                            </header>
                            <p>Departure time: <b>{dateObject.toLocaleString("en-US", {hour: "numeric"})}, {dateObject.toLocaleDateString()}</b></p>
                            <p>Driver: <b>{city.driverName}</b></p>
                            <p>Driver's contact: <b>{city.driverContact}</b></p>
                            <p>Estimated duration: <b>{city.estimatedDuration}</b></p>
                            <p>Breaks: <b>{city.breaks}</b></p>
                        </article>
                    </div>
                )
            })}
                </SeatInformationContainer>
        </section>
    )
}

const mapDispatchToProps = {
    getCities
}

export default connect((state) => ({cities: state.cities}) , mapDispatchToProps) (SeatsInformation);