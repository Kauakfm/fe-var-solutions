import React, { useState } from 'react';
import './planos.css';
import logo from '../../imagens/var/logo.png';
import { BsCheckAll } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {HiOutlineOfficeBuilding} from 'react-icons/hi';
import {RiHomeOfficeLine} from 'react-icons/ri';
import HeaderPrincipal from '../../componentes/HeaderPrincipal';

import Footer from '../../componentes/Footer';

export default function Planos() {
    return (
        <div>
            <HeaderPrincipal/>
            <div className='body-planos'>
                <h1>Explore os planos disponíveis na nossa plataforma</h1>
                <h2>Uma experiência de aprendizado inovadora, projetada para atender às suas necessidades de desenvolvimento pessoal e profissional</h2>
                <section>
                    {/* <div className='plano'>
                        <h3>Presencial</h3>
                        <div className='icon-plano'><HiOutlineOfficeBuilding/></div>
                        <h4><span>Gratuito*</span><h6>*de acordo com sua renda familiar</h6></h4>
                        <Link to={`/planos/presencial`}><button>Fazer inscrição</button></Link>
                        <p><BsCheckAll /> Instrutores experientes disponíveis</p>
                        <p><BsCheckAll /> Conteúdo atualizado com as tecnologias atuais</p>
                        <p><BsCheckAll /> Aprendizado flexível, no seu ritmo</p>
                        <p><BsCheckAll /> Experiência completa de escritório</p>
                        <p><BsCheckAll /> Totalmente gratuito de acordo com a renda per capita.</p>
                        <p><BsCheckAll /> Equipamentos de última geração</p>
                    </div> */}
                    <div className='plano'>
                        <h3>Online - Anual</h3>
                        <div className='icon-plano'><RiHomeOfficeLine/></div>
                        <h4>10x de <span>R$59,70</span><h6>à vista R$597,00</h6></h4>
                        <Link to={`/planos/online/anual`}><button>Adquirir curso</button></Link>
                        <p><BsCheckAll /> Suporte direto dos instrutores via chat</p>
                        <p><BsCheckAll /> Conteúdo atualizado com as tecnologias atuais</p>
                        <p><BsCheckAll /> Aprendizado flexível, no seu ritmo</p>
                        <p><BsCheckAll /> Acesso de qualquer lugar do mundo</p>
                        <p><BsCheckAll /> Tenha acesso por 12 meses</p>
                        <p><BsCheckAll /> Parcelamento em até 10 vezes sem juros</p>
                    </div>
                    <div className='plano'>
                        <h3>Online - Mensal</h3>
                        <div className='icon-plano'><RiHomeOfficeLine/></div>
                        <h4><span>R$70,00</span><h6>pagamento mensal</h6></h4>
                        <Link to={`/planos/online/mensal`}><button>Adquirir curso</button></Link>
                        <p><BsCheckAll /> Suporte direto dos instrutores via chat</p>
                        <p><BsCheckAll /> Conteúdo atualizado com as tecnologias atuais</p>
                        <p><BsCheckAll /> Aprendizado flexível, no seu ritmo</p>
                        <p><BsCheckAll /> Acesso de qualquer lugar do mundo</p>
                        <p><BsCheckAll /> Cancele quando quiser</p>
                    </div>
                </section>
            </div>

            <Footer/>
        </div>
    )
}
