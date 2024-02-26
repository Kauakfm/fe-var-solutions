import { IoPlayCircleOutline } from "react-icons/io5";
import './aulas.css';
import { useEffect, useState } from 'react';
import api from "../../services/api"

export default function Aulas(props) {
    const [trilhaAula, setTrilha] = useState([]);
    const { cursoid } = props

    const getTrilhaAula = async () => {
        try {
            const response = await api.get('/Curso/aulasCursoPorId/' + cursoid);
            setTrilha(response.data);
        } catch (error) {

        }
    };


    useEffect(() => {
        props.getAulaConcluida();
        getTrilhaAula();
    }, []);

    const setAula = (aula) => {
        let urlaula = '';
        if (aula.urlAulapanda)
            urlaula = window.localStorage.getItem("26") ? aula.urlAula : aula.urlAulapanda
        else
            urlaula = aula.urlAula
        props.setAula({
            codigo: aula.codigo,
            descricao: aula.descricao,
            detalhe: aula.detalhe,
            urlAula: urlaula,
            isAtivo: aula.isAtivo,
            dataCadastro: aula.dataCadastro,
            tempoVideoSegundos: aula.tempoVideoSegundos,
            arquivo: aula.arquivo,
            isDesafio: aula.isDesafio
        }
        );
        props.handleFileAula(aula.codigo);
    }
    const acharaulaconcluida = (aulaid) => {
        return props.aulaConcluida.find(x => x.aulaId === aulaid)
    }

    const marcarAulaIniciada = async (aulaid) => {
        await api.get('/Curso/obterAulaIniciada/' + aulaid);
    }

    return (
        <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
                <p className="accordion-header">
                    {trilhaAula.map((modulo, i) => {
                        return (
                            <>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#" + i} aria-expanded="true" aria-controls={i}>{modulo.nome}</button>
                                <div id={i} className="accordion-collapse collapse">
                                    {modulo.aulas.map((aula) => {
                                        const achou = acharaulaconcluida(aula.codigo)
                                        return (
                                            <div onClick={() => {
                                                setAula(aula)
                                                marcarAulaIniciada(aula.codigo)
                                            }}>
                                                <div className="accordion-body-trilha accordion-body">
                                                    <IoPlayCircleOutline color={achou == null ? "#000" : "#312a53"} />
                                                    <p>{aula.descricao}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    })
                    }
                </p>
            </div>
        </div>
    )
}