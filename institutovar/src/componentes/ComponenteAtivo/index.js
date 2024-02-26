import '../../paginas/HomeAluno/homealuno.css';
import { Link } from 'react-router-dom';
import { IoPlayCircleOutline } from "react-icons/io5";
import api from "../../services/api"
import { useEffect, useState } from 'react';

export default function ComponenteAtivo() {

    const [AulaConcluida, setAulaConcluida] = useState();
    const getAulaConcluida = async () => {
        try {
            await api.get('/Curso/obterConcluidos').then((response) => {
                getultimaaulavista(response.data[response.data.length - 1].aulaId)
            })
        } catch (error) {
            
        }
    };
    const getultimaaulavista = async (id) => {
        try {
            await api.get('/Curso/obterAulaId/' + id).then((response) => {
                setAulaConcluida(response.data)
            })
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getAulaConcluida()
    }, [])
    return (
        <Link className="box1-home" to={`/trilha`}>
            <p><IoPlayCircleOutline />CONTINUAR TRILHA</p>
            <p style={{textAlign: 'end'}}>{AulaConcluida == null ? "" : AulaConcluida.descricao}</p>
        </Link>
    )
}