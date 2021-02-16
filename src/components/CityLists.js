import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {getCities} from '../actions';
import City from '../icons/city.svg';
import NotoBus from '../icons/noto-v1_bus.svg';

const Container = styled.article`
    @media (min-width: 700px) {
        max-width: 800px;
        margin-inline-start: auto;
        margin-inline-end: auto;
    }

    @media (max-width: 700px) {
        padding: 32px;
    }
`;

const Heading = styled.header`
    display: flex;
    flex-direction: row;
    padding-block: 32px;

    h2 {
        margin-inline-start: 32px;
    }
`;

const CityContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    column-gap: 20px;
`;

const ListOfCities = styled.li`
    display: flex;
    padding: 16px;
    background: #0F0E17;
    color: white;
    text-transform: uppercase;
    margin-block-start: 20px;
    text-align: center;
    cursor: pointer;

    a {
        color: white;
        margin-inline-start: 16px;
        margin-block-start: 8px;
    }
`;

function CityLists({cities, getCities}) {
    useEffect(() => {
        getCities();
    }, []);

    const filterAntananarivoCity = cities.filter(city => city.destination === "Antananarivo");

    const filterVatomandryCity = cities.filter(city => city.destination === "Vatomandry");

    const filterToamasinaCity = cities.filter(city => city.destination === "Toamasina");

    const filterMoramangaCity = cities.filter(city => city.destination === "Moramanga");

    return (
        <Container>
            <Heading>
                <img src={NotoBus} alt="bus" />
                <h2>
                    Where are you going?
                </h2>
            </Heading>

            <nav>
                <CityContainer>
                    {filterAntananarivoCity.map((city, index) => {
                        if (index === 0) {
                            return (
                                <ListOfCities key={city.id}>
                                    <img src={City} alt="city" />
                                    <Link to={`/city/${city.destination}`}>
                                        {city.destination}
                                    </Link>
                                </ListOfCities>
                            )
                        }
                    })}
                    {filterVatomandryCity.map((city, index) => {
                        if (index === 0) {
                            return (
                                <ListOfCities key={city.id}>
                                    <img src={City} alt="city" />
                                    <Link to={`/city/${city.destination}`}>
                                        {city.destination}
                                    </Link>
                                </ListOfCities>
                            )
                        }
                    })}
                    {filterToamasinaCity.map((city, index) => {
                        if (index === 0) {
                            return (
                                <ListOfCities key={city.id}>
                                    <img src={City} alt="city" />
                                    <Link to={`/city/${city.destination}`}>
                                        {city.destination}
                                    </Link>
                                </ListOfCities>
                            )
                        }
                    })}
                    {filterMoramangaCity.map((city, index) => {
                        if (index === 0) {
                            return (
                                <ListOfCities key={city.id}>
                                    <img src={City} alt="city" />
                                    <Link to={`/city/${city.destination}`}>
                                        {city.destination}
                                    </Link>
                                </ListOfCities>
                            )
                        }
                    })}
                </CityContainer>
            </nav>
        </Container>
    )
}

const mapDispatchToProps = {
    getCities,
}

export default connect((state) => ({cities: state.cities}), mapDispatchToProps) (CityLists);

