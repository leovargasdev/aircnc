import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import socketio from 'socket.io-client';
import './styles.css';
import api from '../../services/api';


export default function Dashboard(){
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    
    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }
    }), [user_id]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleBooking(id, status){
        await api.post(`/booking/${id}/${status}`);
        setRequests(requests.filter(request => request._id !== id));
    }

    return(
        <>
            <ul className="notifications">
                {requests.map(request =>(
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em 
                            <strong>{request.spot.company}</strong> no dia <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleBooking(request._id, 'approvals')}>ACEITAR</button>
                        <button className="reject" onClick={() => handleBooking(request._id, 'rejections')}>REJEITAR</button>
                    </li>
                ))}
            </ul>
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