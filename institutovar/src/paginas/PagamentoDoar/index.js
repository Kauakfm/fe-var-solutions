import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api'
import './pagamento-doar.css';
import HeaderPrincipal from '../../componentes/HeaderPrincipal';

import { BiSolidLock } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import pix from '../../imagens/icon/pix.png';
import qrcode from '../../imagens/var/qrcode-pix.jpg';
import visa from '../../imagens/icon/VISA.png';
import mastercard from '../../imagens/icon/MASTERCARD.png';
import elo from '../../imagens/icon/ELO.png';
import hipercard from '../../imagens/icon/HIPERCARD.png';
import rocket from '../../imagens/rocket.png';
import seloPag from '../../imagens/seloPagarX.png'
import { useNavigate } from 'react-router-dom';

export default function PagamentoDoar() {
    const navigate = useNavigate();
    const url = 'Pagamento/Doar'

    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip_code, setZip_code] = useState('');
    const [line_1, setLine_1] = useState('');
    const [line_2, setLine_2] = useState('');
    const [numerocasa, setNumerocasa] = useState('');
    const [area_code, setArea_code] = useState('');
    const [number, setNumber] = useState('');
    const [numero, setNumero] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [document, setDocument] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [valor, setValor] = useState('');
    const [numberCard, setNumberCard] = useState('');
    const [expdate, setExpdate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isCPFValid, setIsCPFValid] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const ref = useRef(null);

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
    const handleChange4 = (event) => {
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

        setValor(valor);
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
        setIsCPFValid(validarCPF(selectedValue));
    }
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
    const handleChange12 = (event) => {
        const selectedValue = event.target.value;
        setEmail(selectedValue);
    }
    const handleChange13 = (event) => {
        const selectedValue = event.target.value;
        setGender(selectedValue);
    }
    const handleChange14 = (event) => {
        const selectedValue = event.target.value;
        const resultado = selectedValue.replace(/[^\p{L}\s]/gu, '');

        setName(resultado);
    }
    const handleChange15 = (event) => {
        const selectedValue = event.target.value;
        setType(selectedValue);
    }
    const handleChange16 = (event) => {
        const selectedValue = event.target.value;

        const cleanedInput = selectedValue.replace(/\D/g, '');

        let formattedInput = cleanedInput.replace(/^(\d{2})(\d{0,2})(\d{0,4})/, (match, p1, p2, p3) => {
            if (p2 === '') {
                return p1;
            } else if (p3 === '') {
                return p1 + '/' + p2;
            } else {
                return p1 + '/' + p2 + '/' + p3;
            }
        });

        setBirthdate(formattedInput);
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

            // toast.success(`Você mora em ${data.localidade}`)
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

    const validarEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    const handleparseDate = (data) => {
        const date = data.split('/');
        const dataformatada = `${date[2]}-${date[1]}-${date[0]}`;

        return dataformatada;
    }

    const handleDoar = async () => {
        try {
            if (name == '') {
                toast.warn("Preencha o campo nome completo.")
                return;
            }
            if (numberCard == '') {
                toast.warn("Preencha o campo número do cartão.");
                return;
            }
            if (expdate == '') {
                toast.warn("Preencha o campo data de validade.");
                return;
            }
            if (cvv == '') {
                toast.warn("Preencha o campo CVV.")
                return;
            }
            if (zip_code == '') {
                toast.warn("Preencha o campo CEP.");
                return;
            }
            if (numerocasa == '') {
                toast.warn("Preencha o campo de número residencial.");
                return;
            }
            if (type == 0) {
                toast.warn("Selecione o campo tipo de cliente.");
                return;
            }
            if (document == 0) {
                toast.warn("Preencha o campo CPF.");
                return;
            }
            if (number == 0) {
                toast.warn("Preencha o campo telefone.");
                return;
            }
            if (gender == 0) {
                toast.warn("Selecione o campo gênero.");
                return;
            }
            if (birthdate == 0) {
                toast.warn("Preencha o campo data de nascimento.")
                return;
            }
            if (email == '') {
                toast.warn("Preencha o campo e-mail.")
                return;
            }
            if (!validarCartaoCredito(numberCard)) {
                toast.warn("Cartão inválido.");
                return;
            }
            if (parseInt(expdate.split("/")[0]) > 12) {
                toast.warn("O mês da data de validade do cartão é inválida.")
                return;
            }
            if (parseInt("20" + expdate.split("/")[1].toString()) < new Date().getFullYear()) {
                toast.warn("O ano da data de validade do cartão é inválida.")
                return;
            }
            if (cvv.length != 3) {
                toast.warn("O CVV do cartão é inválido.")
                return;
            }
            if (!validacep(zip_code)) {
                return;
            }
            if (!validarCPF(document)) {
                toast.warn("CPF inválido.");
                return;
            }
            if (numero.length < 14) {
                toast.warn("Número de telefone inválido, verifique o número e o DDD.")
                return;
            }
            if (!validarEmail(email)) {
                toast.warn("E-mail inválido.")
                return;
            }

            await setLoadingAuth(true)

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
                customer_gender: gender,
                customer_birthdate: handleparseDate(birthdate),
                payments_credit_card_card_number: numberCard,
                payments_credit_card_card_holder_name: name,
                payments_credit_card_card_exp_month: expdate.split("/")[0],
                payments_credit_card_card_exp_year: expdate.split("/")[1],
                payments_credit_card_card_cvv: cvv,
                items_0_amount: Math.round(parseFloat(valor.replace(",", ".")) * 100),
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
                        setArea_code('')
                        setBirthdate('')
                        setCity('')
                        setCvv('')
                        setDocument('')
                        setEmail('')
                        setExpdate('')
                        setGender('')
                        setLine_1('')
                        setLine_2('')
                        setName('')
                        setNumber('')
                        setNumberCard('')
                        setNumero('')
                        setNumerocasa('')
                        setState('')
                        setType('')
                        setValor('')
                        setZip_code('')
                    })
            }
            catch (error) {
                toast.error("Algo deu errado, por favor, contate o suporte")
            }
            finally {
                await setLoadingAuth(false)
            }
        }
        catch (error) {
            toast.error("Algo deu errado, por favor, contate o suporte")
        }
    }

    const handleModalClose = () => {
        navigate("/");
    };

    return (
        <div className='body-pagamento-doar'>
            <HeaderPrincipal/>
            <BiSolidLock className='cadeado' />
            <h3>Escolha como você quer doar</h3>
            <p className='p1'>Sua doação é muito importante para transformarmos vidas com a tecnologia.</p>
            <p>Opções de pagamento:</p>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <div>
                                <p>Pix</p>
                                <img src={pix} className='pix' />
                            </div>
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <img src={qrcode} />
                            <div>
                                <p>Chave pix: <span>CNPJ: 50.874.861/0001-77</span></p>
                                <p>Após efetuar a doação, por gentileza, envie-nos o comprovante pelo WhatsApp <a href='https://api.whatsapp.com/send?phone=551151987389' target='_blank' rel="noreferrer">11 5198-7389</a> . Dessa forma, poderemos conhecê-lo(a) melhor e registrar sua contribuição em nossos registros.</p>
                                <p>Muito obrigado - Instituto Var Solutions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <div className='disabled'>
                                <p>Boleto</p>
                                <span><AiOutlineInfoCircle />Indisponível no momento</span>
                            </div>
                        </button>
                    </h2>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
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
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className='credito-formulario'>
                                <h3>Informe os dados do seu cartão de crédito </h3>
                                <div className='row formulario-pagamento'>
                                    <div className='col-md-8'>
                                        <input type="text" placeholder="Nome completo" value={name} onChange={handleChange14} />
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='pagamento-doar-valor'>
                                            R$
                                            <input type="text" min="1" maxlength="13" onChange={handleChange4} value={valor} placeholder='Valor' />
                                        </div>
                                    </div>
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
                                        <select onChange={handleChange15}>
                                            <option>Tipo de doador</option>
                                            <option value={"individual"}>Pessoa Física</option>
                                            <option value={"company"}>Pessoa Jurídica</option>
                                        </select>
                                    </div>
                                    <div className='col-md-4'>
                                        <input type="text" placeholder="CPF" onChange={handleChange11} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input type="tel" placeholder="Telefone" value={numero} onChange={handleChange2} />
                                    </div>
                                    <div className='col-md-4'>
                                        <select onChange={handleChange13}>
                                            <option value={""}>Gênero</option>
                                            <option value={"female"}>Feminino</option>
                                            <option value={"male"}>Masculino</option>
                                        </select>
                                    </div>
                                    <div className='col-md-5'>
                                        <input type='text' placeholder='Data de Nascimento' maxLength={10} value={birthdate} onChange={handleChange16} />
                                    </div>
                                    <div className='col-md-7'>
                                        <input type="email" placeholder='E-mail' onChange={handleChange12} />
                                    </div>
                                    <div className='col-md-12'>
                                        <img src={seloPag} style={{margin:"2% 0"}}/>
                                    </div>
                                    <button type="submit" onClick={handleDoar} disabled={loadingAuth}>
                                        {loadingAuth ? "Carregando" : "Enviar"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button hidden ref={ref} type="button" className='botao-inscricao' data-bs-toggle="modal" data-bs-target="#exampleModalDoar">modal</button>

            <div className='modal-doar'>
                <div className="modal fade" id="exampleModalDoar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={handleModalClose}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-body">
                            <img src={rocket} />
                            <h2>Toda contribuição faz a diferença!</h2>
                            <p>Agradecemos imensamente o seu apoio ao nosso instituto por meio da sua doação. Com o seu gesto generoso, estamos um passo mais perto de alcançar nossos objetivos e impactar positivamente a vida daqueles que mais precisam.</p>
                            <p>Não se esqueça de verificar a caixa de entrada do seu email para receber mais detalhes sobre a sua doação.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}