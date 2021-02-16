import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import smallCar from '../icons/small_car.svg';

const Heading = styled.header`
    margin: 0;
    width: 100%none;
    display: flex;
    padding-inline: 24px;
    justify-content: space-between;
    background-color: black;

    a {
        display: flex;
        flex-direction: row;
        font-size: 24px;
        color: white;
        margin: 0;

        p {
            margin-inline-start: 16px;
        }
    }

    div {
        margin-block-start: 28px;
        a {
            color: white;
        }

        a:focus {
            color: orange;
        }
    }
`;

export default function Header() {
    return (
        <Heading>
            <Link to="/">
                <img src={smallCar} alt="car" />
                <p>Mahanoro station</p>
            </Link>
            <div>
                <Link to="/user" >My account</Link>
            </div>
        </Heading>
    )
}