import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './headerprincipal.css';

import logo from '../../imagens/var/logo.png'
import {FiMenu} from 'react-icons/fi';
import {RiCloseLine} from 'react-icons/ri';
import api from '../../services/api';

import { FaHome, FaMousePointer, FaDonate, FaUserPlus } from 'react-icons/fa';

export default function HeaderPrincipal(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [currentScreen, setCurrentScreen] = useState('');
    const [secaoInicioLogo, setsecaoInicioLogo] = useState([])
    const location = useLocation();

    const handleScreenChange = (screenName) => {
        setCurrentScreen(screenName);
    };

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

    useEffect(() => {
        handleObter();
    }, [])

    return(
        <div className='header-principal'>
            {secaoInicioLogo.map((logo) => {
                return( 
            <Link to={`/`}><img src={`https://api.varsolutions.com.br/images/telaInicio/${logo.valor}`}/></Link>
            )
        })}
            <section>
                <Link id='header-web' to={`/`} className={location.pathname === '/' ? 'active' : 'hover'} onClick={() => handleScreenChange('Home')}>Home</Link>
                <Link id='header-web' to={`/planos`} className={location.pathname === '/planos' ? 'active' : 'hover'} onClick={() => handleScreenChange('Quero participar')}>Matricule-se</Link>
                <Link id='header-web' to={`/doar`} className={location.pathname === '/doar' ? 'active' : 'hover'} onClick={() => handleScreenChange('Doar')}>Doar</Link>
                <Link id='header-web' to={`/adote-um-aluno`} className={location.pathname === '/adote-um-aluno' ? 'active' : 'hover'} onClick={() => handleScreenChange('Adotar')}>Adotar</Link>
            </section>

            <Link id='header-web' to={`/login`}><button>Entrar</button></Link>

            <FiMenu id='header-mobile' onClick={toggleDropdown}/>
            <div ref={dropdownRef} className={`dropdown-overlay ${dropdownOpen ? 'open slide-in' : ''}`}>
                <div><RiCloseLine onClick={closeDropdown}/></div>
                <section>
                    <Link to={`/`}>Home <FaHome/></Link>
                    <Link to={`/planos`}>Matricule-se<FaMousePointer/></Link>
                    <Link to={`/doar`}>Doar <FaDonate/></Link>
                    <Link to={`/adote-um-aluno`}>Adotar <FaUserPlus/></Link>
                    <Link to={`/login`}><button>Entrar</button></Link>
                </section>
            </div>
        </div>
    )
}