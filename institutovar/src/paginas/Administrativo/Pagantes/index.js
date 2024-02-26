import React, { useEffect, useRef, useState } from "react";
import '../administrativo.css'
import HeaderAluno from "../../../componentes/HeaderAluno";
import api from '../../../services/api';
import { async } from "q";
import { awaitExpression } from "@babel/types";
import { isUndefined } from "util";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import logomodal from '../../../imagens/var/icon192.png';

export default function Pagantes() {
    const ref = useRef(null);
    const [loading, setloading] = useState(true);
    const [codTurma, setTurma] = useState('')
    const [pagantes, setPagantes] = useState([])
    const [selectedID, setSelectedID] = useState(null);
    const [formaPag, setFormaPag] = useState('1');
    const [dataLiquidacao , setDataLiquidacao] = useState('');
    const [valorPago, setValorPago] = useState('');
    const [observacao, setObservacao] = useState('');
    const [usuarioBaixa , setUsuarioBaixa] = useState(window.localStorage.getItem("usr_id"))


    const handleObservacao = (e) => {
        setObservacao(e.target.value);
    }
    const handleValorPago = (e) => {
        const selectedValue = e.target.value;
        let cleanedValue = selectedValue.replace(/[^0-9.]/g, '');
        if (cleanedValue == '')
            return;
        cleanedValue = parseInt(cleanedValue).toString()
        if (cleanedValue.length < 2)
            cleanedValue = `00${cleanedValue}`
        if (cleanedValue.length < 3)
            cleanedValue = `0${cleanedValue}`

        const numberValue = cleanedValue.split("");

        let valor = ''
        numberValue.map((x, i) => {
            if (numberValue.length - 1 == i + 1) {
                valor += ','
            }
            valor += x;
        })
        setValorPago(valor);
    }

    const handleForma = (e) =>{
        const evento = e.target.value;
        const numero = parseInt(evento);
        setFormaPag(numero);
    }

    const handleDataLiquidacao = (e) => {
        setDataLiquidacao(e.target.value)
    }


    const handleEscolherTurma = (e) => {
        const selectedValue = e.target.value;
        const intvalue = parseInt(selectedValue)
        setTurma(intvalue);
        setloading(true)
        handlePagantes(intvalue)
    }

    const handleDarBaixaClick = (event) => {
        const id = event.target.getAttribute('data-id');
        const int = parseInt(id)
        setSelectedID(int);
        
    };

    const handleDarBaixa = async (selectedID) => {
        try {
            await api.put(`Administrativo/DarBaixa/${selectedID}`, {
                formaPagamento : formaPag, dataLiquidacao : dataLiquidacao, valorPago : Number(valorPago.replace(",", ".")), observacao : observacao, usuarioBaixa : usuarioBaixa
            });
        } catch (error) {
            
        }
    }

    const handlePagantes = async (id) => {
        try {
            if (!isUndefined(id))
                await api.get(`Administrativo/ObterPagantes/${id}`).then((response) => {
                    setloading(false)
                    setPagantes(response.data);
                })
            else
                await api.get(`Administrativo/ObterPagantes/`).then((response) => {
                    setloading(false)
                    setPagantes(response.data);
                })
        } catch (error) {

        }
    }
    useEffect(() => {
        handlePagantes();
    }, [])

    return (
        <div className="body-administrativo">
            <HeaderAluno />
            <main>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/home`}>Administrativo</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Lista de pagantes</li>
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
                                    <th>Codigo</th>
                                    <th>Nome</th>
                                    <th>Mensalidade</th>
                                    <th>Data vencimento</th>
                                    <th>Dar baixa</th>
                                </tr>
                            </thead>
                            <tbody className="tbody-espera">
                                {pagantes.map((pag) => {
                                    return (
                                        <tr>
                                            <td>{pag.codigo}</td>
                                            <td>{pag.nome}</td>
                                            <td>R${pag.mensalidade}.00</td>
                                            <td>{new Date(pag.dataVencimento).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                            <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" data-id={pag.codigo} onClick={handleDarBaixaClick}>Dar baixa</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }

                <div class="modal-incricao-presencial modal-parabens modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body">
                                <img src={logomodal} />
                                <h5 style={{ textAlign: "center" }}>Preencha os campos para dar baixa!</h5>
                                <form style={{ display: "flex", flexDirection: "column", width: "20vw" }}>
                                    <div class="mb-7" style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                        <label class="col-form-label">Data liquidação:</label>
                                        <input type="date" class="form-control" style={{ width: "20vw" }} value={dataLiquidacao} onChange={handleDataLiquidacao} />
                                    </div>
                                    <div class="mb-7" style={{ display: "flex", flexDirection: "column", width: "20vw", alignItems: "start" }}>
                                        <label class="col-form-label">Selecione a forma de pagamento:</label>
                                        <select className='form-control' value={formaPag} onChange={handleForma}>
                                            <option value="1">Pix</option>
                                            <option value="2">Débito</option>
                                            <option value="3">Crédito</option>
                                            <option value="4">Dinheiro</option>
                                        </select>
                                    </div>
                                    <div class="mb-7" style={{ display: "flex", flexDirection: "column", width: "20vw", alignItems: "start" }}>
                                        <label class="col-form-label">Valor pago:</label>
                                        <input type="text" class="form-control" value={valorPago} onChange={handleValorPago}/>
                                    </div>
                                    <div class="mb-7" style={{ display: "flex", flexDirection: "column", width: "20vw", alignItems: "start" }}>
                                        <label class="col-form-label">Observação:</label>
                                        <input type="text" class="form-control" value={observacao} onChange={handleObservacao} />
                                    </div>
                                </form>
                                <div style={{ marginTop: "20px" }}>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style={{ marginRight: "8px" }}>Sair</button>
                                    <button type="button" class="btn btn-success" style={{ marginLeft: "8px" }} onClick={() => {handleDarBaixa(selectedID)}}>Dar baixa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}