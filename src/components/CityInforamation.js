import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import {getCities} from '../actions';

const Container = styled.section`
    padding: 32px;
    text-align: center;
`;

const CityContainer = styled.article`
    display: flex;
    justify-content: space-between;
`;

const Button = styled.div`
    padding-block: 16px;
    padding-inline: 32px;
    margin-block-start: 16px;
    height: 18px;
    border: none;
    background: #E53170;
    cursor: pointer;

    a {
        color: white;
    }
`;

const ButtonDisabled = styled.div`
    margin-block-start: 16px;
    padding-block: 16px;
    padding-inline: 32px;
    height: 18px;
    border: none;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(0deg, #E53170, #E53170);
    cursor: not-allowed;

    a {
        color: white;
        cursor: not-allowed;
    }
`;

const DepartureTime = styled.p`
    color: orange;
`;

const Destination = styled.small`
    color: #E53170;
`;

function CityInformation({cities, getCities}) {
    useEffect(() => {
        getCities();
    }, []);

    const {destination} = useParams();
    const cityInformation = cities.filter((city) => city.destination.toLowerCase() === destination.toLowerCase());

    return (
        <Container>
            <h1>Next trips to: <Destination>{destination}</Destination></h1>
           {cityInformation.map((city) => {
                const availableSeats = city.seats.filter((seat) => seat.isAvailable === true);

                const miliseconds = city.departureTime * 1000;
                const dateObject = new Date(miliseconds);
                return (
                    <CityContainer key={city.id}>
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
                            <p><Destination>{availableSeats.length}</Destination> seats left</p>
                        </div>
                        {availableSeats.length > 0 
                            ? 
                            <Button>
                                <Link to={`/${city.destination}/${city.id}`} type="button">Book a seat</Link>
                            </Button>
                            : <ButtonDisabled>
                                <Link to={`/${city.destination}/${city.id}`} type="button">Book a seat</Link>
                            </ButtonDisabled>
                        }
                    </CityContainer>
                )
            })}
        </Container>
    )
}

const mapDispatchToProps = {
    getCities
}

export default connect((state) => ({cities: state.cities}) , mapDispatchToProps) (CityInformation);