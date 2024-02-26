import './dashboard.css';
import api from '../../services/api';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalSuporte from '../../componentes/ModalSuporte';
import {PiCertificate} from 'react-icons/pi';
import HeaderAluno from '../../componentes/HeaderAluno';
import capaDashboard from '../../imagens/var/capa-dashboard.png';
import avatar from '../../imagens/avatar.png';
import { toast } from 'react-toastify';
import { IoLocationSharp, IoPeople } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FiUpload } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { set } from 'date-fns';

export default function Dashboard() {
    const tabelaStyle = {
        color: 'white', // Define a cor do texto como branco
      };
    const ref = useRef(null);
    const urll = "/Dashboard";
    const navigate = useNavigate();
    const status = window.localStorage.getItem("usr_status")
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
    const turmas = [
        {
            codigo: 0,
            desc: ""
        },
        {
            codigo: 5,
            desc: "Seg e Qua - Manhã"
        },
        {
            codigo: 6,
            desc: "Seg e Qua - Tarde"
        },
        { codigo: 7, desc: "Seg e Qua - Noite" },
        { codigo: 8, desc: "Ter e Qui - Manhã" },
        { codigo: 9, desc: "Ter e Qui - Tarde" },
        { codigo: 10, desc: "Seg à Qui - Manhã" },
        { codigo: 11, desc: "Seg à Qui - Tarde" },
        { codigo: 12, desc: "Sábado - Integral" },
        { codigo: 13, desc: "Ter e Qui - Noite" },
        { codigo: 14, desc: "FCamara - Orange" },
        { codigo: 15, desc: "Var Online" },
        { codigo: 16, desc: "Exceção Presencial" },
    ]
    const fileInputRef = useRef(null);

    const [turma, setTurma] = useState(0);
    const [cargo, SetCargo] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [aulaassis, Setaulaassis] = useState();
    const [qtdComentarios, setQtdComentarios] = useState();
    const [usuario, Setusuario] = useState([]);
    const [rede, SetRede] = useState([])
    const fotoperfil = window.localStorage.getItem('usr_foto')
    const [nome, setNome] = useState(window.localStorage.getItem('usr_nome'))
    const [telefone, setTelefone] = useState('');
    const [data_nascimento, setData_nascimento] = useState('');
    const [RG, setRG] = useState('');
    const [CPF, setCPF] = useState('');
    const [complemento, setComplemento] = useState('');
    const [numeroCasa, setNumeroCasa] = useState('');
    const [isCPFValid, setIsCPFValid] = useState(true);
    const [Gênero, setGenero] = useState('0');
    const [Cor, setCor] = useState('0');
    const [CEP, setCEP] = useState('');
    const [Rua, setRua] = useState('');
    const [Bairro, setBairro] = useState('');
    const [Cidade, setCidade] = useState('');
    const [UF, setUF] = useState('');
    const [haveNote, sethaveNote] = useState('');
    const [haveInternetHouse, sethaveInternetHouse] = useState('');
    const [isCEP, setIsCEP] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [dataCriacao, SetDataCriacao] = useState('')
    const [sobreMim, setSobremim] = useState('')
    const [renda, setRenda] = useState('')
    const [pessoas, setPessoas] = useState(0)
    const [mensalidade, setMensalidade] = useState('');
    const [plano, setPlano] = useState();
    const [valorPlano, setValorPlano] = useState();
    const [validade, setValidade] = useState();
    const [proxPag, setProximoPag] = useState();
    const [sumirRenda, setSumirRenda] = useState();
    const [sumirQntd, setSumirPessoas] = useState();
    const [obterCertificados , setObterCertificados] = useState([]);


    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };
    const handleNome = (event) => {
        setNome(event.target.value);
    }
    const handlecargo = (event) => {
        SetCargo(event.target.value);
    }

    const handleCertificados = async () => {
        try {
            const response = await api.get(`/Certificado/ObterCertificados`).then((response) =>{
                setObterCertificados(response.data)
            })
        } catch (error) {
            
        }
    }
