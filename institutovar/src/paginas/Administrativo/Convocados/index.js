import React, { useEffect, useState } from "react";
import '../administrativo.css'
import HeaderAluno from "../../../componentes/HeaderAluno";
import api from '../../../services/api';
import { async } from "q";
import { awaitExpression } from "@babel/types";
import { isUndefined } from "util";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import {FaUserEdit} from 'react-icons/fa';
import {BsInfoCircleFill} from 'react-icons/bs';
import {IoLogoWhatsapp} from 'react-icons/io';
import {FaAngleLeft, FaAnglesLeft} from 'react-icons/fa6';

export default function Convocados() {
    const [codTurma, setTurma] = useState('')
    const [convocados, setConvocados] = useState([])
    const [loading, setloading] = useState(true);


    const handleEscolherTurma = (e) => {
        const selectedValue = e.target.value;
        const intvalue = parseInt(selectedValue)
        setTurma(intvalue);
        setloading(true)
        handleConvocados(intvalue);
    }

    const handleEnviou = async (id) => {
        try {
            const response = await api.post(`Administrativo/MensagemEnviada/${id}`)
            if(response.status === 200)
            {
                toast.success(response.data.mensagem)
            }
        } catch (error) {
             toast.warn("Não foi possivel marcar como enviada contate o suoporte")
        }
    }
    const handleRejeitar = async (id) => {
        try {
            const response = await api.post(`Administrativo/ReprovarAlunoListaEspera/${id}`)
            if (response.status === 200) {
                toast.success(response.data.mensagem)
            }
        } catch (error) {
            toast.warn("Houve algum problema na hora de rejeitar.")
        }
    }
    const handleEspera = async (id) => {
        try {
            const response = await api.put(`Administrativo/VoltarParaListaEspera/${id}`)
            if (response.status === 200) {
                toast.success(response.data.mensagem)
            }
        } catch (error) {
            toast.warn("Houve algum problema após voltar para lista de espera.")
        }
    }
    const handleConvocados = async (intValue) => {
        try {
            if (!isUndefined(intValue))
                await api.get(`/Administrativo/ObterConvocados/${intValue}`).then((response) => {
                    setloading(false)
                    setConvocados(response.data)
                })
            else
                await api.get(`/Administrativo/ObterConvocados/`).then((response) => {
                    setloading(false)
                    setConvocados(response.data)
                })
        } catch (error) {

        }
    }

    useEffect(() => {
        handleConvocados();
    }, [])



    return (
        <div className="body-administrativo">
            <HeaderAluno />
            <main>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/home`}>Administrativo</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Convocados</li>
                    </ol>
                </nav>

                <div className='select-espera'>
                    <select id="codTurma" name="codTurma" required value={codTurma} onChange={handleEscolherTurma} >
                        <option value="0">Selecione uma turma</option>
                        <option value="5">Seg - Qua (Manhã)</option>
                        <option value="8">Ter - Qui (Manhã)</option>
                        <option value="6">Seg - Qua (Tarde)</option>
                        <option value="9">Ter - Qui (Tarde)</option>
                        <option value="7">Seg - Qua (Noite)</option>
                        <option value="13">Ter - Qui (Noite)</option>
                        <option value="12">Sábado (Integral)</option>
                    </select>
                </div>

                {loading == true ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15%' }}><div style={{ width: '3rem', height: '3rem' }} class="text-light spinner-border-sm spinner-border" role="status"></div></div> :
                    <div className="table-container">
                        <table class="table table-info table-dark table-striped table-hover table-striped" id="tabela">
                            <thead>
                                <tr>
                                    <th>Baia</th>
                                    <th>Nome</th>
                                    <th>Email enviado</th>
                                    <th>Tem até...</th>
                                    <th></th>
                                    <th></th>
                                    <th>Não veio</th>
                                    <th>Enviar mensagem</th>
                                    <th>Marcar como envida</th>
                                </tr>
                            </thead>
                            <tbody className="tbody-espera">
                                {convocados.map((convo) => {
                                    const dataAtual = new Date(convo.dataEmailEnviado);
                                    dataAtual.setDate(dataAtual.getDate() + 7);
                                    const novaDataFormatada = dataAtual.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                                    const mensagemWhatsapp =
                                        "Olá, *" + convo.nome + "*. \n" +
                                        "Gostaríamos de informar que você foi selecionado(a) para iniciar na turma " + convo.turma + "*.\n" +
                                        " Na turma que você selecionou, você estará alocado na baia *" + convo.posicao + "*.\n" +
                                        " * O prazo para concluir a sua matrícula é até " + novaDataFormatada + "*.\n" +
                                        " Por favor, compareça até essa data no Instituto VAR Solutions localizado em *" + convo.localizacao + "*.\n" +
                                        " Caso você seja menor de 18 anos, é obrigatório estar acompanhado de seus pais ou de um responsável legal.\n\n" +

                                        " *Para completar o processo de inscrição, solicitamos que traga os seguintes documentos:*\n" +
                                        " *Documento de Identificação (RG e CPF) e* \n" +
                                        " *comprovante de Residência (conta de água, luz ou telefone em nome do aluno ou responsável legal).*\n" +
                                        "  Se menor de 18 anos, um dos pais ou responsável legal também deve apresentar o documento de identificação.\n\n" +

                                        " *A entrega dos documentos acima é necessária para validar a sua inscrição.*\n\n" +
                                        " Lembramos que nosso horário de funcionamento é de Segunda a Sábado, das 09h00 h até às 17h00.\n\n" +
                                        " *Em caso de dúvidas, entre em contato conosco por esta conversa* e nossa equipe te responderá.\n\n" +
                                        " Agradecemos pela confiança e te esperamos pela maior aventura tecnológica!";
                                return (
                                        <tr>
                                            <td>{convo.posicao}</td>
                                            <td>{convo.nome}</td>
                                            <td style={{textAlign: 'center'}}>{new Date(convo.dataEmailEnviado).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                            <td>{novaDataFormatada}</td>
                                            <td><Link to={`/administrativo/detalhes/aluno/${convo.codigo}`}><BsInfoCircleFill color="aqua" /></Link></td>
                                            <td><Link to={`/administrativo/editar/aluno/${convo.codigo}`}><FaUserEdit color="aqua" /></Link></td>
                                            <td style={{textAlign: 'center'}}>{convo.isJaVeio == false ?
                                                <FaAngleLeft onClick={() => { handleEspera(convo.codigo) }}  color="red"/> :
                                                <FaAnglesLeft onClick={() => { handleRejeitar(convo.codigo) }} color="red"/>}
                                            </td>
                                            <td style={{textAlign: 'center'}}>{convo.isMensagemEnviada == false ? <IoLogoWhatsapp href={`https://api.whatsapp.com/send?phone=${convo.telefone}&text=${mensagemWhatsapp}`} data-codigo={convo.codigo} target="_blank" id="botaoEnviar" title="Enviar mensagem?" style={{fontSize: '24px'}}/> 
                                            : <IoLogoWhatsapp color="#007200" style={{fontSize: '24px'}}/>}</td>
                                            <td>{convo.isMensagemEnviada == false ? 
                                            <button className="btn btn-success" type="submit" onClick={() => {handleEnviou(convo.codigo) }}>Enviou?</button> 
                                            : <button className="btn btn-danger">Enviou!</button>}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </main>

        </div>
    )
}