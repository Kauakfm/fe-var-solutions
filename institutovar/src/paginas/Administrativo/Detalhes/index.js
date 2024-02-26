import { useEffect, useState, useRef } from "react";
import HeaderAluno from "../../../componentes/HeaderAluno";
import api from "../../../services/api";
import { Link, useParams } from 'react-router-dom';
import '../administrativo.css'

export default function Detalhes() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [ultimoAcesso, setUltimoAcesso] = useState('')
    const [dataCriacao, SetDataCriacao] = useState('')
    const [turma, setTurma] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [status, setStatus] = useState('')
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [celular, setCelular] = useState('')
    const [descricao, setDescricao] = useState('')
    const [haveNote, setHaveNote] = useState('')
    const [genero, setGenero] = useState('')
    const [rg, setRg] = useState('')
    const [cor, setCor] = useState('')
    const [uf, setUf] = useState('')
    const [haveInternetHouse, sethaveInternetHouse] = useState('')
    const [rendaFamiliar, setRendaFamiliar] = useState('')
    const [qntdPessoas, setQntdPessoas] = useState('')
    const [mensalidade, setMensalidade] = useState('')
    const [cargo, setCargo] = useState('')
    const [atividade, setAtividade] = useState('')
    const [numeroCasa, setNumeroCasa] = useState('')
    const [complemento, setComplemento] = useState('')
    const [unidade, setUnidade] = useState('')
    const [dataPagamento, setDataPagamento] = useState('')
    const { id } = useParams();

    const handleObjetos = async () => {
        try {
            await api.get(`Administrativo/ObterDetalhesAluno/${id}`).then((response) => {
                setNome(response.data[0].nome)
                setEmail(response.data[0].email)
                setSenha(response.data[0].senha)
                setUltimoAcesso(response.data[0].ultimoAcesso)
                SetDataCriacao(response.data[0].dataCriacao)
                setTurma(response.data[0].turma)
                setDataNascimento(response.data[0].dataNascimento)
                setStatus(response.data[0].status)
                setCep(response.data[0].cep)
                setRua(response.data[0].rua)
                setBairro(response.data[0].bairro)
                setCidade(response.data[0].cidade)
                setCelular(response.data[0].celular)
                setDescricao(response.data[0].descricao)
                setHaveNote(response.data[0].haveNote)
                setGenero(response.data[0].genero)
                setRg(response.data[0].rg)
                setCor(response.data[0].cor)
                setUf(response.data[0].uf)
                sethaveInternetHouse(response.data[0].haveInternetHouse)
                setRendaFamiliar(response.data[0].rendaFamiliar)
                setQntdPessoas(response.data[0].qntdPessoas)
                setMensalidade(response.data[0].mensalidade)
                setCargo(response.data[0].cargo)
                setAtividade(response.data[0].atividade)
                setNumeroCasa(response.data[0].numeroCasa)
                setComplemento(response.data[0].complemento)
                setUnidade(response.data[0].unidade)
                setDataPagamento(response.data[0].dataPagamento)
            })
        } catch (error) {

        }
    }
useEffect(() => {
handleObjetos()
},[])

    return (
        <div className="body-administrativo">
            <HeaderAluno />
            <main className="body-detalhes">
                <div className='container-daddos'>
                    <div className="row">
                        <div className="col-md-3">
                            <label>Nome completo:</label>
                            <div className="presencial-input">
                                <input type="text" value={nome} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>E-mail:</label>
                            <div className="presencial-input">
                                <input type="text" value={email}  disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>Senha:</label>
                            <div className="presencial-input">
                                <input type="text" value={senha}  disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>Turma:</label>
                            <div className="presencial-input">
                                <input type="text" value={turma} disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>Status:</label>
                            <div className="presencial-input">
                                <input type="text" value={status} disabled />
                            </div>
                        </div>


                        <div className="col-md-2">
                            <label>CEP:</label>
                            <div className="presencial-input">
                                <input type="text" value={cep} disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>UF:</label>
                            <div className="presencial-input">
                                <input type="text" value={uf} disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>Cidade:</label>
                            <div className="presencial-input">
                                <input type="text" value={cidade} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Bairro:</label>
                            <div className="presencial-input">
                                <input type="text" value={bairro} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Rua:</label>
                            <div className="presencial-input">
                                <input type="text" value={rua} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Numero residencial:</label>
                            <div className="presencial-input">
                                <input type="text" value={numeroCasa} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Complemento:</label>
                            <div className="presencial-input">
                                <input type="text" value={complemento} disabled />
                            </div>
                        </div>


                        <div className="col-md-2">
                            <label>Data de nascimento:</label>
                            <div className="presencial-input">
                                <input type="text" value={dataNascimento} disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>RG:</label>
                            <div className="presencial-input">
                                <input type="text" value={rg} disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>Celular:</label>
                            <div className="presencial-input">
                                <input type="text" value={celular} disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>Genero:</label>
                            <div className="presencial-input">
                                <input type="text" value={genero} disabled />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>Cor:</label>
                            <div className="presencial-input">
                                <input type="text" value={cor} disabled />
                            </div>
                        </div>


                        <div className="col-md-3">
                            <label>Ultimo acesso:</label>
                            <div className="presencial-input">
                                <input type="text" value={ultimoAcesso}  disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Data de Criação:</label>
                            <div className="presencial-input">
                                <input type="text" value={dataCriacao} disabled />
                            </div>
                        </div>
                        

                        <div className="col-md-2">
                            <label>Tem notebook?</label>
                            <div className="presencial-input">
                                <input type="text" value={haveNote} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Tem internet?</label>
                            <div className="presencial-input">
                                <input type="text" value={haveInternetHouse} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Cargo:</label>
                            <div className="presencial-input">
                                <input type="text" value={cargo} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Renda familiar:</label>
                            <div className="presencial-input">
                                <input type="text" value={rendaFamiliar} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Quantidade de pessoas:</label>
                            <div className="presencial-input">
                                <input type="text" value={qntdPessoas} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Atividade:</label>
                            <div className="presencial-input">
                                <input type="text" value={atividade} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Mensalidade:</label>
                            <div className="presencial-input">
                                <input type="text" value={mensalidade} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Unidade:</label>
                            <div className="presencial-input">
                                <input type="text" value={unidade} disabled />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Data de pagamento:</label>
                            <div className="presencial-input">
                                <input type="text" value={dataPagamento} disabled />
                            </div>
                        </div>


                        <div className="col-md-12">
                            <label>Descricao:</label>
                            <div className="presencial-input">
                                <input type="text" value={descricao} disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div >
    )
}