import React, { useState, useMemo } from "react";

import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';

export default function Spot({ history }){
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState('');
    const [imgSpot, setImgSpot] = useState(null);

    const preview = useMemo(() => {
        return imgSpot ? URL.createObjectURL(imgSpot) : null;
    }, [imgSpot]);

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const { user_id } = localStorage.getItem('user');

        data.append('img', imgSpot);
        data.append('price', price);
        data.append('techs', techs);
        data.append('company', company);

        console.log(data);
        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');    
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label 
                    id="img-spot"
                    style={{ backgroundImage: `url(${preview})`}} 
                    className={imgSpot ? 'has-img' : ''}>
                    <input type="file" onChange={event => setImgSpot(event.target.files[0])}/>
                    <img src={camera}/>
                </label>
                <label htmlFor="company">Empresa</label>
                <input 
                    type="text"
                    id="company"
                    placeholder="Nome empresa"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />

                <label htmlFor="price">Preço <span>(Deixar em branco é gratuito o valor)</span></label>
                <input 
                    id="price"
                    placeholder="Preço da diaria"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />

                <label htmlFor="techs">Tecnologias <span>(Separar as tecnologias por vírgula)</span></label>
                <input 
                    type="text"
                    id="techs"
                    placeholder="Tecnologias do lab"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                />
            </form>

            <button type="submit" className="btn">
                Cadastrar
            </button>
        </>
    )
}