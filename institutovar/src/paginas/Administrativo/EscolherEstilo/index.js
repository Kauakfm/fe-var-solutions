import HeaderAluno from "../../../componentes/HeaderAluno";
import api from "../../../services/api";
import React, { useEffect, useState } from "react";
import '../SobreUnidade/SobreUnidade.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EscolherEstilo() {
    const [estilos, setEstilos] = useState([]);
    const handleGetStyles = async () => {

        api.get("Estilizacao/ObterTodosEstilosCSS").then((response) => {
            try {
                setEstilos(response.data);
            }
            catch (error) {
                toast.error("Erro ao obter estilos.");
            }
        })
    }
    const handleActiveStyle = async (codigoEstilo) => {
        api.put("Estilizacao/AlterarLayoutFront/" + codigoEstilo).then((response) => {
            try {
                if (response.status == 204)
                    toast.success("Estilo ativado com sucesso!");
                else
                    toast.warn("Algo deu errado.");
            }
            catch (error) {
                toast.error("Erro ao ativar estilo.");
            }
            finally{
                handleGetStyles();
            }
        })
    }

    useEffect(() => {
        handleGetStyles();
    }, [])
    return (
        <div className="body-administrativo">

            <HeaderAluno espera={true} />

            <main>

                <h1>Estilos do Site</h1>
                <div className="table-container">
                    <table class="table table-info table-dark table-striped table-hover table-striped" id="tabela">
                        <thead>
                            <tr>
                                <th>Estilo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estilos.map((estilo) => (
                                <tr key={estilo.codigo}>
                                    <td>{estilo.descricao}</td>
                                    {estilo.isAtivo ?
                                        <td><button className="btn btn-success">Ativado</button></td>
                                        :
                                        <td><button className="btn btn-secondary" onClick={() => handleActiveStyle(estilo.codigo)}>Ativar</button></td>
                                    }


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main >
        </div >
    )
}