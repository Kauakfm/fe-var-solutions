import { useEffect, useState, useRef } from "react";
import HeaderAluno from "../../../componentes/HeaderAluno";
import api from "../../../services/api";
import { Link, useParams } from 'react-router-dom';
import '../administrativo.css'
import { set } from "date-fns";
import { toast } from "react-toastify";

export default function Editar() {
    const [posicao, setPosicao] = useState(0)
    const [valuePosicao, setValuePosicao] = useState('')
    const [posicoesDisponiveis, setPosicoesDisponiveis] = useState([]);
    const [codTurma, setCodTurma] = useState('');
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [status, setStatus] = useState(0)
    const [mensalidade, setMensalidade] = useState(0)
    const [dataPagamento, setDataPagamento] = useState(0)
    const [hisTurma, setHisTurma] = useState(false);
    const [primeiroPagamento, setPrimeiroPagamento] = useState('')
    const { id } = useParams();

    const handleEscolherTurma = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setCodTurma(intValue);
        handlePosicao(intValue)

    };
    const handleStatus = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setStatus(intValue);
    }
    const handleNome = (event) => {
        setNome(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleSenha = (event) => {
        setSenha(event.target.value);
    }
    const handleMensalidade = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setMensalidade(intValue);
    }
    const handleDataPagamento = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setDataPagamento(intValue);
    }
    const handlePosicaoid = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue)
        if (isNaN(intValue)) {
            toast.warn("Ele já se encontra alocado nessa posição/baia.");
            return posicao;
        }
        setPosicao(intValue);
    }
    const handlePrimeiroPagamento = (event) => {
        const selectedValue = event.target.value;

        setPrimeiroPagamento(selectedValue);
    }


    const handleDetalhes = () => {
        try {
            api.get(`Administrativo/ObterAdministrativo/${id}`).then((response) => {
                const responseData = response.data;
                setNome(responseData.nome)
                setEmail(responseData.email)
                setSenha(responseData.senha)
                setStatus(responseData.status)
                setCodTurma(responseData.turmaCodigo)
                setMensalidade(responseData.mensalidade)
                setDataPagamento(responseData.dataPagamento)
                setPosicao(responseData.id_Posicao)
                handlePosicao(responseData.turmaCodigo)
            })

        } catch (error) {

        }
    }
    const handleObterPrimeiroPagamento = async () => {
        try {
            await api.get(`Administrativo/ObterPrimeiroPagamento/${id}`).then((response) => {
                const responseData = response.data
                if (responseData != null) {
                    setPrimeiroPagamento(responseData.dataVencimento)
                }


            })
        } catch (error) {

        }
    }
    const handleEditar = async () => {
        try {
            await api.put(`Administrativo/editarUsuario/${id}/`, {
                nome: nome,
                email: email,
                senha: senha,
                status: status,
                turma: codTurma,
                posicao: posicao,
                mensalidade: mensalidade,
                dataPagamento: dataPagamento,
                dataVencimento: primeiroPagamento
            }).then((response) => {
                if (response.status == 200)
                    if (response.data.sucesso)
                        toast.success("Usuário editado com sucesso!")
                    else
                        toast.warn("Por favor, tente novamente.")

            })
        } catch (error) {
            toast.error("Algo deu errado! Por favor contate o suporte.")
        }
    }

    const handlePosicao = async (turmaId) => {
        try {
            await api.get(`Administrativo/ObterVagasTurma/${turmaId}/${id}`).then((response) => {
                const posicoesDisponiveisData = response.data
                setPosicoesDisponiveis(posicoesDisponiveisData);
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        handleDetalhes()
        handleObterPrimeiroPagamento()
    }, [])



    return (
        <div className="body-administrativo">
            <HeaderAluno />
            <main>
                <div className='body-editar container-dados'>
                    <div className='row'>
                        <div className="col-md-4">
                            <label>Nome Completo:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Digite seu nome' value={nome} onChange={handleNome} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label>E-mail:</label>
                            <div className='presencial-input' >
                                <input type="email" placeholder='Digite seu e-mail' value={email} onChange={handleEmail} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label>Senha:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Senha' value={senha} onChange={handleSenha} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-4">
                            <label>Status:</label>
                            <select className='presencial-input' value={status} onChange={handleStatus}>
                                <option value="1">Ativo</option>
                                <option value="2">Inativo</option>
                                <option value="3">Inscrito</option>
                                <option value="4">Cadastrado</option>
                                <option value="5">Instrutor</option>
                                <option value="6">Convocado</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label>Turma:</label>
                            <select className='presencial-input' value={codTurma} onChange={handleEscolherTurma}>
                                <option value="5">Seg - Qua (Manhã)</option>
                                <option value="8">Ter - Qui (Manhã)</option>
                                <option value="6">Seg - Qua (Tarde)</option>
                                <option value="9">Ter - Qui (Tarde)</option>
                                <option value="7">Seg - Qua (Noite)</option>
                                <option value="13">Ter - Qui (Noite)</option>
                                <option value="12">Sábado (Integral)</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label>Posição:</label>
                            <select className='presencial-input' value={posicao} onChange={handlePosicaoid}>
                                <option key={0} value={0}>Nenhuma posição</option>
                                {posicoesDisponiveis.map(opcao => (
                                    <option key={opcao.id} value={opcao.id}>{opcao.descricao}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label>Mensalidade:</label>
                            <select className='presencial-input' value={mensalidade} onChange={handleMensalidade}>
                                <option value="">Selecione a mensalidade</option>
                                <option value="1">Gratuito</option>
                                <option value="2">R$ 50,00</option>
                                <option value="3">R$ 100,00</option>
                                <option value="4">R$ 150,00</option>
                                <option value="5">R$ 200,00</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label>Data de pagamento:</label>
                            <select className='presencial-input' value={dataPagamento} onChange={handleDataPagamento} >
                                <option value="">Selecione uma data</option>
                                <option value="1">Dia 1</option>
                                <option value="2">Dia 5</option>
                                <option value="3">Dia 10</option>
                                <option value="4">Dia 15</option>
                                <option value="5">Dia 20</option>
                                <option value="6">Dia 25</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label>Primeiro pagamento:</label>
                            <div className='presencial-input'>
                                <input type="date" onChange={handlePrimeiroPagamento} value={primeiroPagamento} />
                            </div>
                        </div>
                    </div>
                    <div className="btn-editar">
                        <button className="btn btn-success" onClick={handleEditar}>Salvar</button>
                    </div>
                </div>
            </main >
        </div >
    )
}

