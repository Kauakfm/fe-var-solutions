import { useEffect, useState } from "react";
import api from "../../../services/api";
import HeaderAluno from "../../../componentes/HeaderAluno";
import { toast } from "react-toastify";

export default function VincularCursos() {
    const [unidades, setUnidades] = useState([])
    const [cursos, setCursos] = useState([])

    const [cursoSelecionado, setCursoSelecionado] = useState("")
    const [unidadeSelecionada, setUnidadeSelecionada] = useState("")

    useEffect(() => {
        handleGetCourses()
        handleGetUnidade()
    }, [])

    const handleGetUnidade = async () => {
        try {
            await api.get("administrativo/BuscarUnidades").then((response) => {
                setUnidades(response.data);
            });
        }
        catch (error) {

        }
    }
    const handleGetCourses = async () => {
        try {
            await api.get("curso/ObterCursos").then((response) => {
                setCursos(response.data);
            });
        }
        catch (error) {

        }
    }

    const VincularCurso = () => {
        try{

            api.post("Administrativo/VincularCursoUnidade", {
                codigoUnidade: cursoSelecionado,
                cursoCodigo: unidadeSelecionada
            }).then((response) => {
                toast.success("Curso vinculado com sucesso!")                
            })
        }
        catch(error){
            toast.error("Não foi possivel vincular o curso")
        }
    }

    return (
        <div className="body-administrativo">
            <HeaderAluno espera={true} />
            <main>
                <h1 style={{paddingBottom:"3%", paddingTop:"6%"}}>Vincular Cursos</h1>
                <div style={{ display: "flex", gap: "10px"}}>
                    <div id='header-web' className="btn-adm dropdown">
                        <div className='presencial-input'>
                            <select onChange={(e) => {setUnidadeSelecionada(e.target.value)}}>
                                <option> Selecione uma unidade</option>
                                {unidades.map((unidade) => {
                                        return (
                                            <option key={unidade.codigo} value={unidade.codigo}>{unidade.descricao}</option>
                                        )
                                    })}
                            </select>
                        </div>


                    </div>

                    <div id='header-web' className="btn-adm dropdown" style={{paddingBottom:"3%"}}>
                        <div className='presencial-input'>
                            <select onChange={(e) => {setCursoSelecionado(e.target.value)}}>
                                <option> Selecione um curso</option>
                               {cursos.map((curso) => {
                                return (
                                    <option value={curso.codigo}>{curso.descricao}</option>
                                )
                               })}
                            </select>
                        </div>
                    </div>
                </div>
                
                <button onClick={VincularCurso} class="btn btn-success" style={{width:"30%"}}>Vincular</button>
            </main>
        </div>
    )
}