useEffect(() =>{
    handleCertificados()
},[])

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
    const handleChangeCriacao = (event) => {
        SetDataCriacao(event.target.value);
    };
    const handleChangeSobremim = (event) => {
        setSobremim(event.target.value);

    };

    const handleChange1 = (event) => {
        const novaDataNascimento = event.target.value;
        setData_nascimento(novaDataNascimento);
    };


    const handleSumirRenda = (event) => {
        setSumirRenda(event.target.value);

    }



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
    }
    const handleChange15 = async (event) => {
        const newValue = event.target.value;
        if (newValue <= 100) {
            setPessoas(newValue);
        }
    };

    const calcularMensalidade = () => {
        const rendaPorPessoaNivel1 = 700;
        const rendaPorPessoaNivel2 = 900;
        const rendaPorPessoaNivel3 = 1100;
        const rendaPorPessoaNivel4 = 1300;

        const Renda = Number(renda.replace(",", "."))

        const rendaPorPessoa = Renda / pessoas;

        if (rendaPorPessoa <= rendaPorPessoaNivel1) {
            setMensalidade('Gratuito');
        }
        else if (rendaPorPessoa <= rendaPorPessoaNivel2) {
            setMensalidade('R$ 50,00');
        } else if (rendaPorPessoa <= rendaPorPessoaNivel3) {
            setMensalidade('R$ 100,00');
        } else if (rendaPorPessoa <= rendaPorPessoaNivel4) {
            setMensalidade('R$ 150,00');
        } else {
            setMensalidade('R$ 199,00');
        }
    };

    useEffect(() => {
        calcularMensalidade()
    }, [renda, pessoas]);


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
        sethaveNote(selectedValue);
    };

    const handleChange12 = (event) => {
        const selectedValue = event.target.value;
        sethaveInternetHouse(selectedValue);

    };
    const handleChangeNumero = (event) => {
        setNumeroCasa(event.target.value);
    };
    const handlechangeComplemento = (event) => {
        setComplemento(event.target.value);
    };

    const handleModalClose = async () => {
        try {
            await api.get('Dashboard/ObterDashboard');
        }
        catch (error) {
        }
    };
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
            toast.warn("O campo 'CEP' não está definido de forma correta");
            setIsCEP(false)
            return;
        }

    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (selectedFiles.length === 0) {
            toast.warning('Selecione pelo menos uma foto para fazer o upload.');
            return;
        }

        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        try {
            const response = await api.post('Cadastro/Atualizarfoto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Foto enviada com sucesso!');
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };

    const url = "Curso/obterConcluidos/"

    const handleaulassist = () => {
        api.get(url).then((response) => {
            Setaulaassis(response.data.length)
        })
    }

    const urlComentarios = "/Dashboard/ObterQtdComentarios"

    const handleQtdComentarios = () => {
        api.get(urlComentarios).then((response) => {
            setQtdComentarios(response.data.qtd)
        })
    }

    const handleSumir = (event) => {
        if (proxPag == null) {
            setProximoPag("");
        }
        else {
            setProximoPag(event.target.value);
        }
    };

    const handlePlanos = async () => {
        try {
            const response = await api.get('/Pagamento/ObterPlano');
            const responseData = response.data;

            setPlano(responseData.descricao);
            setValorPlano(responseData.valor == 0 ? "Gratuito" : responseData.valor);
            const data = new Date(responseData.validade)
            setValidade(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`);
            if (responseData.proxPagamento == null) {
                setProximoPag("")
            }
            else {
                const dataPag = new Date(responseData.proxPagamento)
                setProximoPag(`${dataPag.getDate()}/${dataPag.getMonth() + 1}/${dataPag.getFullYear()}`);
            }

        }
        catch (error) {

        }
    }

    const handleObjetos = async () => {
        try {
            const response = await api.get('Dashboard/ObterDashboard');
            const responseData = response.data;
            setNome(responseData.nome);
            SetCargo(responseData.cargo);

            // TELEFONE //
            const numero = (responseData.celular);
            const numeross = numero.replace(/\D/g, '');
            const regexTelefone = /^(\d{2})(\d{5})(\d{4})$/;
            const numeroFormatado = numeross.replace(regexTelefone, '($1)$2-$3');
            setTelefone(numeroFormatado);

            // DATA NASCIMENTO //
            let teste = new Date(responseData.dataNascimento);
            let teste2 = teste.getFullYear().toString() + "-" +
                (1 + teste.getMonth()).toString().padStart(2, '0') +
                "-" + teste.getDate().toString().padStart(2, '0');
            setData_nascimento(teste2);


            // RG //
            setGenero(responseData.genero);
            const num = (responseData.rg);
            num.replace(/\D/g, '');
            const regexRG = /^(\d{1,2})(\d{3})(\d{3})(\d{1})$/;
            num.replace(regexRG, '$1.$2.$3-$4');
            setRG(num);

            // CPF //
            const cpf = (responseData.cpf);
            const numeros = cpf.replace(/\D/g, '');
            const regexCPF = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
            const cpfFormatado = numeros.replace(regexCPF, '$1.$2.$3-$4');
            setCPF(cpfFormatado);

            setCor(responseData.cor);

            // CEP //
            const cepSemHifen = responseData.cep.toString().padStart(8, '0');
            const cepFormatado = cepSemHifen.substring(0, 5) + '-' + cepSemHifen.substring(5);

            setCEP(cepFormatado);
            setRua(responseData.rua);
            setCidade(responseData.cidade);
            setUF(responseData.uf);
            setBairro(responseData.bairro);
            const data = new Date(responseData.dataCriacao)
            SetDataCriacao(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`);
            sethaveNote(responseData.haveNote ? "true" : "false");
            setComplemento(responseData.complemento);
            setNumeroCasa(responseData.numeroCasa);
            sethaveInternetHouse(responseData.haveInternetHouse ? "true" : "false");
            setSobremim(responseData.sobreMim);

            // RENDA FAMILIAR //
            const selectedValue = (responseData.rendaFamiliar * 100).toString();
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
            setSumirRenda(responseData.rendaFamiliar)
            setPessoas(responseData.qntdPessoas)
            setSumirPessoas(responseData.qntdPessoas)
            const codetURMA = !responseData.turmaCodigo ? 0 : responseData.turmaCodigo
            setTurma(codetURMA);

        } catch (error) {
        }
    };

    const handleRede = async () => {
        try {
            await api.get('/Dashboard/ObterClassificacao').then((response) => {
                SetRede(response.data)
            })
        } catch (error) {
        }
    }

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        if (status != 4) {
            handleaulassist();
            handleQtdComentarios();
        }
        handleSumir()
        handlePlanos()
        handleModalClose()
        handleObjetos()
        handleRede()
    }, [])

    const handleCadastro = async () => {

        const telform = telefone.replace(/[^0-9]/g, '');

        if (renda == 0) {
            toast.warn("Preencha o campo renda familiar");
            return;
        }
        if (pessoas == 0) {
            toast.warn("Preencha o campo 'Quantas pessoas moram na sua casa'");
            return;
        }
        if (nome === null) {
            toast.warn("Por favor, preencha o campo 'Nome'.");
            return;
        }
        if (nome.length >= 43) {
            toast.warn("Número de caracteres no nome excedido.")
            return;
        }
        if (telform === null) {
            toast.warn("Por favor, preencha o campo 'Telefone'.");
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
        if (data_nascimento === '') {
            toast.warn("Por favor, preencha o campo 'Data de Nascimento'.");
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
        if (RG.length <= 4) {
            if (RG == null) {
                toast.warn("Por favor, preencha o campo 'RG'.");
                return;
            }
            toast.warn("O campo 'RG' deve conter no mínimo 5 caracteres.");
            return;
        }
        if (!validarCPF(CPF)) {
            if (CPF == null) {
                toast.warn("Por favor, preencha o campo 'CPF'.")
            }
            toast.warn("CPF inválido. Verifique novamente.");
            return;
        }
        if (!CEP || isNaN(Number(CEP.replace(/\D/g, '')))) {
            toast.warn("Por favor, digite seu CEP.");
            return;
        }
        if (Rua === '') {
            toast.warn("Por favor, digite uma rua.");
            return;
        }
        if (Bairro === '') {
            toast.warn("Por favor, digite um bairro.");
            return;
        }
        if (Cidade === '') {
            toast.warn("Por favor, digite uma cidade.");
            return;
        }
        if (numeroCasa === "") {
            toast.warn("Por favor, digite o número de sua residência.")
            return;
        }
        if (complemento === "") {
            toast.warn("Por favor, digite um complemento.")
            return;
        }
        if (UF === 0 || isNaN(UF)) {
            toast.warn("Por favor, selecione um UF.");
            return;
        }
        if (haveNote === "" || haveNote === "Selecionar") {
            toast.warn("Por favor, selecione uma opção no campo 'Possui computador em casa?'");
            return;
        }
        if (haveInternetHouse === "" || haveInternetHouse === "Selecionar") {
            toast.warn("Por favor, selecione uma opção no campo 'Possui internet em casa?");
            return;
        }


        setLoadingAuth(true);
        try {
            const response = await api.put(urll, {
                cargo: cargo, celular: telform, dataNascimento: data_nascimento, RG: (RG.replace(".", "").replace("-", "").replace(".", "")), CPF: (CPF.replace(".", "").replace("-", "").replace(".", "")), genero: Gênero,
                cor: Cor, cep: Number(CEP.replace("-", "")), rua: Rua, bairro: Bairro, cidade: Cidade, UF: UF, haveNote: haveNote == "true",
                haveInternetHouse: haveInternetHouse == "true", nome: nome, renda: Number(renda.replace(",", ".")), pessoas: pessoas, numeroCasa: numeroCasa,
                complemento: complemento
            });
            if (response.status === 200) {
                if (response.data.mensagem === "Dados atualizados com sucesso.") {
                    toast.success("Perfil atualizado com sucesso!");
                    return;
                }
                if (response.data.mensagem === "CPF já existe no banco.") {
                    toast.warn("Este CPF já possui um cadastro associado.");
                    return;
                } else {
                    toast.error("Algo deu errado, por favor tente novamente ou contate o suporte!");
                    return;
                }
            }
        } catch (error) {
            toast.error("Erro na requisição. Por favor, tente novamente ou contate o suporte.");
        } finally {
            setLoadingAuth(false);
        }
    };

    const handleSobreMim = async () => {
        try {
            await api.put("Dashboard/EditarSobreMim", { sobreMim: sobreMim }).then((response) => {
                if (response.status == 204)
                    toast.success("Sobre mim atualizado com sucesso!")
                window.location.reload();
            })
        }
        catch (error) {
            toast.error("Algo deu errado, por favor tente novamente ou contate o suporte!")
        }

    }

    const [motivoSelecionado, setMotivoSelecionado] = useState('');

    const handleRadioChange = (event) => {
        setMotivoSelecionado(event.target.value);
    };

    const cancelarPlano = async () => {
        try {
            if (!motivoSelecionado) {
                toast.warn('Selecione um motivo para o cancelamento.');
                return;
            }

            const response = await api.delete('/Pagamento/CancelarAssinatura', {
                data: {
                    cancelamentoCodigo: motivoSelecionado,
                    observacao: `Motivo do cancelamento: ${motivoSelecionado}`
                }
            });

            if (response.status === 200) {
                if (response.data.mensagem === 'success')
                    toast.success('Plano cancelado com sucesso!');
                else
                    toast.error('Erro ao cancelar o plano.');
            } else {
                toast.error('Erro ao cancelar o plano.');
            }
        } catch (error) {
            toast.error('Erro ao cancelar o plano.');
        }
    };

    return (
        <div>
            <HeaderAluno />
            <div className="body-dashboard">
                <img className="capa" src={capaDashboard} />

                <div class="conteudo-dashboard">
                    <div className="left-dashboard">
                        <div className="dashboard-perfil blocos-dashboard">
                            <img src={fotoperfil == null ? avatar : fotoperfil} />
                            <h1 >{nome}</h1>
                            <h6 >{cargo}</h6>
                            <span><IoLocationSharp />{Cidade} - {UF == null ? ' ' : estados.find(x => x.codigo == UF).sigla}</span>
                            <button type="button" class="botao-azul botao-cadastro" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar perfil</button>
                            <span className="divisao-dashboard"></span>
                            <p>MEMBRO DESDE: {dataCriacao} </p>
                        </div>

                        <Link to={`/dashboard/meus-certificados`} className='btn-certificado'><button className='btn btn-secondary'><PiCertificate/> Meus Certificados</button></Link>

                        <div className="dashboard-bloco-pequeno">
                            <div className="bloco-plano blocos-dashboard">
                                <h2>Assinatura</h2>
                                <div>
                                    <p>Plano:</p>
                                    <h1>{plano}</h1>
                                </div>
                                <div>
                                    <p>Valor:</p>
                                    <h1>{typeof (valorPlano) == 'number' ? `R$${valorPlano},00` : valorPlano}</h1>
                                </div>
                                <div>
                                    <p>Validade:</p>
                                    <h1>{validade}</h1>
                                </div>
                                <div>
                                    {proxPag ? <><p>Próximo pagamento:</p><h1>{proxPag}</h1></> : ""}
                                </div>

                                {plano == "Curso Online Mensal" ? <button data-bs-toggle="modal" data-bs-target="#ModalCancelar">Cancelar</button> : ""}
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-rede blocos-dashboard">
                        <h1>Classificação semanal</h1>
                        <div className='rede-overflow'>
                            {rede.map((user, index) => {
                                const classificacao = index + 1;
                                return (
                                    <div className="rede" key={user.nome.codigo}>
                                        <h6>{classificacao}º</h6>
                                        <img src={"https://api.varsolutions.com.br/images/image_Aluno/" + user.nome.urlFoto} />
                                        <div>
                                            <p>{user.nome.nome}</p>
                                            <p className='rede-line'>
                                                <span>{user.nome.cargo}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='dashboard-sobre-mim' style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="bloco-sobre-mim blocos-dashboard">
                            <MdModeEdit data-bs-toggle="modal" data-bs-target="#exampleModal2" />
                            <h1>Sobre mim</h1>
                            <p>{sobreMim}</p>
                        </div>

                        <div className='bloquinhos'>
                            {aulaassis == null ? "" : <p>Aulas assistidas<h1>{aulaassis}</h1></p>}
                            {qtdComentarios == null ? "" : <p>Comentários<h1>{qtdComentarios}</h1></p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className='modal-dashboard'>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={handleModalClose}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content modal-dialog-scrollable">
                            <div class="modal-header">
                                <h5 class="modal-title">Editar perfil</h5>
                                <div className='presencial-botao'>
                                    {<button className='botao-modal-dashboard2 botao-inscricao' onClick={handleCadastro} disabled={loadingAuth}>
                                        {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Salvar"}
                                    </button>}
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <img className='modal-body-capa' src={capaDashboard} />
                                <div className='conteudo-modal-body'>
                                    <div className="label-avatar">
                                        <FiUpload onClick={handleImageClick} color="#fff" size={25} />
                                        <img src={fotoperfil == null ? avatar : fotoperfil} className='imgperfil' />
                                        <button className='botao-upload' onClick={handleFormSubmit} type="button">Carregar foto</button>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }} />
                                    <div>
                                        {sumirRenda != null && <p className='sumir-renda'>Para alterar os campos de <strong>renda familiar</strong>, <strong>quantidade de pessoas</strong> e <strong>mensalidade</strong> procure a administração!</p>}

                                        {/* {turma === 0 ?
                                            ""
                                            : <div className='input-modal'>  <label>Turma</label>
                                                <p style={{ marginBottom: '0' }}>{turmas.find(x => x.codigo == turma).desc}</p>
                                            </div>} */}

                                        <div className='input-modal'>
                                            <label>Qual é a sua renda familiar?</label>
                                            <div>
                                                R$
                                                <input type="text" value={renda} onChange={handleChange14} disabled={sumirRenda != null} />
                                            </div>
                                        </div>

                                        <div className='input-modal'>
                                            <label>Quantas pessoas moram na sua casa?</label>
                                            <input type="number" max={100} value={pessoas} onChange={handleChange15} disabled={sumirQntd != null} />
                                        </div>

                                        <div className='input-modal'>
                                            <label>Mensalidade:</label>
                                            <input type="text" readOnly value={mensalidade} />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Nome</label>
                                            <input type="text" value={nome} onChange={handleNome} maxLength={42} />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Atividade profissional </label>
                                            <input type="text" value={cargo} onChange={handlecargo} placeholder='Ex: Desenvolvedor de Software' />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Telefone</label>
                                            <input type="text" id="telefone" maxLength={12} name="telefone" value={telefone} onChange={handleChange} placeholder='Digite seu telefone' />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Data de nascimento</label>
                                            <input
                                                type="date"
                                                id="data_nascimento"
                                                name="data_nascimento"
                                                value={data_nascimento}
                                                onChange={handleChange1}
                                            />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Gênero</label>
                                            <select className='select-dashboard presencial-input' id="genero" name="genero" value={Gênero} onChange={handleChange4}>
                                                <option value="0">Selecionar</option>
                                                <option value="1">Masculino</option>
                                                <option value="2">Feminino</option>
                                                <option value="3">Não Binário</option>
                                            </select>
                                        </div>
                                        <div className='input-modal'>
                                            <label>Cor</label>
                                            <select className='select-dashboard presencial-input' id="raca" name="raca" value={Cor} onChange={handleChange5}>
                                                <option value="0">Selecionar</option>
                                                <option value="1">Branco(a)</option>
                                                <option value="2">Negro(a)</option>
                                                <option value="3">Pardo(a)</option>
                                                <option value="4">Amarelo(a)</option>
                                                <option value="5">Outro(a)</option>
                                            </select>
                                        </div>
                                        <div className='input-modal'>
                                            <label>RG</label>
                                            <input type="text" maxlength="12" id="rg" name="rg" value={RG} onChange={handleChange2} placeholder='Digite seu RG' />
                                        </div>
                                        <div className='input-modal'>
                                            <label>CPF</label>
                                            <input type="text" id="cpf" name="cpf" value={CPF} onChange={handleChange3} placeholder='Digite seu CPF' />
                                        </div>
                                        <div className='input-modal'>
                                            <label>CEP</label>
                                            <input type="text" id="cep" name="cep" maxlength="9" value={CEP} onBlur={cep} onChange={handleChange6} placeholder='Digite seu CEP' />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Rua</label>
                                            <input type="text" id="rua" name="rua" readOnly={isCEP} value={Rua} onChange={handleChange7} placeholder='Digite sua rua' />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Bairro</label>
                                            <input type="text" id="bairro" name="bairro" readOnly={isCEP} value={Bairro} onChange={handleChange8} placeholder='Digite seu bairro' />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Cidade</label>
                                            <input type="text" id="cidade" name="cidade" readOnly={isCEP} value={Cidade} onChange={handleChange9} placeholder='Digite sua cidade' />
                                        </div>
                                        <div className='input-modal'>
                                            <label>UF</label>
                                            <select className='select-dashboard presencial-input' id="uf" name="uf" value={UF} disabled={isCEP ? "disable" : ""} aria-disabled={isCEP} onChange={handleChange10}>
                                                <option>Selecionar</option>
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
                                        <div className='input-modal'>
                                            <label>Nº residencial</label>
                                            <input type="text" placeholder='Digite seu número residencial' value={numeroCasa} onChange={handleChangeNumero} />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Complemento</label>
                                            <input type="text" placeholder='Digite o complemento' value={complemento} onChange={handlechangeComplemento} />
                                        </div>
                                        <div className='input-modal'>
                                            <label>Você possui um computador?</label>
                                            <select className='select-dashboard presencial-input' id="possui_computador" name="possui_computador" required value={haveNote.toString()} onChange={handleChange11}>
                                                <option>Selecionar</option>
                                                <option value="true">Sim</option>
                                                <option value="false">Não</option>
                                            </select>
                                        </div>
                                        <div className='input-modal'>
                                            <label>Voce possui acesso à internet em casa?</label>
                                            <select className='select-dashboard presencial-input' id="possui_internet" name="possui_internet" required value={haveInternetHouse.toString()} onChange={handleChange12}>
                                                <option>Selecionar</option>
                                                <option value="true">Sim</option>
                                                <option value="false">Não</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='modal-dashboard modal-dashboard2'>
                <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Sobre mim</h5>
                                <div className='presencial-botao'>
                                    <button className='botao-modal-dashboard2 botao-inscricao' onClick={handleSobreMim}>Enviar</button>
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body2 modal-body">
                                <div className='input-modal' >
                                    <label>Digite sobre você...</label>
                                    <textarea value={sobreMim} onChange={handleChangeSobremim}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="modal-cancelar-plano modal-dashboard modal fade" id="ModalCancelar" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content1 modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body-cancelar1 modal-body">
                            <AiOutlineInfoCircle />
                            <h6>Tem certeza de que deseja cancelar o seu plano?</h6>
                            <p>Ao cancelar, você perderá o acesso aos recursos e benefícios do plano.</p>
                            <button className="btn-prosseguir" data-bs-target="#ModalCancelar2" data-bs-toggle="modal">Prosseguir</button>
                            <button className="btn-voltar" data-bs-dismiss="modal">Voltar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-cancelar-plano modal-dashboard modal fade" id="ModalCancelar2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body-cancelar2 modal-body">
                            <p>Antes de cancelar, compartilhe conosco o porquê:</p>
                            <div>
                                <label><input type="radio" name="opcao" value="1" onChange={handleRadioChange} />Não era o que eu esperava.</label>
                                <label><input type="radio" name="opcao" value="2" onChange={handleRadioChange} />Problemas técnicos.</label>
                                <label><input type="radio" name="opcao" value="3" onChange={handleRadioChange} />Falta de tempo.</label>
                                <label><input type="radio" name="opcao" value="4" onChange={handleRadioChange} />Razões financeiras.</label>
                                <label><input type="radio" name="opcao" value="5" onChange={handleRadioChange} />Mudança de planos.</label>
                                <label><input type="radio" name="opcao" value="6" onChange={handleRadioChange} />Problemas de comunicação.</label>
                                <label><input type="radio" name="opcao" value="7" onChange={handleRadioChange} />Questões de qualidade.</label>
                                <label><input type="radio" name="opcao" value="8" onChange={handleRadioChange} />Problemas de Acesso.</label>
                            </div><br />
                            <button className="btn-cancelar" onClick={cancelarPlano}>CANCELAR PLANO</button>
                            <button className="btn-voltar" data-bs-target="#ModalCancelar" data-bs-toggle="modal">Voltar</button>
                        </div>
                    </div>
                </div>
            </div>

            <ModalSuporte />


            {/* <div className="modal-certificado modal-atraso modal fade" id="exampleModalCertificado" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <table className="table" style={{color: 'white'}}>
                               

                               
                                <thead style={{color: 'white'}}>
                                    <tr>
                                        <th style={{color: 'white'}}>Nome</th>
                                        <th style={{color: 'white'}}>Nome do certifica ou modulo sla</th>
                                        <th style={{color: 'white'}}>Baixar certificado</th>
                                    </tr>
                                </thead>
                                {obterCertificados.map((certi) => (
                                <tbody>
                                    <tr>
                                        <td style={{color: 'white'}}>{certi.nome}</td>
                                        <td style={{color: 'white'}}>{certi.modulo}</td>
                                        <td>
                                          <a href={certi.urlCertificado} target='_blank'><button className="btn btn-primary">Baixar</button></a>  
                                        </td>
                                    </tr>   
                                </tbody>
                                 ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}