import './Home.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import imgPontoTuristicos from '../img/pontos-turisticos.png';
import api from '../axios/api';
import Swal from 'sweetalert2';

const Home = () => {

    const [pontosTuristicos, setPontosTuristicos] = useState([]);

    const [busca, setBusca] = useState("");

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

    const pontoTuristico = pontosTuristicos.filter((pt) => pt.nome.toLocaleLowerCase().includes(busca.toLocaleLowerCase()))

    function deletarPontoTuristico(id) {

        if (window.confirm('Deseja realmente excluir esse Ponto Turístico') == true) {
            api.delete(`/PontosTuristicos/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Ponto Turístico Excluido com Sucesso!',
                showConfirmButton: false,
                timer: 1500
            });

            setPontosTuristicos(pontosTuristicos.filter(pontoTuristico => pontoTuristico.id !== id));
        }
    }

    return (
        <div>
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

                <div className='row'>
                    <div className="col-md-6">
                        <label>Consultar Ponto Turístico</label>
                        <input type="text" className='form-control' value={busca} onChange={(e) => setBusca(e.target.value)} placeholder='informe o nome' />
                    </div>
                </div>

                <br />

                {
                    pontoTuristico.map((pontoTuristico) => [
                        <div key={pontoTuristico.id}>
                            <div className='card'>
                                <div className="card-header text-white" style={{ backgroundColor: "purple" }}><i className="bi bi-signpost-2"></i> Ponto Turístico #{pontoTuristico.id}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{pontoTuristico.nome}</h5>
                                    <p className="card-text" style={{ textAlign: "justify" }}>{pontoTuristico.descricao}</p>
                                </div>
                            </div>

                            <br />

                            <button className='btn btn-warning' style={{ marginRight: "5px" }}><Link to={`/View/${pontoTuristico.id}`} className='linkDetalhes'><i className="bi bi-eye"></i> Detalhes</Link></button>
                            <button className='btn btn-danger' style={{ marginRight: "5px" }} onClick={() => deletarPontoTuristico(pontoTuristico.id)}><i className="bi bi-trash"></i> Excluir</button>
                            <button className='btn btn-success'><Link to={`/Edit/${pontoTuristico.id}`} className='linkDetalhes'><i className="bi bi-pen"></i> Editar</Link></button>

                            <br /><br />
                        </div>
                    ])
                }
            </div>
        </div>
    )
}

export default Home;