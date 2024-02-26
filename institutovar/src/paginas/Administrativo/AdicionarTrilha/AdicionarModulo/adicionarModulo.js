import React, { useEffect, useState } from "react";
import '../adicionartrilha.css';
import HeaderAluno from "../../../../componentes/HeaderAluno";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

export default function AdicionarModulo() {
    const [modulos, setModulos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleGetModulos();
    }, [])
    const handleGetModulos = () => {
        try {
            setLoading(true);
            api.get("Curso/ObterModulos").then((response) => {
                setModulos(response.data);
            })
        }
        catch (error) {
            toast.error("Erro ao obter módulos");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <HeaderAluno />
            <div className="body-add-curso">
                <h1>Módulos</h1>
                <br />
                <div className='body-buttons'>
                    <Link to={`/administrativo/cursos`} className='btn-addd'><button className="btn-add"> Ver curso</button></Link>
                    <Link to={`/administrativo/cursos/modulos/adicionar`} className='btn-addd'><button className="btn-add"><IoAdd /> Adicionar módulo</button></Link>
                    <Link to={`/administrativo/cursos/aulas`} className='btn-addd'><button className="btn-add"> Ver aulas</button></Link>
                </div>

                <div className='article-trilha-modulo'>
                    {loading == true ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', justifySelf: "center", height: '50vh' }}><div style={{ width: '3rem', height: '3rem' }} class="text-light spinner-border-sm spinner-border" role="status"></div></div> : ""}
                    {modulos.map((modulo, i) => {
                        return (
                            <article key={modulo.codigo}>
                                <div className="body-trilha">
                                    <div className="box-trilha">
                                        <div className="box-trilha-conteudo-modulo">
                                            <h1>{modulo.descricao}</h1>
                                        </div>
                                    </div>
                                </div>
                            </article>

                        )
                    })}
                </div>
            </div >
        </>
    )
}