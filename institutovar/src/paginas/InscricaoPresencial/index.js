import React, { useState, useRef, useEffect } from 'react';
import logo from '../../imagens/var/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import HeaderPrincipal from '../../componentes/HeaderPrincipal';
import './inscricaopresencial.css';
import api from '../../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsQuestionCircle, BsFillBarChartLineFill, BsFillTelephoneFill, BsFillHouseAddFill, BsFillCalendarEventFill, BsFillPersonFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidUserBadge } from 'react-icons/bi';
import logomodal from '../../imagens/var/logo3.png';
import { FaIdCard } from 'react-icons/fa';

import { MdEmail, MdLock } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

export default function Inscricao() {
    const estados = [
        { codigo: 0, sigla: "Selecionar" },
        { codigo: 1, sigla: "AC" },
        { codigo: 2, sigla: "AL" },
        { codigo: 3, sigla: "AP" },
        { codigo: 4, sigla: "AM" },
        { codigo: 5, sigla: "BA" },
        { codigo: 6, sigla: "CE" },
        { codigo: 7, sigla: "DF" },
        { codigo: 8, sigla: "ES" },
        { codigo: 9, sigla: "GO" },
        { codigo: 10, sigla: "MA" },
        { codigo: 11, sigla: "MT" },
        { codigo: 12, sigla: "MS" },
        { codigo: 13, sigla: "MG" },
        { codigo: 14, sigla: "PA" },
        { codigo: 15, sigla: "PB" },
        { codigo: 16, sigla: "PR" },
        { codigo: 17, sigla: "PE" },
        { codigo: 18, sigla: "PI" },
        { codigo: 19, sigla: "RJ" },
        { codigo: 20, sigla: "RN" },
        { codigo: 21, sigla: "RS" },
        { codigo: 22, sigla: "RO" },
        { codigo: 23, sigla: "RR" },
        { codigo: 24, sigla: "SC" },
        { codigo: 25, sigla: "SP" },
        { codigo: 26, sigla: "SE" },
        { codigo: 27, sigla: "TO" },
    ];

    const ref = useRef(null);
    const url = "Cadastro/InscreverPresencial";
    const navigate = useNavigate();

    const [nome, setNome] = useState(window.localStorage.getItem('usr_nome'))
    const [telefone, setTelefone] = useState('');
    const [data_nascimento, setData_nascimento] = useState('');
    const [RG, setRG] = useState('');
    const [CPF, setCPF] = useState('');
    const [isCPFValid, setIsCPFValid] = useState(true);
    const [Gênero, setGenero] = useState('0');
    const [Cor, setCor] = useState('0');
    const [CEP, setCEP] = useState('');
    const [Rua, setRua] = useState('');
    const [Bairro, setBairro] = useState('');
    const [Cidade, setCidade] = useState('');
    const [UF, setUF] = useState('');
    const [haveNote, sethaveNote] = useState('0');
    const [haveInternetHouse, sethaveInternetHouse] = useState('0');
    const [descricao, setdescricao] = useState('');
    const [renda, setRenda] = useState('')
    const [pessoas, setPessoas] = useState(0)
    const [mensalidade, setMensalidade] = useState('');
    const [tabela, setTabela] = useState([]);
    const [turma, setTurma] = useState('')
    const [numero, setNumero] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [complemento, setComplemento] = useState('')
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [isCEP, setIsCEP] = useState(false);

    const handleNome = (event) => {
        setNome(event.target.value);
    }
    const formatarNumeroTelefone = (numero) => {
        const numeros = numero.replace(/\D/g, '');

        const regexTelefone = /^(\d{2})(\d{5})(\d{4})$/;
        const numeroFormatado = numeros.replace(regexTelefone, '($1)$2-$3');

        return numeroFormatado;
    }
    const handleChange = (event) => {
        const input = event.target.value;
        const newValue = input.replace(/[^0-9\-]/g, '');

        setTelefone(formatarNumeroTelefone(newValue));
    };

    const handleChange1 = (event) => {
        setData_nascimento(event.target.value);
    };
    const calcularIdade = () => {
        const dataAtual = new Date();
        const dataNascimentoDate = new Date(data_nascimento);
        let idade = dataAtual.getFullYear() - dataNascimentoDate.getFullYear();

        if (dataNascimentoDate > dataAtual.setFullYear(dataAtual.getFullYear() - idade)) {
            idade--;
        }
        return idade;
    };
    const formatarRG = (rg) => {
        const numeros = rg.replace(/\D/g, '');
        const regexRG = /^(\d{1,2})(\d{3})(\d{3})(\d{1})$/;
        return numeros.replace(regexRG, '$1.$2.$3-$4');
    };

    const handleChange2 = (event) => {
        const newRG = event.target.value;
        const formattedRG = formatarRG(newRG);
        setRG(formattedRG);
    };
    const formatarCPF = (cpf) => {
        const numeros = cpf.replace(/\D/g, '');

        const regexCPF = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
        const cpfFormatado = numeros.replace(regexCPF, '$1.$2.$3-$4');

        return cpfFormatado;
    };
    const handleChange3 = (event) => {
        const newCPF = event.target.value;
        setCPF(formatarCPF(newCPF));
        setIsCPFValid(validarCPF(newCPF));
    };
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11) {
            return false;
        }
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rest = sum % 11;
        let digit1 = (rest < 2) ? 0 : 11 - rest;
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rest = sum % 11;
        let digit2 = (rest < 2) ? 0 : 11 - rest;
        if (parseInt(cpf.charAt(9)) !== digit1 || parseInt(cpf.charAt(10)) !== digit2) {
            return false;
        }
        return true;
    }

    const handleChange4 = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setGenero(intValue);

    };

    const handleChange5 = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setCor(intValue);

    };
    const handleChange6 = (event) => {
        setCEP(event.target.value);
    };
    const handleChange7 = (event) => {
        setRua(event.target.value);
    };
    const handleChange8 = (event) => {
        setBairro(event.target.value);
    };
    const handleChange9 = (event) => {
        setCidade(event.target.value);
    };
    const handleChange10 = (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setUF(intValue);
    };
    const handleChange11 = (event) => {
        const selectedValue = event.target.value;
        //console.log(selectedValue)
        sethaveNote(selectedValue);
    };

    const handleChange12 = (event) => {
        const selectedValue = event.target.value;
        sethaveInternetHouse(selectedValue);

    };
    const handleChange13 = (event) => {
        setdescricao(event.target.value);
    };
    const handleChange22 = (event) => {
        setPassword(event.target.value);
    };
    const handleChange21 = (event) => {
        setEmail(event.target.value);
    };
    const handleChange23 = (event) => {
        setNome(event.target.value);
    };

    const handleChange14 = (event) => {
        const selectedValue = event.target.value;
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
        setRenda(valor);

    };
    const handleChange15 = async (event) => {
        const newValue = event.target.value;
        if (newValue <= 100) {
            setPessoas(newValue);
        }
    };
    const handleChange16 = async (event) => {
        const selectedValue = event.target.value;
        const intValue = parseInt(selectedValue);
        setTurma(intValue);
    }
    const handleChange17 = (event) => {
        setNumero(event.target.value);
    };
    const handleChange18 = (event) => {
        setComplemento(event.target.value);
    };
    useEffect(() => {
        calcularMensalidade()
    })

    const calcularMensalidade = () => {


        const Renda = Number(renda.replace(",", "."))

        const rendaPorPessoa = Renda / pessoas;
        if (!isFinite(rendaPorPessoa)) {
            setMensalidade('Gratuito');
        } else {
            if (rendaPorPessoa <= 700) {
                setMensalidade('Gratuito');
            }
            else if (rendaPorPessoa <= 900) {
                setMensalidade('R$ 50,00');
            }
            else if (rendaPorPessoa <= 1100) {
                setMensalidade('R$ 100,00');
            } else if (rendaPorPessoa <= 1300) {
                setMensalidade('R$ 150,00');
            } else {
                setMensalidade('R$ 199,00');
            }
        }
    }
    const cep = async () => {

        try {
            const response = await fetch("https://viacep.com.br/ws/" + CEP + "/json/");
            const data = await response.json();

            if ("erro" in data) {
                toast.warn("CEP não existe")
                return;
            }
            setRua(data.logradouro)
            setBairro(data.bairro)
            setCidade(data.localidade)
            setUF(estados.find(x => x.sigla == data.uf).codigo)
            setIsCEP(true)

            return data;
        }
        catch (error) {
            setRua("")
            setBairro("")
            setCidade("")
            setUF(0)
            toast.warn("O campo 'CEP' não está definido de forma correta.");
            setIsCEP(false)
            return;
        }

    }

    const getTabelas = async () => {
        try {
            await api.get('Cadastro/ObterVagas').then((response) => {
                const cont = response.data.sort((a, b) => {
                    if (a.descricao < b.descricao) {
                        return -1
                    } if (a.descricao > b.descricao) {
                        return 1
                    } else {
                        return 0;
                    }
                })
                setTabela(cont);
            })

        } catch (error) {
            //console.log(error)
        }
    };


    useEffect(() => {
        getTabelas();
    }, []);


    const handleCadastro = async () => {
        const telform = telefone.replace(/[^0-9]/g, '');

        if (renda == 0) {
            toast.warn("Por favor, preencha o campo renda familiar.");
            return;
        }
        if (pessoas == 0) {
            toast.warn("Preencha o campo 'Quantas pessoas moram na sua casa'.");
            return;
        }
        if (turma == "") {
            toast.warn("Campo turma vazio!");
            return;
        }
        if (telform.length !== 11) {
            if (telefone === null) {
                toast.warn("Por favor, preencha o campo 'Telefone'.")
                return;
            }
            toast.warn("O campo 'Telefone' deve conter 11 dígitos.");
            return;
        }
        if (telform.length === 9) {
            toast.warn("Número de telefone inválido. Verifique o DDD.");
        }
        if (data_nascimento == '') {
            toast.warn("Preencha o campo 'Data de nascimento'.")
            return;
        }
        const idade = calcularIdade();
        if (idade < 16) {
            toast.warn("A idade mínima permitida é de 16 anos.");
            return;
        }
        if (Gênero === null || Gênero === "0" || Gênero === 0 || isNaN(Gênero)) {
            toast.warn("Por favor, selecione um gênero.");
            return;
        }
        if (isNaN(Cor) || Cor === null || Cor === "0" || Cor === 0) {
            toast.warn("Por favor, selecione uma cor.");
            return;
        }
        if (RG == null) {
            toast.warn("O campo 'RG' deve conter no mínimo 5 caracteres.");
            return;
        }
        if (RG === '') {
            toast.warn("Por favor, preencha o campo 'RG'.");
            return;
        }
        if (RG.length <= 4) {
            toast.warn("O campo 'RG' deve conter no mínimo 5 caracteres.");
            return;
        }

        if (!validarCPF(CPF)) {
            toast.warn("CPF inválido. Verifique novamente.");
            return;
        }
        if (!validarCPF(CPF)) {

            toast.warn("CPF inválido. Verifique novamente.");
            return;
        }
        if (CEP == 0) {
            toast.warn("Digite seu CEP.");
            return;
        }
        if (Rua == '') {
            toast.warn("Digite uma rua.");
            return;
        }
        if (Bairro == '') {
            toast.warn("Digite um bairro.");
            return;
        }
        if (Cidade == '') {
            toast.warn("Digite uma cidade.");
            return;
        }
        if (UF == 0) {
            toast.warn("Selecione um UF.");
            return;
        }
        if (numero === '') {
            toast.warn("Digite um número residencial.");
            return;
        }
        if (complemento === '') {
            toast.warn("Digite um complemento.");
            return;
        }
        if (haveNote === "0") {
            toast.warn("Por favor, selecione uma opção no campo 'Possui computador em casa?'");
            return;
        }
        if (haveInternetHouse === "0") {
            toast.warn("Por favor, selecione uma opção no campo 'Possui internet em casa?");
            return;
        }

        setLoadingAuth(true);
        try {
            const response = await api.post(url, {username : nome,
                email: email, password: password, celular: telform, dataNascimento: data_nascimento, RG: (RG.replace(".", "").replace("-", "").replace(".", "")), CPF: (CPF.replace(".", "").replace("-", "").replace(".", "")), genero: Gênero,
                cor: Cor, cep: Number(CEP.replace("-", "")), rua: Rua, bairro: Bairro, cidade: Cidade, UF: UF, haveNote: haveNote == "true",
                haveInternetHouse: haveInternetHouse == "true", descricao: descricao, renda: Number(renda.replace(",", ".")), pessoas: pessoas, nome: nome, turmaCodigo: turma,
                numeroCasa: numero, complemento: complemento
            })
            if (response.status === 200) {
                if (response.data.mensagem === "CPF já existe no banco.") {
                    toast.warn("Este CPF já possui um cadastro associado.")
                    return;
                }
                setTelefone('')
                setData_nascimento('');
                setRG('');
                setCPF('');
                setGenero('');
                setCor('');
                setCEP('');
                setRua('');
                setBairro('');
                setCidade('');
                sethaveNote('');
                sethaveInternetHouse('')
                setdescricao('');
                setRenda('');
                setPessoas(0);
                setTurma('');
                setNumero(0)
                setComplemento('');
                api.defaults.headers.authorization = `Bearer ${response.data.token}`;
                window.localStorage.setItem('usr_token', response.data.token);
                window.localStorage.setItem('usr_id', response.data.usuarioid);
                window.localStorage.setItem('usr_status', response.data.status);
                window.localStorage.setItem('usr_nome', response.data.nome);
                const foto = response.data.urlFoto == null ? "avatar.png" : response.data.urlFoto
                window.localStorage.setItem('usr_foto', "https://api.varsolutions.com.br/images/image_Aluno/" + foto);
                ref.current.click()
            }
        }
        catch (error) {
            toast.error("Algo deu errado, por favor tente novamente ou contate o suporte!")
        }
        finally {
            setLoadingAuth(false);
        }
    };

    const handleModalClose = () => {
        navigate("/");
        toast.success("Sua inscrição foi registrada! Fique atento(a) à sua caixa de entrada para receber nosso e-mail quando sua vaga estiver disponível.")
        return;
    };

    const MensalidadeComponent = (props) => {
        const [showTable, setShowTable] = useState(false);

        function handleMouseEnter() {
            setShowTable(true);
        }

        function handleMouseLeave() {
            setShowTable(false);
        }

        return (
            <div className="mensalidade" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <label>Mensalidade:<BsQuestionCircle /></label>
                <div>
                    <input type="text" readOnly value={props.mensalidade} />
                </div>
                {showTable && (
                    <div className="table-container" id="tableContainer">
                        <table className='table table-dark table-bordered'>
                            <thead>
                                <tr className='titulos'>
                                    <th>Renda por <br /> pessoa</th>
                                    <th>Valor da <br /> mensalidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>R$ 700,00</td>
                                    <td>Gratuito</td>
                                </tr>
                                <tr>
                                    <td>R$ 900,00</td>
                                    <td>R$ 50,00</td>
                                </tr>
                                <tr>
                                    <td>R$ 1100,00</td>
                                    <td>R$ 100,00</td>
                                </tr>
                                <tr>
                                    <td>R$ 1300,00</td>
                                    <td>R$ 150,00</td>
                                </tr>
                                <tr>
                                    <td>R$ 1500,00</td>
                                    <td>R$ 199,00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <HeaderPrincipal/>
            <div className='body-inscricao-presencial'>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/planos/presencial`}>Curso presencial</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Inscrição</li>
                    </ol>
                </nav>
                <h1>INSCRIÇÃO PRESENCIAL</h1>
                <div className='container-mensalidade'>
                    <div>
                        <label>Qual é a sua renda familiar?</label>
                        <div className='presencial-input'>
                            <BsFillBarChartLineFill />R$
                            <input type="text" value={renda} onChange={handleChange14} />
                        </div>
                    </div>

                    <div>
                        <label>Quantas pessoas moram na sua casa?</label>
                        <div className='presencial-input'>
                            <BsFillBarChartLineFill />
                            <input type="number" value={pessoas} max={100} onChange={handleChange15} />
                        </div>
                    </div>
                    <MensalidadeComponent mensalidade={mensalidade} />
                </div>

                <h2 className='h2-1'>Turmas disponíveis:</h2>
                <table className='container-turmas table table-dark table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">Turmas</th>
                            <th scope="col">Vagas</th>
                            <th scope="col">Espera</th>
                            <th scope="col">Selecione</th>
                        </tr>
                    </thead>
                    {tabela == null ? "" : tabela.map((tab) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{tab.descricao}</td>
                                    <td>{tab.vagas <= 0 ? 0 : tab.vagas}</td>
                                    <td>{tab.qtdEspera + tab.qtdConvocados}</td>
                                    <td><input className='radio-turmas' type="radio" value={tab.codigoTurma} onClick={handleChange16} name="selecionar" /></td>
                                </tr>
                            </tbody>
                        )
                    })
                    }
                </table>

                <h2 className='h2-2'>Outros dados:</h2>
                <div className='container-dados'>
                    <div className='row'>
                        <div className="col-md-3">
                            <label>Nome completo:</label>
                            <div className='presencial-input'>
                                <IoPerson />
                                <input type="text" value={nome} placeholder='Digite seu nome' onChange={handleChange23} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>E-mail:</label>
                            <div className='presencial-input'>
                                <MdEmail />
                                <input type="email" value={email} placeholder='Digite seu e-mail' onChange={handleChange21}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Crie uma senha:</label>
                            <div className='presencial-input'>
                                <MdLock />
                                <input type="password" value={password} placeholder='Senha' onChange={handleChange22}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Confirmar senha:</label>
                            <div className='presencial-input'>
                                <MdLock />
                                <input type="password" placeholder='Confirme sua senha' />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-3">
                            <label for="telefone">Telefone:</label>
                            <div className='presencial-input'>
                                <BsFillTelephoneFill />
                                <input type="text" id="telefone" name="telefone" maxLength={12} value={telefone} onChange={handleChange} placeholder='Digite seu telefone' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label for="data_nascimento">Data de nascimento:</label>
                            <div className='presencial-input'>
                                <BsFillCalendarEventFill />
                                <input type="date" id="data_nascimento" name="data_nascimento" value={data_nascimento} onChange={handleChange1} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label for="genero">Gênero:</label>
                            <select className='presencial-input' id="genero" name="genero" required value={Gênero} onChange={handleChange4}>
                                <option value="0">Selecionar</option>
                                <option value="1">Masculino</option>
                                <option value="2">Feminino</option>
                                <option value="3">Não Binário</option>
                                <option value="4">Outros</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label for="raca">Cor:</label>
                            <select className='presencial-input' id="raca" name="raca" value={Cor} onChange={handleChange5}>
                                <option value="0">Selecionar</option>
                                <option value="1">Branco(a)</option>
                                <option value="2">Negro(a)</option>
                                <option value="3">Pardo(a)</option>
                                <option value="4">Amarelo(a)</option>
                                <option value="5">Outro(a)</option>
                                <option value="6">Prefiro não informar</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-3">
                            <label for="rg">RG:</label>
                            <div className='presencial-input'>
                                <FaIdCard />
                                <input type="text" id="rg" maxlength="12" name="rg" value={RG} onChange={handleChange2} placeholder='Digite seu RG' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label for="cpf">CPF:</label>
                            <div className='presencial-input'>
                                <BiSolidUserBadge />
                                <input type="text" id="cpf" name="cpf" value={CPF} onChange={handleChange3} placeholder='Digite seu CPF' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label for="cep">CEP:</label>
                            <div className='presencial-input'>
                                <BsFillHouseAddFill />
                                <input type="text" id="cep" name="cep" maxlength="9" value={CEP} onBlur={cep} onChange={handleChange6} placeholder='Digite seu CEP' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label for="cidade">Cidade:</label>
                            <div className='presencial-input'>
                                <AiFillHome />
                                <input type="text" id="cidade" name="cidade" readOnly={isCEP} value={Cidade} onChange={handleChange9} placeholder='Digite sua cidade' />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-3">
                            <label for="bairro">Bairro:</label>
                            <div className='presencial-input'>
                                <AiFillHome />
                                <input type="text" id="bairro" name="bairro" readOnly={isCEP} value={Bairro} onChange={handleChange8} placeholder='Digite seu bairro' />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label for="rua">Rua:</label>
                            <div className='presencial-input'>
                                <AiFillHome />
                                <input type="text" id="rua" name="rua" readOnly={isCEP} value={Rua} onChange={handleChange7} placeholder='Digite sua rua' />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <label>Nº:</label>
                            <div className='presencial-input'>
                                <AiFillHome />
                                <input type="text" placeholder='Nº residencial:' maxLength={5} value={numero} onChange={handleChange17} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label>Complemento:</label>
                            <div className='presencial-input'>
                                <AiFillHome />
                                <input type="text" placeholder='Digite o complemento' value={complemento} maxLength={30} onChange={handleChange18} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-3">
                            <label for="uf">UF:</label>
                            <select className='presencial-input' id="uf" name="uf" value={UF} disabled={isCEP ? "disabled" : ""} onChange={handleChange10}>
                                <option value="0">Selecionar</option>
                                <option value="1">Acre (AC)</option>
                                <option value="2">Alagoas (AL)</option>
                                <option value="3">Amapá (AP)</option>
                                <option value="4">Amazonas (AM)  </option>
                                <option value="5">Bahia (BA)  </option>
                                <option value="6">Ceará (CE)  </option>
                                <option value="7">Distrito Federal (DF)  </option>
                                <option value="8">Espírito Santo (ES)  </option>
                                <option value="9">Goiás (GO)  </option>
                                <option value="10">Maranhão (MA)  </option>
                                <option value="11">Mato Grosso (MT)  </option>
                                <option value="12">Mato Grosso do Sul (MS)  </option>
                                <option value="13">Minas Gerais (MG)  </option>
                                <option value="14">Pará (PA)  </option>
                                <option value="15">Paraíba (PB)  </option>
                                <option value="16">Paraná (PR)  </option>
                                <option value="17">Pernambuco (PE)  </option>
                                <option value="18">Piauí (PI)  </option>
                                <option value="19">Rio de Janeiro (RJ)  </option>
                                <option value="20">Rio Grande do Norte (RN)  </option>
                                <option value="21">Rio Grande do Sul (RS)  </option>
                                <option value="22">Rondônia (RO)  </option>
                                <option value="23">Roraima (RR)  </option>
                                <option value="24">Santa Catarina (SC)  </option>
                                <option value="25">São Paulo (SP)  </option>
                                <option value="26">Sergipe (SE)  </option>
                                <option value="27">Tocantins (TO)  </option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="possui_computador">Você possui um computador?</label>
                            <select className='presencial-input' id="possui_computador" name="possui_computador" required value={haveNote.toString()} onChange={handleChange11}>
                                <option value="0">Selecionar</option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </div>
                        <div className="col-md-5">
                            <label for="possui_internet">Você possui acesso à internet em casa?</label>
                            <select className='presencial-input' id="possui_internet" name="possui_internet" required value={haveInternetHouse.toString()} onChange={handleChange12}>
                                <option value="0">Selecionar</option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </div>
                    </div>
                    {mensalidade === 'Gratuito' && (
                        <div className="col-md-12 porque-div">
                            <label for="porque">Por que você merece essa vaga?</label>
                            <textarea className='presencial-input porque' id="porque" name="porque" value={descricao} onChange={handleChange13} />
                        </div>
                    )}
                </div>

                <div className='presencial-botao'>
                    {<button className='botao-inscricao' onClick={handleCadastro} disabled={loadingAuth}>
                        {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Enviar"}
                    </button>}
                </div>
            </div>

            <div className='modal-incricao-presencial modal-parabens'>
                <button hidden ref={ref} type="button" className='botao-inscricao' data-bs-toggle="modal" data-bs-target="#exampleModal1" >Modal</button>

                <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={handleModalClose}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                            <div style={{ color: 'white' }} className="modal-body">
                                <img src={logomodal} />
                                <h2>Parabéns! Sua inscrição foi enviada com sucesso!</h2>
                                <p>Estamos ansiosos para vê-lo crescer e alcançar seus objetivos profissionais junto conosco!</p>
                                <p>Não se esqueça de verificar a caixa de entrada do seu email para encontrar detalhes importantes sobre a vaga.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}