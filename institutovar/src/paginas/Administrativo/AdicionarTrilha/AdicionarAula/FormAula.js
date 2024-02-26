import React, { useEffect, useState } from "react";
import '../adicionartrilha.css';
import HeaderAluno from "../../../../componentes/HeaderAluno";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function FormAula() {
    const [titulo, setTitulo] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [urlAula, setUrlAula] = useState('');
    const [isAtivo, setIsAtivo] = useState(true);
    const [tempoVideoSegundos, setTempoVideoSegundos] = useState('');
    const [moduloAula, setModuloAula] = useState('');
    const [urlPandaAula, setUrlPandaAula] = useState('');
    const [modulos, setModulos] = useState([]);

    const handlePostAula = async () => {
        try {
            api.post("Curso/InserirAula", {
                descricao: titulo,
                detalhe: detalhes,
                urlAula: urlAula,
                isAtivo: isAtivo,
                tempoVideoSegundos: parseInt(tempoVideoSegundos),
                moduloId: parseInt(moduloAula),
                urlAulaPanda: urlPandaAula


            }).then((response) => {
                if (response.status = 204)
                    toast.success("Aula salva com sucesso!");
            })
        }
        catch (error) {
            toast.error("Algo deu errado.");
        }
    }
    const handleGetModule = async () => {
        api.get("Curso/ObterModulos").then((response) => {
            setModulos(response.data);
        })
    }
    useEffect(() => {
        handleGetModule();
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
                    handlePostAula();
                }}
                    style={{ maxWidth: "80%" }}>

                    <div className="col-md-6">
                        <label>Título da aula:</label>
                        <div className='presencial-input'>
                            <input type="text" required placeholder='Digite o título da aula' value={titulo} onChange={(e) => { setTitulo(e.target.value) }} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label>Url do Youtube:</label>
                        <div className='presencial-input'>
                            <input type="text" required placeholder='Precisa ser o link do Iframe' value={urlAula} onChange={(e) => { setUrlAula(e.target.value) }} />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label>Detalhes:</label>
                        <div style={{ marginBottom: "2%" }}>
                            <textarea style={{ color: "black", height: "100px" }} required type="text" placeholder='Digite os detalhes do aula' value={detalhes} onChange={(e) => { setDetalhes(e.target.value) }} ></textarea>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="centerSwitch">
                            <div class="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={isAtivo} onChange={() => { setIsAtivo(!isAtivo) }} />
                                <label className="form-check-label" for="flexSwitchCheckDefault">Aula Ativa</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label>Tempo em Segundos:</label>
                        <div className='presencial-input'>
                            <input type="text" required placeholder='Digite o tempo em segundos do vídeo' value={tempoVideoSegundos} onChange={(e) => { setTempoVideoSegundos(e.target.value.replace(/[^\d]+/g, "")) }} />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <label>Módulo da aula:</label>
                        <div className='presencial-input'>
                            <select style={{ color: "black" }} onChange={(e) => { setModuloAula(e.target.value) }}>
                                {modulos.length > 0 ? modulos.map((modulo) => {
                                    return (
                                        <option value={modulo.codigo}>{modulo.descricao}</option>
                                    )
                                })
                                    :
                                    <option value={0}>Não tem módulo cadastrado</option>
                                }
                            </select>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label>Url do PandaVideo:</label>
                        <div className='presencial-input'>
                            <input type="text" placeholder='Precisa ser o link do Iframe' value={urlPandaAula} onChange={(e) => { setUrlPandaAula(e.target.value) }} />
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