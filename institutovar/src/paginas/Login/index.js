import React, { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import api from '../../services/api';
import logo from '../../imagens/var/logo-var.png';
import logoQuadrado from '../../imagens/var/logo-circulo.png';
import './login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComponenteRedefinirSenha from '../../componentes/ComponenteRedefinirSenha';
import axios from 'axios';
import https from 'https';

export default function Login() {
    const url = "/autenticacao";
    const navigate = useNavigate();

    const [presenca, setPresencial] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [showRedefinirSenha, setShowRedefinirSenha] = useState(false);

    const handleLoad = () => {
        setPresencial("true")
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleChange2 = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        setLoadingAuth(true);

        try {
            let presencial = 'false';

            try {
                const agent = new https.Agent({  
                    rejectUnauthorized: false
                  });
                  
                const responselocal = await axios.get("https://servervar/Presenca",{ httpsAgent: agent });
                

                if (responselocal.status === 200) {
                    presencial = 'true';
                    setPresencial(presencial);
                    window.localStorage.setItem("26", "07")
                }

            } catch (error) {
                presencial = 'false';
                setPresencial(presencial);
            }

            const response = await api.post(url, { email, password, presencial });
            api.defaults.headers.authorization = `Bearer ${response.data.token}`;
            window.localStorage.setItem('usr_token', response.data.token);
            window.localStorage.setItem('usr_id', response.data.usuarioid);
            window.localStorage.setItem('usr_status', response.data.status);
            window.localStorage.setItem('usr_nome', response.data.nome);
            window.localStorage.setItem('usr_dataRecorrente', response.data.diaPagamentoCursoRecorrente);
            window.localStorage.setItem('usr_dataPresencial', response.data.diapagamentoPresencial);
            window.localStorage.setItem('usr_diasAtraso', response.data.diasEmAtraso);
            window.localStorage.setItem('usr_parcelasAtraso', response.data.parcelasEmAtraso);
            window.localStorage.setItem('usr_pagamentoEmDia', response.data.isPagamentosEmDia);
            window.localStorage.setItem('usr_ultimoAcesso', response.data.ultimoAcesso);
            const foto = response.data.urlFoto == null ? "avatar.png" : response.data.urlFoto
            window.localStorage.setItem('usr_foto', "https://api.varsolutions.com.br/images/image_Aluno/" + foto);

            if (response.status === 200) {
                if (presencial === "true")
                    api.get("Autenticacao/Presenca")
                navigate('/home');
                setEmail('');
                setPassword('');
            } else {
                throw new Error('Erro de solicitação: ' + response);
            }
        } catch (error) {
            toast.error("Email ou senha inválidos!")
        } finally {
            setLoadingAuth(false);
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const handleEsqueciMinhaSenha = () => {
        setShowRedefinirSenha(true);
    };

    return (
        <div className="body-inicio">
            <section>
                <img className="logo-var" src={logo}/>
                <Link to={`/`}><BsArrowLeftCircleFill/> Voltar</Link>
            </section>

            {showRedefinirSenha ? (
                <ComponenteRedefinirSenha />
            ) : (
                <div className="container-login">
                    <img className="logo-var-circulo" src={logoQuadrado} alt="Logo Circulo" />
                    <p style={{ fontWeight: '600' }}>Bem-vindo(a) de volta!</p>
                    <form onSubmit={handleFormSubmit}>
                        <label>E-mail:</label>
                        <div className="container-input">
                            <MdEmail />
                            <input type="email" value={email} onChange={handleChange} placeholder="Digite seu e-mail" />
                        </div>
                        <label>Senha:</label>
                        <div className="container-input">
                            <MdLock />
                            <input type="password" value={password} onChange={handleChange2} placeholder="Digite sua senha" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span onClick={handleEsqueciMinhaSenha}>Esqueci minha senha.</span>
                        </div>
                        <div className='botoes-login'>
                            <button type="submit" className="botao-azul" disabled={loadingAuth}>
                                {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Entrar"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
