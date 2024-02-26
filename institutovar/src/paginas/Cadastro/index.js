import './cadastro.css';

import React, { useState, useRef } from 'react';
import logoVar from '../../imagens/var/logo.png';
import { MdEmail, MdLock } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { BsPersonFillAdd } from "react-icons/bs";
import api from '../../services/api';
import logo from '../../imagens/var/logo2.svg';
import logoQuadrado from '../../imagens/var/logo3.png';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function Cadastro() {
    const ref = useRef(null);

    const url = "Cadastro/CadastrarUsuario";

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loadingAuth, setLoadingAuth] = useState(false);

    const handleChange = (event) => {
        setNome(event.target.value);
    };

    const handleChange1 = (event) => {
        setEmail(event.target.value);
    };

    const handleChange2 = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };


    const handleCadastro = async () => {
        
            if (nome == ''){
                toast.warn("Preencha o campo nome.")
                return;
            }
            
            if (email == ''){
                toast.warn("Preencha o campo e-mail.")
                return;
            }
            
            if (password == ''){
                toast.warn("Preencha o campo senha.")
                return;
            }
            
            if (confirmPassword == ''){
                toast.warn("Preencha o campo de confirmação de senha.")
                return ;
            }
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem!")
            return;
        }
        setLoadingAuth(true);
        try {
            window.localStorage.setItem('usr_nome', nome);
            const response = await api.post(url, { nome: nome, email: email, senha: password });

            if (response.status === 204) {
                setNome('')
                setEmail2(email)
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                ref.current.click();
            }
            
            else {
                toast.error("Não foi possivel realizar o seu cadastro.")
            }
        }
        catch (error) {
            toast.error("Este e-mail já foi cadastrado!")
        }
        finally {
            setLoadingAuth(false);
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleCadastro();
    };

    return (
        <div className="body-cadastro body-inicio">
            <img className="logo-var" src={logo} />
            <div className="container-cadastro container-login">
                {/* <div className="cadastro-icon"><BsPersonFillAdd /></div> */}
                <img className="logo-var-circulo" src={logoQuadrado} alt="Logo Circulo" />
                <p>Crie sua conta</p>
                <form className='cadastro-form' onSubmit={handleFormSubmit}>
                    <label>Nome completo:</label>
                    <div className="container-input">
                        <IoPerson />
                        <input type="text" value={nome} onChange={handleChange} placeholder="Digite seu nome" />
                    </div>
                    <label>E-mail:</label>
                    <div className="container-input">
                        <MdEmail />
                        <input type="email" value={email} onChange={handleChange1} placeholder="Digite seu e-mail" />
                    </div>
                    <label>Senha:</label>
                    <div className="container-input">
                        <MdLock />
                        <input type="password" value={password} onChange={handleChange2} placeholder="Crie sua senha"/>
                    </div>
                    <label>Confirmar senha:</label>
                    <div className="container-input">
                        <MdLock />
                        <input type="password" value={confirmPassword} onChange={handleChangeConfirmPassword} placeholder="Confirme sua senha" />
                    </div>
                    <span style={{color: '#fff', fontSize: '0.8rem', textDecoration: 'underline'}}><Link to={`/login`} style={{color: '#fff'}}>Já tenho conta. Fazer login.</Link></span>
                    <div className='botoes-login'>
                        <button className="botao-azul" type="submit" disabled={loadingAuth}>
                            {loadingAuth ? <div className="spinner-border-sm spinner-border" role="status"></div> : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>

            <div className='modal-parabens'>
                <button hidden ref={ref} type="button" class="botao-azul botao-cadastro" data-bs-toggle="modal" data-bs-target="#exampleModal">Cadastrar</button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <img src={logoQuadrado} />
                                <h2>Parabéns!</h2>
                                <h6>Seu cadastro foi concluído com sucesso!</h6>
                                <p>Enviamos um email para o endereço <a href='#'>{email2}</a><br></br> com um link de confirmação.<br></br> Por favor, verifique sua caixa de entrada e clique no link para confirmar seu email.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}