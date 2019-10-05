import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './styles.css';
import api from '../../services/api';

export default function Dashboard(){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            console.log(response.data)
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    return(
        <>
            <ul className="spot-list">
                {spots.map(spot =>(
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.img_url})`}}/>
                        <strong>{spot.company}</strong>
                        <strong>{spot.price ? `R$ ${spot.price}/dia` : "De gratis"}</strong>
                    </li>
                ))}
            </ul>

            <Link to="New">
                <button className="btn">
                    Novo Spot
                </button>
            </Link>
        </>
    );
}