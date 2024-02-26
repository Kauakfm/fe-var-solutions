import React, { useEffect, useState } from "react";
import './meuscertificados.css';
import HeaderAluno from "../../componentes/HeaderAluno";
import api from "../../services/api";
import { Link } from "react-router-dom";
import {BsInfoCircle} from 'react-icons/bs';
import award from '../../imagens/icon/award.png';

export default function MeusCertificados() {
    const [obterCertificados , setObterCertificados] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleCertificados = async () => {
        try {
            const response = await api.get(`/Certificado/ObterCertificados`).then((response) => {
                setObterCertificados(response.data);
                setIsLoading(false);
            });
        } catch (error) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleCertificados();
    }, []);

    return (
        <>
            <HeaderAluno />
            <div className="body-certificados">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/dashboard`}>Dashboard</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Meus certificados</li>
                    </ol>
                </nav>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15%' }}>
                        <div style={{ width: '3rem', height: '3rem' }} className="text-light spinner-border-sm spinner-border" role="status"></div>
                    </div>
                ) : obterCertificados.length === 0 ? (
                    <h2><BsInfoCircle/> Você ainda não obteve nenhum certificado!</h2>
                ) : (
                    <div>
                        <h3>Meus Certificados:</h3>
                        {obterCertificados.map((certi) => (
                            <section className="card-certificado" key={certi.id}>
                                <img src={award}/>
                                <div>
                                    <h6>{certi.nomeModulo}</h6>
                                    <p>{certi.modulo}</p>
                                    <span>{certi.dataConclusao.split('T')[0].split('-').reverse().join('/')}</span>
                                </div>
                                <a href={certi.urlCertificado} target='_blank'>
                                <button className="btn btn-primary">BAIXAR CERTIFICADO</button>
                                </a>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
