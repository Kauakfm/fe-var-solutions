import React, { useEffect, useState } from "react";
import '../administrativo.css'
import HeaderAluno from "../../../componentes/HeaderAluno";
import api from "../../../services/api";
import { Link } from "react-router-dom";

export default function Vagas() {
    const [vagas, setVagas] = useState([]);
    const handleGetVagas = async () => {
        api.get("administrativo/ObterVagas").then((response) => {
            setVagas(response.data);
        });
    }
    useEffect(() => {
        handleGetVagas();
    }, [])

    return (
        <div className="body-administrativo">
            <HeaderAluno />
            <main>
                <nav aria-label="breadcrumb" style={{marginBottom: '3%'}}>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/home`}>Administrativo</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Presença</li>
                    </ol>
                </nav>

                <div className="table-container">
                    <table class="table table-info table-dark table-striped table-hover table-striped" id="tabela">
                        <thead>
                            <tr>
                                <th scope="col">Vagas</th>
                                <th scope="col">Lista de Espera</th>
                                <th scope="col">Turma</th>
                                <th scope="col">Convocados</th>
                                <th scope="col">Alunos (total)</th>
                                <th scope="col">Vagas com Note</th>
                            </tr>
                        </thead>

                        <tbody>
                            {vagas.sort((item, item2) => {
                                if (item.descricao < item2.descricao)
                                    return -1;
                            }).map((vaga) => {
                                return (
                                    <tr>
                                        <td>{vaga.vagas}</td>
                                        <td>{vaga.qtdEspera}</td>
                                        <td>{vaga.descricao}</td>
                                        <td>{vaga.qtdConvocados}</td>
                                        <td>{vaga.qtdAlunos}</td>
                                        <td>{vaga.vagasComNote}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}