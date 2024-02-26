import React, { useRef, useState } from "react";
import '../administrativo.css'
import HeaderAluno from "../../../componentes/HeaderAluno";
import { BsFillCheckSquareFill, BsInfoCircleFill } from 'react-icons/bs';
import { AiFillCloseSquare } from 'react-icons/ai';
import { FaUserEdit, FaChartBar } from 'react-icons/fa';
import { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net';
import 'datatables.net-buttons';
import api from "../../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Presenca() {
    const dataatual = new Date();
    const ref = useRef(null);
    const ref2 = useRef(null);

    const [turmas, setTurmas] = useState([]);
    const [turmaCodigo, setTurmaCodigo] = useState(0);
    const [date, setDate] = useState(`${dataatual.getFullYear()}-${(dataatual.getMonth()+1).toString().padStart(2, "0")}-${dataatual.getDate()}`);
    const [alunos, setAlunos] = useState([]);
    const [codigoPresenca, setCodigoPresenca] = useState('');
    const [nomePresenca, setNomePresenca] = useState('');
    const [statusPresenca, setStatusPresenca] = useState('');
    const [observacao, setObservacao] = useState('');
    const [dateAluno, setDateAluno] = useState('');

    const handleGetPresenca = async (codigoTurma) => {
        if (!codigoTurma)
            codigoTurma = turmaCodigo
        if (codigoTurma == 0) {
            toast.warn("Selecione uma turma.")
            return;
        }

        api.post("administrativo/ObterListaPresenca", {
            turmaCodigo: codigoTurma,
            data: date
        }).then((response) => {
            setAlunos(response.data);
        });
    }
    const handleGetTurmas = async () => {
        await api.get("administrativo/ObterTurmas").then((response) => {
            setTurmas(response.data);
            setTurmaCodigo(response.data[0].codigo);
            handleGetPresenca(response.data[0].codigo);
        })
    }
    const handlePostPresenca = async () => {
        if (dateAluno == '') {
            toast.warn("Selecione a data.");
            return;
        }
        if (statusPresenca == '') {
            toast.warn("Selecione o status.");
            return;
        }        
        await api.post("Administrativo/DarPresenca",{
            usuarioCodigo: codigoPresenca,
            statusPresencaCodigo: statusPresenca,
            DataPresenca:dateAluno,
            observacao: observacao,            
        }).then((response) => {
            if(response.status == 204){
                toast.success("Presença marcada com sucesso!")
            }
        })
    }


    useEffect(() => {
        handleGetTurmas();
    }, []);


    return (
        <div className="body-administrativo">
            <HeaderAluno />
            <main>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/home`}>Administrativo</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Presença</li>
                    </ol>
                </nav>

                <form onSubmit={(e) => { e.preventDefault(); handleGetPresenca() }}>
                    <div>
                        <label>Turma:</label>
                        <select value={turmaCodigo} onChange={(e) => { setTurmaCodigo(e.target.value) }}>
                            <option value={0}>Selecione uma turma</option>
                            {turmas.map((turma) => {
                                return (
                                    <option value={turma.codigo} style={{ color: "black" }}>{turma.descricao}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div>
                        <label>Data:</label>
                        <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Carregar</button>
                </form>

                <div className="table-container">
                    <table class="table table-info table-dark table-striped table-hover table-striped" id="tabela">
                        <thead>
                            <tr>
                                <th scope="col">Baia</th>
                                <th scope="col">% de faltas</th>
                                <th scope="col">Registros</th>
                                <th scope="col">Faltas</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Primeira Aula concluida</th>
                                <th scope="col">Última Aula concluida</th>
                                <th scope="col">Aulas concluídas (total)</th>
                                <th scope="col">Aulas concluídas (dia)</th>
                                <th scope="col">Aulas Iniciadas</th>
                                <th scope="col">Presente</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {alunos.sort((user, user2) => {
                                if (user.posicao < user2.posicao)
                                    return -1;
                            }).map((aluno) => {
                                const date1 = new Date(aluno.primeiraAulasConcluidas)
                                const date2 = new Date(aluno.ultimoDiaAulaConcluida)
                                return (
                                    <tr>
                                        <td>{aluno.posicao}</td>
                                        <td>{aluno.percentualFaltas}%</td>
                                        <td>{aluno.totalregistros}</td>
                                        <td>{aluno.totalFaltas}</td>
                                        <td>{aluno.nome}</td>
                                        <td>{`${date1.getDate()}/${date1.getMonth().toString().padStart(2, "0")}/${date1.getFullYear()}`}</td>
                                        <td>{`${date2.getDate()}/${date2.getMonth().toString().padStart(2, "0")}/${date2.getFullYear()}`}</td>
                                        <td>{aluno.totalAulasConcluidas}</td>
                                        <td>{aluno.aulasConcluidas}</td>
                                        <td>{aluno.aulasIniciadas}</td>
                                        {
                                             aluno.chamada == "Presente" ?
                                             <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: "none" }} >Presente</td>
                                             : aluno.chamada == "Remoto" ?
                                             <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: "none" }} >Remoto</td>
                                             : aluno.chamada == "Falta" ?
                                             <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: "none" }} >Falta</td>
                                             : aluno.chamada == "Falta" ?
                                             <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: "none" }} >Falta Justificada</td>
                                             : 
                                             <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: "none" }} onClick={() => {
                                                setCodigoPresenca(aluno.usuarioCodigo);
                                                setNomePresenca(aluno.nome);
                                                ref.current.click();
                                            }}><BsFillCheckSquareFill color="green" /></td>

                                        }
                                        
                                        <td><Link to={`/administrativo/detalhes/aluno/${aluno.usuarioCodigo}`}><BsInfoCircleFill color="aqua" /></Link><Link to={`/administrativo/editar/aluno/${aluno.usuarioCodigo}`}><FaUserEdit color="aqua" /></Link></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
            <button hidden type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button>
            <div className='modal-incricao-presencial modal-parabens' ref={ref2}>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h3>{nomePresenca}</h3>
                                <hr />
                                <input type="date" className="form-control" onChange={(e) => { setDateAluno(e.target.value) }} value={dateAluno} /><br />
                                <select className="form-control" value={statusPresenca} onChange={(e) => { setStatusPresenca(e.target.value) }}>
                                    <option value="">Nenhum status selecionado</option>
                                    <option value="1">Presente</option>
                                    <option value="2">Falta</option>
                                    <option value="3">Falta Justificada</option>
                                    <option value="4">Atrasado</option>
                                </select>
                                <label>Observação</label>
                                <input type="text" placeholder="Digite uma observação" className="form-control" onChange={(e) => { setObservacao(e.target.value) }} value={observacao} />
                                <br />
                                <button class="btn btn-success" onClick={handlePostPresenca}>Marcar Presença</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}