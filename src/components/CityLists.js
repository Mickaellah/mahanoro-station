import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {getCities} from '../actions';

const CityContainer = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    column-gap: 20px;
`;

const ListOfCities = styled.li`
    padding: 16px;
    background: #0F0E17;
    color: white;
    text-transform: uppercase;
    margin-block-start: 20px;
    text-align: center;
    cursor: pointer;

    a {
        color: white;
    }
`;

function CityLists({cities, getCities}) {
    useEffect(() => {
        getCities();
    }, []);
    
    return (
        <div>
            <h1>Where are you going?</h1>

            <nav>
                {cities.map(city => {
                    return (
                        <CityContainer key={city.id}>
                            <ListOfCities>
                                <Link to={`/city/${city.destination}`}>
                                    {city.destination}
                                </Link>
                            </ListOfCities>
                        </CityContainer>
                    )
                })}
            </nav>
        </div>
    )
}

const mapDispatchToProps = {
    getCities,
}

export default connect((state) => ({cities: state.cities}), mapDispatchToProps) (CityLists);

