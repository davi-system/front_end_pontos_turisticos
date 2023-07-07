import './Add.css';
import React from 'react';
import api from '../axios/api';
import imgPontoTuristicos from '../img/pontos-turisticos.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Add = () => {

    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const addPontoTuristico = data => api.post('/PontosTuristicos', data)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                navigate('/');
            }, 2000);

        }).catch((error) => {
            console.log(error);
        });

    return (
        <div style={{ "width": "60%", "margin": "0 auto" }}>            

            <div className='modal-header' style={{ "marginTop": "10px" }}>
                <img src={imgPontoTuristicos} alt="Imagem de Pontos Turísticos" style={{width: "50%"}} />                
                <h2>Adicionar Ponto Turístico</h2>
            </div>            

            <form onSubmit={handleSubmit(addPontoTuristico)}>
                <div className='modal-body'>
                    <div className='col-md-12'>

                        <div className='row'>
                            <div className='col-md-12'>
                                <label>Nome</label>
                                <input type="text" className='form-control' name='nome'  {...register('nome')} required />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <label>Estado</label>
                                <input type="text" className='form-control' name='estado'  {...register('estado')} required />
                            </div>

                            <div className='col-md-10'>
                                <label>Cidade</label>
                                <input type="text" className='form-control' name='cidade'  {...register('cidade')} required />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <label>Endereço</label>
                                <input type="text" className='form-control' name='endereco'  {...register('endereco')} required />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <label>Descrição</label>
                                <textarea className='form-control' name='descricao' {...register('descricao')} required></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <br />

                <div className='modal-footer'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <button className='btn btn-secondary'><Link to={'/'} className='linkVoltar'>Voltar</Link></button>
                            </div>

                            <div className='col-md-6' style={{ "textAlign": "right" }}>
                                <button className='btn btn-primary' type='submit'>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Add;