import React, {useState} from "react";
import api from '../../services/api';

export default function Login({ history }){
    const [email, setEmail] = useState('');
    
    async function handleSubmit(event){
        event.preventDefault();
        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        console.log(localStorage.getItem('user'));
        
        history.push('/dashboard');    
    }
    
    return (
        <>
            <p>
                Faça seu Login
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL</label>
                <input 
                    id="email" 
                    type="email"  
                    placeholder="Seu email" 
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Logar</button>
            </form>
        </>
    );
}