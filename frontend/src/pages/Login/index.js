import React, {useState} from "react";
import api from '../../services/api';

export default function Login({ history }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit(event){
        event.preventDefault();
        
        const response = await api.post('/sessions', { email, password });

        if(response.data.error){
            alert("Erro ao acessar a conta!!");
        } else {
            const { _id } = response.data;
            localStorage.setItem('user', _id);
            
            history.push('/dashboard');    
        }
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
                    placeholder="seu@email.com.br" 
                    onChange={event => setEmail(event.target.value)}
                />
                <label htmlFor="email">SENHA</label>
                <input 
                    id="password" 
                    type="password"
                    placeholder="Digite sua super senha"  
                    onChange={event => setPassword(event.target.value)}
                />
                <button className="btn" type="submit">Logar</button>
            </form>
        </>
    );
}