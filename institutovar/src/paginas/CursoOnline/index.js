import React, { useEffect, useState, useRef } from 'react';
import './cursoonline.css';
import { BsCheckLg } from 'react-icons/bs';
import HeaderPrincipal from '../../componentes/HeaderPrincipal';
import { FaGraduationCap, FaTools, FaComments, FaCode, FaAward } from 'react-icons/fa';
import { GoVideo } from 'react-icons/go';
import api from '../../services/api';
import vitor from '../../imagens/vitor.jpg';
import alexandre from '../../imagens/alexandre.jpg';
import renato from '../../imagens/renato.jpg';
import Footer from '../../componentes/Footer';
import { FaArrowUp } from 'react-icons/fa';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function CursoOnline() {
    const { id } = useParams();
    const navigate = useNavigate();


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 1.5,
                },
            },
        ],
    };

    const [trilhaAula, setTrilha] = useState([]);
    const [tipo, setTipo] = useState('');
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

    const getTrilhaAula = async () => {
        try {
            const response = await api.get('Curso/ObterNomeAula/3');
            setTrilha(response.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        getTrilhaAula();
        if (id === "anual" || id === "mensal")
            setTipo(id);
        else
        navigate("/")
    }, []);

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    }

    const [scrollY, setScrollY] = useState(0);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='body-curso-online'>
            <HeaderPrincipal/>

            <div id="scrollToTop" className={`scroll-to-top ${scrollY > window.innerHeight * 0.5 ? 'show' : 'hide'}`} onClick={scrollToTop}>
                <FaArrowUp className="icon-up" />
            </div>
            
            <div className='textos'>
                <span></span>
                <h1>TRANSFORME-SE EM UM <span>PROGRAMADOR PROFISSIONAL</span> COM UM CURSO PRÁTICO E FOCADO, CAPAZ DE MUDAR SUA VIDA!</h1>
                <p>Domine a programação partindo do zero até se tornar um profissional, por meio de projetos que vão além da teoria, inserindo você diretamente nos códigos logo nas primeiras aulas!</p>
                <Link to={"/planos/online/" + id + "/pagamento"} className='adquirir-curso'><button>Adquirir curso</button></Link>
            </div>
            <div className='video-curso'>
                <h3>Vídeo de Introdução</h3>
                <iframe id='oqueaprendera' src="https://player-vz-a789efd7-bc9.tv.pandavideo.com.br/embed/?v=770f3b41-e59a-486c-b5b8-6efaf903bce7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <span id='o-que-aprendera'></span>
            </div>
            <div className="oque-aprender">
                <ul>
                    <h3>O que você aprenderá:</h3>
                    <li><BsCheckLg />Dominar a Programação Orientada a Objetos e suas melhores práticas.</li>
                    <li><BsCheckLg />Criar soluções flexíveis, extensíveis e de fácil teste.</li>
                    <li><BsCheckLg />Desenvolver páginas web utilizando HTML, CSS e JavaScript.</li>
                    <li><BsCheckLg />Programar em C# e Java para criar aplicações robustas e eficientes.</li>
                    <li><BsCheckLg />Gerenciar bancos de dados com SQL Server para armazenamento e recuperação de dados.</li>
                    <li><BsCheckLg />Compreender a essência da arquitetura de sistemas escaláveis.</li>
                    <li id='por-que-a-var'><BsCheckLg />Domine o uso do Docker para facilitar a implantação de aplicações.</li>
                    <li id='porqueavar'><BsCheckLg />Expandir sua compreensão sobre eventos, cache e observabilidade.</li>
                </ul>
            </div>
            <div className='carousel-container porque-var'>
                <h3>Por que optar pela plataforma da Var Solutions?</h3>
                <Slider {...settings} className='blocos-web blocos'>
                    <div className='carousel-item'>
                        <h6><FaGraduationCap />Formação completa</h6>
                        <p>Comece do ponto zero e progrida em direção às suas primeiras oportunidades na área.</p>
                    </div>
                    <div className='carousel-item'>
                        <h6><FaTools />Curso de especialização</h6>
                        <p>Domine stacks avançadas, amplamente requisitadas no mercado.</p>
                    </div>
                    <div className='carousel-item'>
                        <h6><FaAward />Certificado de Conclusão</h6>
                        <p>Obtenha uma certificação oficial ao concluir os cursos com êxito.</p>
                    </div>
                    <div className='carousel-item'>
                        <h6><FaComments />Fórum exclusivo</h6>
                        <p>Esclareça dúvidas técnicas e receba assistência de nossa equipe.</p>
                    </div>
                    <div className='carousel-item'>
                        <h6><FaCode />Aplicações Práticas</h6>
                        <p>Aprenda ativamente enquanto cria aplicações de nível profissional.</p>
                    </div>
                </Slider>
            </div>
            <div className='curso'>
                <h1>Desenvolvimento de Software em C# e Java</h1>
                <p>Inicie a sua jornada de aprendizado com os nossos cursos abrangentes, que abordam desde a criação de sites até o desenvolvimento de software e muito mais!</p>
                <h3>Aproveite o Pacote Completo por apenas {id === 'anual' ? '10x de R$59,70' : 'R$70,00 mensal'}!</h3>
                <Link to={"/planos/online/" + id + "/pagamento"} className='adquirir-curso'><button>Adquirir curso</button></Link>
            </div>
            <div className='detalhes-curso'>
                <h3>Quais são os Benefícios de Dominar o Back-end C#?</h3>
                <p className='detalhes-p'>Dominar o Back-end C# traz vantagens como criar aplicativos robustos e escaláveis. Você pode construir sistemas que lidam com dados e interações complexas de forma eficiente. Além disso, muitos empregos no desenvolvimento de software valorizam o conhecimento em C#. Isso significa mais oportunidades de carreira.</p>
                <h3 id='conteudo-do-curso'>Quais são os Benefícios de Dominar o Back-end Java?</h3>
                <p id='conteudodocurso' className='detalhes-p'>A linguagem de programação Java é amplamente usada no desenvolvimento de sites e aplicativos. Aprender a trabalhar com o Back-end Java significa que você pode criar a parte do sistema que lida com o funcionamento interno, como processar dados e interagir com bancos de dados. Isso é importante porque muitos aplicativos precisam de uma base sólida no Back-end para funcionar corretamente. Aprender Back-end Java abre oportunidades para construir sistemas robustos e eficazes.</p>

                <div className="curso-online-container3">
                    <h3>Conteúdo do curso</h3>
                    <p>113 aulas - Duração total: 100h</p>
                    <div className="accordion-online accordion" id="accordionPanelsStayOpenExample">
                        {trilhaAula.map((cursoAulas, cursoIndex) => (
                            <div key={cursoIndex} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="botao2 accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseCurso${cursoIndex}`} aria-expanded="true" aria-controls={`collapseCurso${cursoIndex}`}>
                                        {cursoAulas.curso}
                                    </button>
                                </h2>
                                <div id={`collapseCurso${cursoIndex}`} className="accordion-collapse collapse show" aria-labelledby={`headingCurso${cursoIndex}`} data-bs-parent="#accordionPanelsStayOpenExample">
                                    <div className="accordion-online-modulos accordion-body">
                                        {cursoAulas.aulas.map((modulo, moduloIndex) => (
                                            <div className='div1' key={moduloIndex}>
                                                <h4 className="accordion-header">
                                                    <button className="botao1 accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseModulo${cursoIndex}_${moduloIndex}`} aria-expanded="false" aria-controls={`collapseModulo${cursoIndex}_${moduloIndex}`}>
                                                        {modulo.nome}
                                                    </button>
                                                </h4>
                                                <div id={`collapseModulo${cursoIndex}_${moduloIndex}`} className="accordion-collapse collapse" aria-labelledby={`headingModulo${cursoIndex}_${moduloIndex}`} data-bs-parent={`#collapseCurso${cursoIndex}`}>
                                                    <div className="accordion-online-aulas accordion-body">
                                                        <ul>
                                                            {modulo.aulas.map((aula, aulaIndex) => (
                                                                <li key={aulaIndex}>
                                                                    <div>
                                                                        <GoVideo />
                                                                        {aula.descricao}
                                                                    </div>
                                                                    <span>{formatTime(aula.tempoVideoSegundos)}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <h3>Qual é a média salarial de um Desenvolvedor Back-end C#?</h3>
                <div className='quanto-ganha'>
                    <div>
                        <p>R$ 12.000/mês</p>
                        <h6>Desenvolvedor Sênior</h6>
                        <span>a</span>
                    </div>
                    <div>
                        <p>R$ 7.000/mês</p>
                        <h6>Desenvolvedor Pleno</h6>
                        <span>a</span>
                    </div>
                    <div id='professor'>
                        <p>R$ 4.500/mês</p>
                        <h6>Desenvolvedor Júnior</h6>
                        <span>a</span>
                    </div>
                </div>
                <h3>Qual é a média salarial de um Desenvolvedor Back-end Java?</h3>
                <div className='quanto-ganha'>
                    <div>
                        <p>R$ 13.000/mês</p>
                        <h6>Desenvolvedor Sênior</h6>
                        <span>a</span>
                    </div>
                    <div>
                        <p>R$ 8.000/mês</p>
                        <h6>Desenvolvedor Pleno</h6>
                        <span>a</span>
                    </div>
                    <div>
                        <p>R$ 4.900/mês</p>
                        <h6>Desenvolvedor Júnior</h6>
                        <span id='professores'>a</span>
                    </div>
                </div>
            </div>
            <div className='professores'>
                <h3>Nossos professores</h3>
                <div className='perfis'>
                    <div className='perfil'>
                        <section>
                            <img src={vitor} />
                            <div>
                                <p>Vitor Carvalho</p>
                                <span>Professor e CoFundador do Instituto Var Solutions</span>
                            </div>
                        </section>
                        <p>Engenheiro de Software SRE no Banco Itaú, formado pela Universidade Estácio de Sá, com mais de 10 anos de experiência em tecnologia. Fascinado por transformar a vida das pessoas através da tecnologia, tenho a convicção de que todo ser humano é ensinável. Entre as Skills mais fortes são desenvolvimento de aplicações em Java, Cloud Computing e liderança de times ágeis.</p>
                    </div>
                    <div className='perfil'>
                        <section>
                            <img src={alexandre} />
                            <div>
                                <p>Alexandre Gasparino</p>
                                <span>Professor e CoFundador do Instituto Var Solutions</span>
                            </div>
                        </section>
                        <p>Com mais de 12 anos de experiência em desenvolvimento de sistemas e uma formação em Sistemas de Informação, trago um vasto conhecimento para compartilhar. Minha trajetória inclui papéis como arquiteto de software, Tech Lead e gerenciamento de equipes em grandes empresas e projetos. Prepare-se para aprender com um profissional que já enfrentou os desafios do mundo real e está comprometido em ajudá-lo a alcançar seus objetivos no desenvolvimento de software.</p>
                    </div>
                    <div className='perfil'>
                        <section>
                            <img src={renato} />
                            <div>
                                <p>Renato Oliveira</p>
                                <span>Professor e CoFundador do Instituto Var Solutions</span>
                            </div>
                        </section>
                        <p>Um profissional dedicado e inspirador, reconhecido por minha abordagem comprometida em projetos. Minha paixão pela inovação e minha firme crença nas capacidades das pessoas me distinguem. Minha habilidade nas relações interpessoais me capacitam como um excelente colaborador e líder de equipes. Minhas habilidades técnicas incluem C#, Java, Docker, Kubernetes, GitLab, AWS e Azure.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}