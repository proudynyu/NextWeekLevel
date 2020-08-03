import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import api from '../../services/api';
import Axios from 'axios';

import logo from '../../assets/logo.svg';

import './CreatePoint.css';

interface itensObj {
    id: number,
    name: string,
    image_url: string
};

interface IBGEUFResponse {
    sigla: string
}

interface IBGECidadeResponse{
    nome: string,
}

const CreatePoint: React.FC = () => {
    const history = useHistory();
    const [itens, setItens] = useState<itensObj[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItens, setSelectedItens] = useState<number[]>([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })
    
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition( position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        })
    }, [])

    useEffect(() => {
        api.get('itens')
            .then(resp => {
                setItens(resp.data);
            });
    }, []);

    useEffect(() => {
        Axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(resp => {
                const ufInitials = resp.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            })
    }, []);

    useEffect(() => {
        Axios.get<IBGECidadeResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then( resp => {
                const cityNames = resp.data.map( city => city.nome)
                setCities(cityNames);
            });
    }, [selectedUf]);

    function handleUfSelect(e: ChangeEvent<HTMLSelectElement>) {
        const uf = e.target.value;
        setSelectedUf(uf);
    }

    function handleCitySelect(e: ChangeEvent<HTMLSelectElement>) {
        const city = e.target.value;
        setSelectedCity(city);
    }

    function handleMapClick(e: LeafletMouseEvent) {
        setSelectedPosition([
            e.latlng.lat,
            e.latlng.lng
        ]);
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSelectItem(id: number) {
        const alreadySelect = selectedItens.findIndex( item => item == id);

        if (alreadySelect >= 0) {
            const filteredItens = selectedItens.filter( item => item !== id);
            setSelectedItens(filteredItens);
        } else{
            setSelectedItens([ ...selectedItens, id ]);
        }
    }

    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [ latitude, longitude ] = selectedPosition;
        const itens = selectedItens;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            itens
        }

        await api.post('points', data)

        alert('Ponto de coleta cadastrado');

        history.push('/');
    }

    return (
        <div id="page-create-point">

            <header>
                <img src={logo} alt="Ecoleta Logo"/>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <form onSubmit={handleSubmit} autoComplete="off">
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div> 
                    </div>

                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleUfSelect}
                            >
                                <option value="0">Selecione uma UF</option>
                                { ufs.map( uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                    )) 
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <select 
                                name="cidade" 
                                id="cidade"
                                value={selectedCity}
                                onChange={handleCitySelect}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {   cities.map( city => (
                                    <option key={city} value={city}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        { itens.map(item => (
                            <li 
                                key={item.id}  
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItens.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.name}/>
                                <span>{item.name}</span>
                            </li>
                            ))
                        }
                        
                    </ul>

                </fieldset>
            
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
}

export default CreatePoint;