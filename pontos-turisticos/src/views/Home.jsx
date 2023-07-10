import './Home.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../axios/api';
import imgPontoTuristicos from '../img/pontos-turisticos.png';
import Swal from 'sweetalert2';

const Home = _ => {

    const [pontosTuristicos, setPontosTuristicos] = useState([]);
    const [busca, setBusca] = useState("");

    // Buscando todos os Pontos Turísticos cadastrados
    const getPontosTuristicos = async () => {
        try {
            const response = await api.get('/PontosTuristicos');            
            setPontosTuristicos(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPontosTuristicos()
    }, []);    

    // Excluindo Ponto Turístico
    function deletarPontoTuristico(id) {

        if (window.confirm('Deseja realmente excluir esse Ponto Turístico') == true) {
            api.delete(`/PontosTuristicos/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Ponto Turístico Excluido com Sucesso!',
                showConfirmButton: false,
                timer: 1500
            });

            // Filtrando somente pontos turísticos que existe
            setPontosTuristicos(pontosTuristicos.filter(pontoTuristico => pontoTuristico.id !== id));
        }
    }

    return (
        <div>
            <div className='main'>
                <div className='modal-header'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={imgPontoTuristicos} alt="Imagem de Pontos Turisticos" style={{ width: "100%", marginTop: "10px" }} />
                            </div>

                            <div className='col-md-6 divBtnCadastro'>
                                <button className='btn btn-secondary'>
                                    <Link to="/Add" className='btnLink'>
                                        Cadastrar novo Ponto Turístico
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />

                <div className='row'>
                    <div className="col-md-6">
                        <label>Consultar Ponto Turístico</label>
                        <input 
                            type="text" 
                            className='form-control' 
                            value={busca} 
                            onChange={(e) => setBusca(e.target.value)} 
                            placeholder='informe o nome' 
                        />
                    </div>
                </div>

                <br />
                
                {
                    // Filtrando Ponto Turístico pelo nome                    
                    pontosTuristicos.filter((pt) => pt.nome.toLocaleLowerCase().includes(busca.toLocaleLowerCase())).map((pontoTuristico) => (
                        <div key={pontoTuristico.id}>
                            <div className='card'>
                                <div className="card-header text-white" style={{ backgroundColor: "purple" }}><i className="bi bi-signpost-2"></i> Ponto Turístico #{pontoTuristico.id}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{pontoTuristico.nome}</h5>
                                    <p className="card-text" style={{ textAlign: "justify" }}>{pontoTuristico.descricao}</p>
                                </div>
                            </div>

                            <br />

                            {/* Btn Detalhes */}
                            <button className='btn btn-warning'style={{ marginRight: "5px" }}>
                                <Link to={`/View/${pontoTuristico.id}`} className='btnLink'>
                                    <i className="bi bi-eye"></i> Detalhes
                                </Link>
                            </button>

                            {/* Btn Editar */}
                            <button className='btn btn-success'style={{marginRight: "5px"}}>
                                <Link to={`/Edit/${pontoTuristico.id}`} className='btnLink'>
                                    <i className="bi bi-pen"></i> Editar
                                </Link>
                            </button>

                            {/* Btn Excluir */}
                            <button className='btn btn-danger' onClick={() => deletarPontoTuristico(pontoTuristico.id)}>
                                <i className="bi bi-trash"></i> Excluir
                            </button>

                            <br /><br />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;