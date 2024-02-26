import { useEffect,useState } from "react";
import api from "../../../services/api";
import HeaderAluno from "../../../componentes/HeaderAluno";
import { useNavigate } from "react-router-dom";

export default function CursosVinculados() {
    const [retorno, setRetorno] = useState([])
    const navigate = useNavigate();

    useEffect(() =>{
        api.get('Administrativo/BuscarUnidadesVinculadas')
            .then(function (response) {
                setRetorno(response.data)                
            })
            .catch(function (error) {                
            })
    }, [])

    const handleTrocaPagina = () => {
        navigate('/administrativo/vincularCursos');
    };


    return (
        <div className="body-administrativo">
            <HeaderAluno espera={true} />
            <main>

                <h1>Cursos Vinculados</h1>
                <div className='body-buttons'>
                    <button className="btn btn-primary" onClick={handleTrocaPagina}>Vincular cursos</button>
                </div>
                <div className="table-container">
                    <table class="table table-info table-dark table-striped table-hover table-striped" id="tabela">
                        <thead>
                            <tr>
                                <th>Unidade</th>
                                <th>Curso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {retorno.map((response) => (
                                <tr key={response.codigo}>
                                    <td>{response.unidade}</td>
                                    <td>{response.curso}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}