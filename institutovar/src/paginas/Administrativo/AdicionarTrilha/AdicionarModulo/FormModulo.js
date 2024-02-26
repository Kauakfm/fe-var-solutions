import React, { useState } from "react";
import '../adicionartrilha.css';
import HeaderAluno from "../../../../componentes/HeaderAluno";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function FormModulo() {
    const [titulo, setTitulo] = useState('');


    const handlePostCourse = async () => {
        try {
            api.post("Curso/InserirModulo", {
                titulo: titulo,

            }).then((response) => {
                if (response.status = 200)
                    toast.success("Módulo salvo com sucesso!")
            })
        }
        catch (error) {
            toast.error("Algo deu errado.")
        }
    }
    return (
        <>
            <HeaderAluno />
            <div className="body-form-curso">
                <div className="left">
                    <Link to={`/administrativo/cursos/modulos`}><BsArrowLeftCircleFill /> Voltar</Link>
                </div>
                <form className="row w-50" onSubmit={(e) => {
                    e.preventDefault();
                    handlePostCourse();
                }}>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Título do módulo:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Digite o título do módulo' onChange={(e) => { setTitulo(e.target.value) }} />

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