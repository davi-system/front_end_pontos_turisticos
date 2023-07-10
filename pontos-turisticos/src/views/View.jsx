import './View.css';
import React, { useState, useEffect } from 'react'
import api from '../axios/api';
import imgPontoTuristico from '../img/pontos-turisticos.png';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const View = _ => {

    const { id } = useParams();
    const { register, reset } = useForm();
    const [pontoTuristico, setPontoTuristico] = useState([]);

    // Buscando ponto turístico
    const getPontoTuristico = async () => {
        try {
            const response = await api.get(`/PontosTuristicos/${id}`);
            const data = response.data;
            setPontoTuristico(reset(data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPontoTuristico()
    }, []);

    return (
        <div className='main'>
            <div className='modal-header header'>
                <img src={imgPontoTuristico} alt="Imagem de Pontos Turísticos" className='imgPontoTuristico' />
                <h2>Visualizar Ponto Turístico</h2>
            </div>
            
            <div className='modal-body'>
                <div className='col-md-12'>

                    <div className='row'>
                        <div className='col-md-12'>
                            <label>Nome</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                name='nome' 
                                {...register('nome')} 
                                disabled 
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2'>
                            <label>Estado</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                name='uf' 
                                {...register('uf')} 
                                disabled 
                            />
                        </div>

                        <div className='col-md-10'>
                            <label>Cidade</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                name='cidade' 
                                {...register('cidade')} 
                                disabled 
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-12'>
                            <label>Endereço</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                name='endereco' 
                                {...register('endereco')} 
                                disabled 
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-12'>
                            <label>Descrição</label>
                            <textarea 
                                className='form-control' 
                                name='descricao' 
                                {...register('descricao')} 
                                disabled
                            >                
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <div className='modal-footer'>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <button 
                                className='btn btn-secondary'>
                                <Link to={'/'} className='btnVoltar'>
                                    <i className="bi bi-arrow-left"></i> Voltar
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View;