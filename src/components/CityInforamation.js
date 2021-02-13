import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import {getCities} from '../actions';

const Container = styled.article`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    margin-block-start: 16px;
    padding-inline: 32px;
    height: 48px;
    border: none;
    background: #E53170;
    color: white;
`;

const DepartureTime = styled.p`
    color: orange;
`;

function CityInformation({cities, getCities}) {
    console.log(cities);
    useEffect(() => {
        getCities();
    }, []);

    const {destination} = useParams();
    const cityInformation = cities.filter((city) => city.destination.toLowerCase() === destination.toLowerCase());
    return (
        <section>
            <h1>Next trips to: {destination}</h1>
           {cityInformation.map((city) => {
                const availableSeats = city.seats.filter((seat) => seat.isAvailable === true);

                const miliseconds = city.departureTime * 1000;
                const dateObject = new Date(miliseconds);
                return (
                    <>
                        <Container key={city.id}>
                            <div>
                                <DepartureTime>
                                    {dateObject.toLocaleString("en-US", {weekday: "long"})}
                                </DepartureTime>
                                <DepartureTime>
                                    {dateObject.toLocaleString("en-US", {hour: "numeric"})}
                                </DepartureTime>
                            </div>
                            <div>
                                <p>{dateObject.toLocaleDateString()}</p>
                                <p><small>{availableSeats.length}</small> seats left</p>
                            </div>
                            <Button type="button">Book a seat</Button>
                        </Container>
                    </>
                )
            })}
        </section>
    )
}

const mapDispatchToProps = {
    getCities
}

export default connect((state) => ({cities: state.cities}) , mapDispatchToProps) (CityInformation);