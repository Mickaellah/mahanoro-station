import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {getCities} from '../actions';

const CityContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    column-gap: 20px;
`;

const ListsOfCities = styled.li`
    padding: 16px;
    background: #0F0E17;
    color: white;
    text-transform: uppercase;
    margin-block-start: 20px;
    text-align: center;
`;

function CityLists({cities, getCities}) {
    console.log(cities);
    useEffect(() => {
        getCities();
    }, []);
    return (
        <div>
            <h1>Where are you going?</h1>

            <nav>
                <CityContainer>
                    <ListsOfCities>Antananarivo</ListsOfCities>
                    <ListsOfCities>Vatomandry</ListsOfCities>
                    <ListsOfCities>Toamasina</ListsOfCities>
                    <ListsOfCities>Moramanga</ListsOfCities>
                </CityContainer>
            </nav>
        </div>
    )
}

const mapDispatchToProps = {
    getCities,
}

export default connect((state) => ({cities: state.cities}), mapDispatchToProps) (CityLists);

