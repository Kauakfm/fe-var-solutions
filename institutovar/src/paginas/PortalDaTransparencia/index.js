import React from 'react';
import './portal.css';
import Footer from '../../componentes/Footer';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import HeaderPrincipal from '../../componentes/HeaderPrincipal';

export default function Login() {
    return (
        <div className="body-portal">
            <HeaderPrincipal/>
            <div className='portal-conteudo'>
                <h1 id='balancete'>Portal da Transparência</h1>
                <div>
                    <h3>Balancete</h3>
                    <li><a href='#'>2023</a></li>
                    <ul>
                        <li><a href='#'>Agosto</a></li>
                        <AiOutlineInfoCircle/><span>EM CONSTRUÇÃO</span>
                    </ul>
                    <ul>
                        <li><a href='#'>Setembro</a></li>
                        <AiOutlineInfoCircle/><span>EM CONSTRUÇÃO</span>
                    </ul>
                    <ul>
                        <li><a href='#'>Outubro</a></li>
                        <AiOutlineInfoCircle/><span>EM CONSTRUÇÃO</span>
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
};