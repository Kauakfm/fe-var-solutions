import React, { useEffect, useState } from "react";
import '../adicionartrilha.css';
import HeaderAluno from "../../../../componentes/HeaderAluno";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { Link } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";

export default function VincularAula() {
    const [cursoId, setCursoId] = useState('');
    const [aulaId, setAulaId] = useState('');
    const [ordem, setOrdem] = useState('');

    const [cursos, setCursos] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [qtdAulas, setQtdAulas] = useState(0);


    const handlePostCourse = async () => {
        try {
            api.post("Curso/VincularAulaCurso", {
                aulaCodigo: aulaId,
                cursoCodigo: cursoId,
                ordem: ordem
            }).then((response) => {
                if (response.status = 200)
                    toast.success("Aula vinculada com sucesso!")
            })
        }
        catch (error) {
            toast.error("Algo deu errado.")
        }
    }
    const handleGetAulas = async () => {
        api.get("Curso/ObterTodasAulas").then((response) => {
            setAulas(response.data);
            setAulaId(response.data[0].codigo)
        })
    }
    const handleGetCourses = async () => {
        api.get("Curso/ObterCursos").then((response) => {
            setCursos(response.data);
            handleGetQtdAulas(response.data[0].codigo)
            setCursoId(response.data[0].codigo)

        })
    }
    const handleGetQtdAulas = async (id) => {
        api.get("Curso/ObterQtdAulas/" + id).then((response) => {
            setQtdAulas(response.data.qtdAulas);
        })
    }
    useEffect(() => {
        handleGetCourses();
        handleGetAulas();
    }, [])
    return (
        <>
            <HeaderAluno />
            <div className="body-form-curso">
                <div className="left">
                    <Link to={`/administrativo/cursos/aulas`}><BsArrowLeftCircleFill /> Voltar</Link>
                </div>
                <form className="row" onSubmit={(e) => {
                    e.preventDefault();
                    handlePostCourse();
                }}>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Curso:</label>
                            <div className='presencial-input'>
                                <select onChange={(e) => {
                                    setCursoId(e.target.value);
                                    handleGetQtdAulas(e.target.value)
                                }}
                                value={cursoId}>
                                    {cursos.length > 0 ? cursos.map((curso) => {
                                        return (
                                            <option value={curso.codigo}>{curso.descricao}</option>
                                        )
                                    })
                                        :
                                        <option value={0}>Não tem curso cadastrado</option>
                                    }
                                </select>                                
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>Aula:</label>
                            <div className='presencial-input'>
                                <select onChange={(e) => { setAulaId(e.target.value) }}
                                value={aulaId}>
                                    {aulas.length > 0 ? aulas.map((aula) => {
                                        return (
                                            <option value={aula.codigo}>{aula.descricao}</option>
                                        )
                                    })
                                        :
                                        <option value={0}>Não tem aula cadastrada</option>
                                    }
                                </select>

                            </div>
                        </div>
                        <h5>Qtd de Aulas do Curso: {qtdAulas}</h5>
                        <div className="col-md-12">
                            <label>Ordem:</label>
                            <div className='presencial-input'>
                                <input type="text" required placeholder='Digite a posição que você quer o vídeo' value={ordem} onChange={(e) => { setOrdem(e.target.value.replace(/[^\d]+/g, "")) }} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn btn-success" type="submit">Enviar</button>
                    </div>
                </form >
            </div >

        </>
    )
}