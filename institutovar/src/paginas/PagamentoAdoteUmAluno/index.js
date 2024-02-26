import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify';
import api from '../../services/api'
import HeaderPrincipal from '../../componentes/HeaderPrincipal';

import { BiSolidLock } from 'react-icons/bi';
import './pagamento-adotar.css';
import { AiOutlineInfoCircle, AiOutlineRight } from 'react-icons/ai';
import pix from '../../imagens/icon/pix.png';
import boleto from '../../imagens/icon/boleto.png';
import visa from '../../imagens/icon/VISA.png';
import mastercard from '../../imagens/icon/MASTERCARD.png';
import elo from '../../imagens/icon/ELO.png';
import hipercard from '../../imagens/icon/HIPERCARD.png';
import seloPag from '../../imagens/seloPagarX.png'

import '../PagamentoDoar/pagamento-doar.css';
import rocket from '../../imagens/rocket.png';
import { Link, useNavigate } from 'react-router-dom';

export default function PagamentoAdoteUmAluno() {
    const url = '/Pagamento/Adotar'
    const ref = useRef(null);

    const navigate = useNavigate();

    const meses = [
        { codigo: 1, nome: "Janeiro" },
        { codigo: 2, nome: "Fevereiro" },
        { codigo: 3, nome: "Março" },
        { codigo: 4, nome: "Abril" },
        { codigo: 5, nome: "Maio" },
        { codigo: 6, nome: "Junho" },
        { codigo: 7, nome: "Julho" },
        { codigo: 8, nome: "Agosto" },
        { codigo: 9, nome: "Setembro" },
        { codigo: 10, nome: "Outubro" },
        { codigo: 11, nome: "Novembro" },
        { codigo: 12, nome: "Dezembro" },
    ];


    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip_code, setZip_code] = useState('');
    const [line_1, setLine_1] = useState('');
    const [numerocasa, setNumerocasa] = useState('');
    const [area_code, setArea_code] = useState('');
    const [number, setNumber] = useState('');
    const [numero, setNumero] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [document, setDocument] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [expdate, setExpdate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false);


    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const newValue = selectedValue.replace(/[^0-9\-]/g, '');
        setZip_code(newValue);
    };
    const handleChange2 = (event) => {
        const input = event.target.value;
        const newValue = input.replace(/[^0-9\-]/g, '');

        const areacode = newValue.slice(0, 2);
        setArea_code(areacode);

        const numbero = newValue.slice(-9);
        setNumber(numbero);

        setNumero(formatarNumeroTelefone(newValue));
    };
    const formatarNumeroTelefone = (numero) => {
        const numeros = numero.replace(/\D/g, '');

        const regexTelefone = /^(\d{2})(\d{5})(\d{4})$/;
        const numeroFormatado = numeros.replace(regexTelefone, '($1)$2-$3');

        return numeroFormatado;
    }


    const handleChange5 = (event) => {
        const selectedValue = event.target.value;
        setNumberCard(selectedValue);
    }
    const handleChange6 = (event) => {
        const selectedValue = event.target.value;
        let data = ''
        if (selectedValue[2] != null) {
            const array = selectedValue.split("")
            array.map((map, i) => {
                if (i == 2 && selectedValue[2] != '/')
                    data += '/'
                data += map
            })

            setExpdate(data);
        }
        else {
            setExpdate(selectedValue);
        }



    }
    const handleChange7 = (event) => {
        const selectedValue = event.target.value;
        setCvv(selectedValue);
    }
    // const handleChange8 = (event) => {
    //     const selectedValue = event.target.value;
    //     setExp_month(selectedValue);
    // }
    // const handleChange9 = (event) => {
    //     const selectedValue = event.target.value;
    //     setExp_month(selectedValue);
    // }
    const handleChange10 = (event) => {
        const selectedValue = event.target.value;
        setNumerocasa(selectedValue);
    }
    const handleChange11 = (event) => {
        const selectedValue = event.target.value;
        setDocument(selectedValue);
    }
    const handleChange12 = (event) => {
        const selectedValue = event.target.value;
        setEmail(selectedValue);
    }
    const handleChange14 = (event) => {
        const selectedValue = event.target.value;
        setName(selectedValue);
    }
    const handleChange15 = (event) => {
        const selectedValue = event.target.value;
        setType(selectedValue);
    }
    const cep = async () => {
        if (zip_code == '')
            return;
        try {
            const response = await fetch("https://viacep.com.br/ws/" + zip_code + "/json/");
            const data = await response.json();

            if ("erro" in data) {
                toast.warn("CEP não existe")
                return;
            }

            setLine_1(data.logradouro)
            setCity(data.localidade)
            setState(data.uf)

            return data;
        }
        catch (error) {
            setLine_1("")
            setCity("")
            setState("")
            toast.warn("O campo 'CEP' não está definido de forma correta.");
            return;
        }

    }
    const validacep = async (cep) => {
        if (cep == '')
            return false;
        try {
            const response = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
            const data = await response.json();

            if ("erro" in data) {
                toast.warn("CEP não existe")
                return false;
            }

            setLine_1(data.logradouro)
            setCity(data.localidade)
            setState(data.uf)

            return true;
        }
        catch (error) {
            setLine_1("")
            setCity("")
            setState("")
            toast.warn("O campo 'CEP' não está definido de forma correta.");
            return false;
        }

    }
    const validarCartaoCredito = (numeroCartao) => {
        const digitos = numeroCartao.replace(/\s/g, '').split('').map(Number);

        if (digitos.length < 2) {
            return false;
        }
        digitos.reverse();
        let soma = 0;
        for (let i = 0; i < digitos.length; i++) {
            let digito = digitos[i];

            if (i % 2 !== 0) {
                digito *= 2;

                if (digito > 9) {
                    digito -= 9;
                }
            }

            soma += digito;
        }

        return soma % 10 === 0;
    }

    const validarCPF = (cpf) => {
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

    const validarEmail = (email) => {
        // Expressão regular para verificar o formato do e-mail
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
    const handleAdotar = async () => {

        try {
            if (numberCard == '') {
                toast.warn("Campo número do cartão está vazio.")
                return;
            }
            if (expdate == '') {
                toast.warn("Campo data de validade está vazio.")
                return;
            }
            if (cvv == '') {
                toast.warn("Campo CVV está vazio.")
                return;
            }
            if (zip_code == '') {
                toast.warn("Campo CEP está vazio.")
                return;
            }
            if (numerocasa == '') {
                toast.warn("Campo Nº está vazio.")
                return;
            }
            if (name == '') {
                toast.warn("Campo nome está vazio.")
                return;
            }
            if (type == '') {
                toast.warn("Campo tipo de cliente está vazio.")
                return;
            }
            if (document == '') {
                toast.warn("Campo CPF está vazio.")
                return;
            }
            if (number == '') {
                toast.warn("Campo telefone está vazio.")
                return;
            }
            if (email == '') {
                toast.warn("Campo email está vazio.")
                return;
            }
            if (!validarCartaoCredito(numberCard)) {
                toast.warn("Cartão de crédito inválido")
                return;
            }

            if (parseInt(expdate.split("/")[0]) > 12) {
                toast.warn("O mês da data de validade do cartão é inválida")
                return;
            }
            if (parseInt("20" + expdate.split("/")[1].toString()) < new Date().getFullYear()) {
                toast.warn("O ano da data de validade do cartão é inválida")
                return;
            }
            if (cvv.length != 3) {
                toast.warn("O CVV do cartão é inválida")
                return;
            }

            if (!validacep(zip_code)) {
                return;
            }
            if (numero.length < 14) {
                toast.warn("Número de telefone inválido, verifique o número e o DDD")
                return;
            }
            if (!validarEmail(email)) {
                toast.warn("E-mail inválido")
                return;
            }

            await setLoadingAuth(!loadingAuth);

            const data = {
                customer_address_state: state,
                customer_address_city: city,
                customer_address_zip_code: zip_code,
                customer_address_line_1: line_1,
                customer_address_line_2: numerocasa,
                customer_phones_mobile_phone_area_code: area_code,
                customer_phones_mobile_phone_number: number,
                customer_name: name,
                customer_type: type,
                customer_email: email,
                customer_document: document,
                payments_credit_card_card_number: numberCard,
                payments_credit_card_card_holder_name: name,
                payments_credit_card_card_exp_month: expdate.split("/")[0],
                payments_credit_card_card_exp_year: expdate.split("/")[1],
                payments_credit_card_card_cvv: cvv,
            };


            const params = new URLSearchParams();

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    params.append(key, data[key]);
                }
            }
            try {
                await api.post(url, params,
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded' }
                    }).then((response) => {
                        if (response.status == 200)
                            ref.current.click()
                    })
            }
            catch (error) {
                toast.error("Algo deu errado, por favor, contate o suporte.")
            }
        }
        catch (error) {
            toast.error("Algo deu errado, por favor tente novamente.")
        }
        finally {
            setLoadingAuth(false);

        }
    }
    const handleModalClose = () => {
        navigate("/");
    };


    return (
        <div className='body-pagamento-adote-um-aluno'>
            <HeaderPrincipal/>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to={`/adote-um-aluno`}>Adotar</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Pagamento</li>
                </ol>
            </nav>
            <BiSolidLock className='cadeado' />
            <h3>Escolha como você quer pagar</h3>
            <p>Opções de pagamento:</p>
            <div className='container-opcao'>
                <div>
                    <p>Pix</p>
                    <img src={pix} className='pix' />
                    <span><AiOutlineInfoCircle /> Indisponível no momento</span>
                </div>
                <AiOutlineRight />
            </div>
            <div className='container-opcao'>
                <div>
                    <p>Boleto</p>
                    <img src={boleto} className='boleto' />
                    <span><AiOutlineInfoCircle /> Indisponível no momento</span>
                </div>
                <AiOutlineRight />
            </div>
            <div className="accordion" id="accordionExample"  >
                <div class="accordion-item" data-bs-parent="accordionExample">
                    <h2 class="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#collapseThree" aria-controls="collapseThree">
                            <div>
                                <p>Cartão de crédito</p>
                            </div>
                            <div className='cartoes-credito'>
                                <img src={visa} />
                                <img src={mastercard} />
                                <img src={elo} />
                                <img src={hipercard} />
                            </div>
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="accordionExample">
                        <div class="credito-formulario accordion-body">
                            <div className='row formulario-pagamento'>
                                <h3>Informe os dados do seu cartão de crédito </h3>
                                <div className='col-md-5'>
                                    <input type="text" placeholder="Número do Cartão" onChange={handleChange5} />
                                </div>
                                <div className='col-md-4'>
                                    <input type="text" placeholder="Data de Validade" maxlength="5" value={expdate} onChange={handleChange6} />
                                </div>
                                <div className='col-md-3'>
                                    <input type="text" maxlength="3" placeholder="CVV" onChange={handleChange7} />
                                </div>
                                <div className='col-md-4'>
                                    <input type="text" placeholder="CEP" value={zip_code} maxLength={9} onBlur={cep} onChange={handleChange} />
                                </div>
                                <div className='col-md-4'>
                                    <input type="text" placeholder="Nº residencial" value={numerocasa} maxLength={9} onChange={handleChange10} />
                                </div>
                                <div className='col-md-4'>
                                    <input type="text" placeholder="CPF" value={document} onChange={handleChange11} />
                                </div>
                                <div className='col-md-7'>
                                    <input type="text" placeholder="Nome completo" onChange={handleChange14} />
                                </div>
                                <div className='col-md-5'>
                                    <select onChange={handleChange15}>
                                        <option >Tipo de pessoa</option>
                                        <option value={"individual"}>Pessoa Física</option>
                                        <option value={"company"}>Pessoa Jurídica</option>
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <input type="tel" placeholder="Telefone" maxLength={14} value={numero} onChange={handleChange2} />
                                </div>
                                <div className='col-md-6'>
                                    <input type="email" placeholder='E-mail' onChange={handleChange12} />
                                </div>
                                <div className='summary col-md-8'>
                                    <h5>Detalhes da compra</h5>
                                    <p><strong>Preço:</strong> R$ 199,00/mês, por 10 parcelas</p>
                                    <p><strong>Começa em:</strong> {new Date().getDate()}  de {meses.find(x => x.codigo == (new Date().getMonth() + 1)).nome} de {new Date().getFullYear()}</p>
                                    <p className='total-diviser'></p>
                                    <p className='total-di'><strong>Total:</strong> R$ 1.990,00</p>
                                </div>
                                <div className='col-md-4 centerflex'>
                                    <img src={seloPag}/>
                                </div>
                                <button type="submit" disabled={loadingAuth} onClick={handleAdotar}>
                                    {loadingAuth ? "Carregando..." : "Enviar"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button hidden ref={ref} type="button" className='botao-inscricao' data-bs-toggle="modal" data-bs-target="#exampleModalAdotar">modal</button>

            <div className='modal-doar'>
                <div className="modal fade" id="exampleModalAdotar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={handleModalClose}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                            <img src={rocket} />
                            <h2>A sua contribuição é fundamental!</h2>
                            <p>Expressamos nossa profunda gratidão pelo seu valioso apoio ao nosso Instituto através da sua adoção. Com o seu gesto generoso, estamos cada vez mais próximos de alcançar nossos objetivos e fazer uma diferença positiva na vida daqueles que mais precisam.</p>
                            <p>Não deixe de verificar a sua caixa de entrada de e-mails para receber mais detalhes sobre a sua adoação.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}