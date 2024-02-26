import semimagem from '../../../../imagens/semimagem.jpg'

import React from "react";
import '../adicionartrilha.css';
import HeaderAluno from "../../../../componentes/HeaderAluno";

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../../../services/api";
import { IoTime, IoCalendar, IoDocuments, IoAdd } from "react-icons/io5"
import { toast } from 'react-toastify';

export default function AdicionarCurso() {
    const [trilha, setTrilha] = useState([]);
    const [loading, setloading] = useState(true);

    
    const getTrilha = async () => {
        try {
            await api.get('/Curso/ObterCursos').then((response) => {
                setTrilha(response.data)
                setloading(false)
            })
        }
        catch (error) {

        }
    }
    const GetModulosLength = (props) => {
        const [modulosCount, setModulosCount] = useState(null);

        useEffect(() => {
            api.get("Curso/aulasCursoPorId/" + props.aulaId)
                .then((response) => {
                    const len = response.data.length;
                    setModulosCount(len);
                })
                .catch((error) => {
                });
        }, [props.aulaId]);

        if (modulosCount === null) {
            return (
                <div>
                    <p>Quantidade de módulos</p>
                    <span>Carregando...</span>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Quantidade de módulos</p>
                    <span>{modulosCount}</span>
                </div>
            );
        }
    }
    useEffect(() => {
        getTrilha();
    }, []);

    return (
        <>
            <HeaderAluno />
            <div className="body-add-curso">
                <h1>Cursos</h1>

                <div className='body-buttons'>
                    <Link to={`/administrativo/cursos/adicionar`} className='btn-addd'><button className="btn-add"><IoAdd /> Adicionar curso</button></Link>
                    <Link to={`/administrativo/cursos/modulos`} className='btn-addd'><button className="btn-add"> Ver módulo</button></Link>
                    <Link to={`/administrativo/cursos/aulas`} className='btn-addd'><button className="btn-add">Ver aulas</button></Link>
                </div>
                <div className='article-trilha'>
                    {loading == true ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: "center", height: '50vh' }}><div style={{ width: '3rem', height: '3rem' }} class="text-light spinner-border-sm spinner-border" role="status"></div></div> : ""}
                    {trilha.map((curso, i) => {
                        const data = new Date(curso.atualizadoem)
                        return (
                            <article key={curso.codigo}>
                                <div className="body-trilha">
                                    <div className="box-trilha">
                                        <img src={!curso.logo ? semimagem : `https://api.varsolutions.com.br/CursosVar/${curso.logo}`} alt='Capa do módulo' />
                                        <div className="box-trilha-conteudo">
                                            <h1>{curso.descricao}</h1>
                                            <p>{curso.detalhes}</p>
                                        </div>

                                        <div className="box-trilha-box">
                                            <div className='div-trilha-itens'>
                                                <div className='div-trilha-item'>
                                                    <IoTime />
                                                    <div>
                                                        <p>Carga horária</p>
                                                        <span>{curso.cargaHoraria ? `${curso.cargaHoraria}h` : `Não tem carga horária.`}</span>
                                                    </div>
                                                </div>
                                                <div className='div-trilha-item'>
                                                    <IoCalendar />
                                                    <div>
                                                        <p>Atualizado em</p>
                                                        <span>{curso.atualizadoem ? `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}` : `Não tem atualizações.`}</span>
                                                    </div>
                                                </div>
                                                <div className='div-trilha-item'>
                                                    <IoDocuments />
                                                    <GetModulosLength aulaId={curso.codigo} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </>
    )
}