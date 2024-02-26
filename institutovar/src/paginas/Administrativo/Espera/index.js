import React, { useState } from "react";
import '../administrativo.css'
import HeaderAluno from "../../../componentes/HeaderAluno";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import { isUndefined } from "util";
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net';
import 'datatables.net-buttons';
import { FaUserEdit } from 'react-icons/fa';
import { BsInfoCircleFill } from 'react-icons/bs';

export default function Espera() {
    const [loading, setloading] = useState(true);
    const [tabela, setTabela] = useState([]);
    const [codTurma, setCodTurma] = useState('');

    const handleEscolherTurma = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setCodTurma(intValue);
        setloading(true);
        handleListaEspera(intValue);
    };

    const handleReprovar = async (id) => {
        try {
            const response = await api.post(`Administrativo/ReprovarAlunoListaEspera/${id}`);
            if (response.status === 200) {
                toast.success(response.data.mensagem);
            }
        } catch (error) {
            toast.warn("Houve algum problema na hora de rejeitar");
        }
    }

    const handleAprovar = async (id) => {
        try {
            const response = await api.post(`Administrativo/AprovarAlunoListaEspera/${id}`);
            if (response.status === 200) {
                toast.success(response.data.mensagem);
            }
        } catch (error) {
            toast.warn("Houve algum problema na hora de aprovar");
        }
    }

    const handleListaEspera = async (intValue) => {
        try {
            if (!isUndefined(intValue)) {
                await api.get(`Administrativo/ObterListaEspera/${intValue}`).then((response) => {
                    setTabela(response.data);
                    setloading(false);
                });
            } else {
                await api.get(`Administrativo/ObterListaEspera/`).then((response) => {
                    setTabela(response.data);
                    setloading(false);
                });
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        handleListaEspera();
    }, []);

    return (
        <div className="body-administrativo">
            <HeaderAluno />
            <main>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/home`}>Administrativo</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Lista de espera</li>
                    </ol>
                </nav>

                <div className='select-espera'>
                    <select id="codTurma" name="codTurma" required value={codTurma} onChange={handleEscolherTurma} >
                        <option value="0">Selecione uma turma</option>
                        <option value="5">Seg - Qua (Manhã)</option>
                        <option value="8">Ter - Qui (Manhã)</option>
                        <option value="6">Seg - Qua (Tarde)</option>
                        <option value="9">Ter - Qui (Tarde)</option>
                        <option value="7">Seg - Qua (Noite)</option>
                        <option value="13">Ter - Qui (Noite)</option>
                        <option value="12">Sábado (Integral)</option>
                    </select>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15%' }}>
                        <div style={{ width: '3rem', height: '3rem' }} class="text-light spinner-border-sm spinner-border" role="status"></div>
                    </div>
                ) : tabela.length > 0 ? (
                    <div className="table-container">
                        <table class="table table-info table-dark table-striped table-hover table-striped" id="tabela">
                            <thead>
                                <tr>
                                    <th>Posição</th>
                                    <th>nome</th>
                                    <th>Data criação</th>
                                    <th>Turma</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="tbody-espera">
                                {tabela.map((espera, index) => (
                                    <tr key={espera.codigo}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>{espera.nome}</td>
                                        <td>{new Date(espera.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                        <td>{espera.descricaoTurma}</td>
                                        <td><button className="btn btn-success" type="button" onClick={() => { handleAprovar(espera.codigo) }}>Aprovar</button></td>
                                        <td><button className="btn btn-danger" type="button" onClick={() => { handleReprovar(espera.codigo) }}>Reprovar</button></td>
                                        <td><Link to={`/administrativo/editar/aluno/${espera.codigo}`}><FaUserEdit color="aqua" /></Link></td>
                                        <td><Link to={`/administrativo/detalhes/aluno/${espera.codigo}`}><BsInfoCircleFill color="aqua" /></Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '12%' }}>
                        <h5>A lista de espera para esta turma está vazia.</h5>
                    </div>
                )}
            </main>
        </div>
    )
}
