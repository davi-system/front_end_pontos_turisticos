import './Home.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import imgPontoTuristicos from '../img/pontos-turisticos.png';
import api from '../axios/api';

const Home = () => {

    const [pontosTuristicos, setPontosTuristicos] = useState([]);

    const getPontosTuristicos = async data => {

        try {
            const response = await api.get('/PontosTuristicos');
            const data = response.data;
            setPontosTuristicos(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPontosTuristicos()
    }, []);

    return (
        <div style={{ "width": "60%", "margin": "0 auto" }}>
            <div className='modal-header'>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={imgPontoTuristicos} alt="Imagem de Pontos Turisticos" style={{ width: "100%", marginTop: "10px" }} />
                        </div>

                        <div className='col-md-6' style={{ textAlign: "right", marginTop: "70px" }}>
                            <button className='btn btn-secondary'><Link to="/Add" className='linkCadastro'>Cadastrar novo Ponto Turistico</Link></button>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            {
                pontosTuristicos.map((pontoTuristico) => [
                    <div key={pontoTuristico.id}>
                        <div className='card'>
                            <div className="card-header text-white" style={{ backgroundColor: "purple" }}>Ponto Turístico</div>
                            <div className="card-body">
                                <h5 className="card-title">{pontoTuristico.nome}</h5>
                                <p className="card-text" style={{ textAlign: "justify" }}>{pontoTuristico.descricao}</p>
                            </div>
                        </div>

                        <br />

                        <button className='btn btn-warning'><Link to={`/View/${pontoTuristico.id}`} className='linkDetalhes'>Detalhes</Link></button>

                        <br /><br />
                    </div>
                ])
            }
        </div>
    )
}

export default Home;