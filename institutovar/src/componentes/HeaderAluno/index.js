import './headeraluno.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../imagens/var/logo.png';
import api from '../../services/api';
import React, { useState, useEffect, useRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { RiCloseLine } from 'react-icons/ri';
import { FaHome, FaChartBar, FaChartPie, FaSignOutAlt } from 'react-icons/fa';

export default function HeaderAluno(props = false) {
    const [niveisacesso, setNiveisacesso] = useState(["", "", ""])
    const [IsOnline, setIsOnline] = useState(false);
    const [secaoInicioLogo, setsecaoInicioLogo] = useState([])

    const nomeCompleto = (window.localStorage.getItem("usr_nome") || '').split(" ");
    const primeirosNomes = nomeCompleto.slice(0, 2).join(" ");

    const location = useLocation();
    const [currentScreen, setCurrentScreen] = useState('');
    const fotoperfil = window.localStorage.getItem('usr_foto')
    const navigate = useNavigate();
    const handleScreenChange = (screenName) => {
        setCurrentScreen(screenName);
    };
    const status = window.localStorage.getItem('usr_status');

    const handleawait = () => {
        setTimeout(function () {
            setNiveisacesso(status == 1 ? ["active", "active", "active"]
                : status == 3 ? ["active", "", "active"]
                    : status == 4 ? ["active", "", "active", "active"]
                        : status == 5 ? ["active", "active", "active"]
                            : status == 6 ? ["active", "", "active"]
                                : ["", "", ""])
        }, 1000);
    }
    const handlenotawait = () => {
        setNiveisacesso(status == 1 ? ["active", "active", "active"]
            : status == 3 ? ["active", "", "active"]
                : status == 4 ? ["active", "", "active", "active"]
                    : status == 5 ? ["active", "active", "active"]
                        : status == 6 ? ["active", "", "active"]
                            : ["", "", ""])
    }
    const handleTelaLogin = () => {
        api.defaults.headers.authorization = ``;
        window.localStorage.removeItem('usr_token');
        window.localStorage.removeItem('usr_id');
        window.localStorage.removeItem('usr_status');
        window.localStorage.removeItem('usr_nome');
        window.localStorage.removeItem('usr_unidade');
        window.localStorage.removeItem('usr_foto');
        window.localStorage.removeItem('usr_dataPresencial');
        window.localStorage.removeItem('usr_diasAtraso');
        window.localStorage.removeItem('usr_ultimoAcesso');
        window.localStorage.removeItem('usr_pagamentoEmDia');
        window.localStorage.removeItem('usr_dataRecorrente');
        window.localStorage.removeItem('usr_parcelasAtraso');
        window.localStorage.removeItem('26');
        window.localStorage.removeItem('0723');
        navigate("/login")
    }

    const HandleVerificarOnline = async () => {
        const response = await api.get('Dashboard/ObterDashboard');
        const responseData = response.data;
        if (responseData.unidadeCodigo === 3) {
            setIsOnline(true)
        }
    }

    useEffect(() => {
        handleObter();
        HandleVerificarOnline();
        if (props.espera == true)
            handleawait();

        else
            handlenotawait()
    }, [])

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const closeDropdown = () => {
        setDropdownOpen(false);
    };
    const handleObter = async () => {
        try {
            const response = await api.get('Estilizacao/ObterInicio');
            const responseData = response.data;

            const logoFiltrado = responseData.filter(item => item.codigoSecao === 1).filter(item => item.tipo === "Imagem Logo")
            setsecaoInicioLogo(logoFiltrado)
        } catch (error) {

        }
    }

    return (
        <div className='header-aluno'>
            {secaoInicioLogo.map((logo) => {
                return (
                    <Link to={`/home`}><img src={`https://api.varsolutions.com.br/images/telaInicio/${logo.valor}`} /></Link>
                )
            })
            }
            <section>
                {status === '5' ?
                    <div id='header-web' className="btn-adm dropdown">
                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Administrativo
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link to={`/administrativo/presenca`} className="dropdown-item">Presença</Link></li>
                            <li><Link to={`/administrativo/espera`} className="dropdown-item">Espera</Link></li>
                            <li><Link to={`/administrativo/convocados`} className="dropdown-item">Convocados</Link></li>
                            <li><Link to={`/administrativo/pagantes`} className="dropdown-item">Pagantes</Link></li>
                            <li><Link to={`/administrativo/vagas`} className="dropdown-item">Vagas</Link></li>
                            <li><Link to={`/administrativo/cursos`} className="dropdown-item">Adicionar trilha</Link></li>
                            <li><Link to={`/administrativo/sobreUnidade`} className="dropdown-item">Unidades</Link></li>
                            <li><Link to={`/administrativo/EstilizarSistema`} className="dropdown-item">Estilizar Home</Link></li>
                            <li><Link to={`/administrativo/homeAluno`} className="dropdown-item">Estilizar Home Aluno</Link></li>
                            <li><Link to={`/administrativo/EscolherEstilo`} className="dropdown-item">Escolher Estilo</Link></li>
                        </ul>
                    </div>
                    : ""}
                {niveisacesso[0] == "active" ? <Link to={`/home`} id='header-web' className={location.pathname === '/home' ? 'active' : ''} onClick={() => handleScreenChange('Home')}>Home</Link> : ""}
                {niveisacesso[1] == "active" ? <Link to={`/trilha`} id='header-web' className={location.pathname === '/trilha' ? 'active' : ''} onClick={() => handleScreenChange('Trilha')}>Trilha</Link> : ""}
                {niveisacesso[2] == "active" ? <Link to={`/dashboard`} id='header-web' className={location.pathname === '/dashboard' ? 'active' : ''} onClick={() => handleScreenChange('Dashboard')}>Dashboard</Link> : ""}
                <Link id='header-web' className='botao-suporte' data-bs-toggle="modal" data-bs-target="#ModalSuporte">Suporte <FaArrowUpRightFromSquare /></Link>
            </section>
            <div className='ultima-section'>
                <Link to={`/dashboard`} id='header-web'>{primeirosNomes}</Link>
                <Link to={`/dashboard`}><img id='header-web' src={fotoperfil} /></Link>
                <button id='header-web' className='btn-azul botao-suporte' onClick={handleTelaLogin}>Sair</button>
            </div>

            <FiMenu id='header-mobile' onClick={toggleDropdown} />
            <div ref={dropdownRef} className={`dropdown-overlay ${dropdownOpen ? 'open slide-in' : ''}`}>
                <div><RiCloseLine onClick={closeDropdown} /></div>
                <section>
                    <img src={fotoperfil} alt="Foto Perfil" />
                    <p>{primeirosNomes}</p>
                    {status === '5' ?
                        <div className="btn-adm dropdown">
                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Administrativo
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={`/administrativo/presenca`} className="dropdown-item">Presença</Link></li>
                                <li><Link to={`/administrativo/espera`} className="dropdown-item">Espera</Link></li>
                                <li><Link to={`/administrativo/convocados`} className="dropdown-item">Convocados</Link></li>
                                <li><Link to={`/administrativo/pagantes`} className="dropdown-item">Pagantes</Link></li>
                                <li><Link to={`/administrativo/vagas`} className="dropdown-item">Vagas</Link></li>
                                <li><Link to={`/administrativo/cursos`} className="dropdown-item">Adicionar trilha</Link></li>
                                <li><Link to={`/administrativo/sobreUnidade`} className="dropdown-item">Unidades</Link></li>
                                <li><Link to={`/administrativo/EstilizarSistema`} className="dropdown-item">Estilizar Home</Link></li>
                                <li><Link to={`/administrativo/homeAluno`} className="dropdown-item">Estilizar Home Aluno</Link></li>
                                <li><Link to={`/administrativo/EscolherEstilo`} className="dropdown-item">Escolher Estilo</Link></li>
                            </ul>
                        </div>
                        : ""}
                    {niveisacesso[0] === "active" && <Link to="/home">Home <FaHome /></Link>}
                    {niveisacesso[1] === "active" && <Link to="/trilha">Trilha <FaChartBar /></Link>}
                    {niveisacesso[2] === "active" && <Link to="/dashboard">Dashboard <FaChartPie /></Link>}
                    {IsOnline ? <Link className='botao-suporte' data-bs-toggle="modal" data-bs-target="#ModalSuporte">Suporte <FaArrowUpRightFromSquare /></Link> : ""}
                    <button className='btn-azul botao-suporte' onClick={handleTelaLogin}>Sair</button>
                </section>
            </div>
        </div>
    )
}