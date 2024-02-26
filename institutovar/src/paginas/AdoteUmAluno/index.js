import React from 'react';
import carossel1 from '../../imagens/var/carossel1.jpg';
import carossel2 from '../../imagens/var/carossel2.jpg';
import carossel3 from '../../imagens/var/carossel3.jpg';
import carossel4 from '../../imagens/var/carossel4.jpg';
import oscar from '../../imagens/oscar.jpg';
import samuel from '../../imagens/samuel.jpg';
import nilda from '../../imagens/nilda.jpg';
import guilherme from '../../imagens/guilherme.jpeg';
import Footer from '../../componentes/Footer';
import './adote-um-aluno.css';
import '../Home/home.css';
import {BsCheckCircle} from 'react-icons/bs';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeaderPrincipal from '../../componentes/HeaderPrincipal';
import { FaArrowUp } from 'react-icons/fa';

export default function AdoteUmAluno() {
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

    const NumberEffect = ({ finalNumber, duration }) => {
    const [currentNumber, setCurrentNumber] = useState(1);
    const numberRef = useRef(null);
    const interval = Math.ceil(duration / (finalNumber > 250 ? 250 : finalNumber));
    
    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const timer = setInterval(() => {
                setCurrentNumber((prevNumber) => {
                    const nextNumber = prevNumber + 1;
                    return nextNumber > 250 ? 250 : nextNumber;
                });
                }, interval);
    
                return () => {
                clearInterval(timer);
                };
            }
            });
        },
        {
            threshold: 0.1,
        }
        );
    
        if (numberRef.current) {
        observer.observe(numberRef.current);
        }
    
        return () => {
        if (numberRef.current) {
            observer.unobserve(numberRef.current);
        }
        };
    }, [finalNumber, interval]);
    
    return <h1 className='familias-impactadas-h1' ref={numberRef}>+{currentNumber}</h1>;
    };
      
    return (
        <div className="body-adote-um-aluno">
            <HeaderPrincipal/>

            <div id="scrollToTop" className={`scroll-to-top ${scrollY > window.innerHeight * 0.5 ? 'show' : 'hide'}`} onClick={scrollToTop}>
                <FaArrowUp className="icon-up" />
            </div>

            <h1 className='first-h1'>Adote um aluno</h1>
            <h6 className='span-borda'><span></span></h6>
            <p>O Instituto VAR Solutions lançou o programa "Adote um Aluno" com o objetivo de ampliar o acesso à tecnologia e melhorar a vida das pessoas de baixa renda, incluindo orfanatos e periferias. O projeto é autossustentável e permite que parceiros patrocinem 40% do valor do curso para os alunos, enquanto o instituto cobre os 60% restantes. Não há limites para a generosidade dos doadores, e eles podem adotar quantos alunos desejarem. Nossa empresa enfatiza a transparência e a responsabilidade na gestão dos recursos, disponibilizando informações sobre as doações no portal da transparência. A iniciativa visa mudar vidas e construir um mundo mais inclusivo e igualitário, proporcionando oportunidades através da educação e capacitação tecnológica.</p>
            <div className='video-adotar'>
                <iframe src="https://www.youtube.com/embed/dL5aO4yK5Jw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen="true"></iframe>
            </div>
            <div className='container-adotar'>
                <div className='adotar-left'>
                    <div>
                        <p><BsCheckCircle/>Se você é do lucro presumido, pode abater até 2% do lucro operacional;</p>
                        <p><BsCheckCircle/>Contribuir diretamente em um projeto social que visa dar acesso as pessoas mais pobres;</p>
                        <p><BsCheckCircle/>Apoiar e incentivar a diversidade e tecnologia;</p>
                        <p><BsCheckCircle/>Para empresas, benefícios de acessos exclusivos e prioridade de contratação dos alunos var;</p>
                        <p><BsCheckCircle/>Sua empresa se enquadra no ESG;</p>
                        <p><BsCheckCircle/>O Instituto VAR Solutions pode ser o braço social da sua empresa com toda nossa expertise do terceiro setor;</p>
                    </div>
                </div>
                <div className='adotar-right'>
                    <p>Quais os valores para ser o patrocinador de um aluno?</p>
                    <p>O curso tem um custo total de R$5.000,00 considerando que você irá pagar 40% deste valor, você irá patrocinar um valor de R$2.000,00.
                    Podendo ser doados da seguinte maneira: o curso tem duração de 08 meses, você pode patrocinar um aluno pagando totalmente a vista ou parcelado nas mensalidades sendo no cartão de crédito ou boleto.</p>
                    <div className='adotar-valor'>
                        <div>
                            <h6>10x</h6>
                            <h2><h5>R$</h5>199,99</h2>
                        </div>
                    </div>
                    <Link to="/adote-um-aluno/pagamento"><button>Adote agora</button></Link>
                </div>
            </div>
            <div className='carossel-adotar'>
                <p className='familias-impactadas'><NumberEffect/>Famílias impactadas</p>

                <div id="carouselExampleAutoplayin" class="carossel-historia carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={carossel1} class="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                            <img src={carossel2} class="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                            <img src={carossel3} class="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                            <img src={carossel4} class="d-block w-100" />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplayin" data-bs-slide="prev">
                        <span style={{ display: 'none' }} class="carossel-historia-previous carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplayin" data-bs-slide="next">
                        <span style={{ display: 'none' }} class="carossel-historia-next carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <h2 className='adotar-case-h2 cases-adotar-h2'>Nossos cases de sucesso</h2>
            <div className='cases-adotar'>
                <div id="carouselExampleAutoplaying" class="carossel-cases carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="cases-card carousel-item active">
                            <div className='cases-card-div'>
                                <img src={oscar} />
                                <h6>Oscar Carvalho<p>Software Engineer Jr no Itaú Unibanco</p><h5>42 anos</h5><a href='https://www.linkedin.com/in/oscarcarvalho/' target='_blank' rel="noreferrer">Linkedin</a></h6>
                            </div>
                            <p>Adquiri conhecimentos de tecnologia essenciais para minha transição de carreira e conquista de um emprego no Banco Itaú. Decidi ingressar na área de tecnologia e encontrei na Var Solutions uma escola renomada, com cursos de alta qualidade. Surpreendi-me com a excelência do ensino e dedicação dos instrutores. Além disso, a Var Solutions proporcionou oportunidades de networking e contato com profissionais do setor, ampliando minha rede de contatos e aprendizado com pessoas experientes. Recomendo fortemente a escola para quem deseja uma transição de carreira ou adquirir habilidades em tecnologia.</p>
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                <img src={nilda} />
                                <h6>Irenilda Valadares<p>Product Manager na PostALL LOG</p><h5>25 anos</h5><a href='https://www.linkedin.com/in/irenilda-valadares-1738a8248/' target='_blank' rel="noreferrer">Linkedin</a></h6>
                            </div>
                            <p>Entrei na VAR sem perspectiva de emprego, mas com o objetivo de aprender, e me apaixonei pela programação. A VAR foi o meu ponto de partida para uma jornada transformadora, onde descobri meu potencial. Recomendo a VAR para quem deseja explorar novos horizontes e encontrar um propósito profissional. Acreditem em si mesmos e permitam-se crescer. A VAR foi fundamental para a minha carreira profissional e com certeza mudou a minha vida.</p>
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                <img src={samuel} />
                                <h6>Samuel Souza<p>Desenvolvedor Back-end na Dorotech</p><h5>35 anos</h5><a href='https://www.linkedin.com/in/samuel-souza-423903219/' target='_blank' rel="noreferrer">Linkedin</a></h6>
                            </div>
                            <p>Agradeço imensamente à VAR Solutions pela incrível oportunidade que me proporcionou, por acreditar em meu potencial e por proporcionar um ambiente propício para o aprendizado e crescimento. Essa experiência enriqueceu minha trajetória profissional, permitindo-me aplicar meus conhecimentos. Estou entusiasmado com o futuro e grato por ter feito parte dessa jornada incrível.</p>
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                <img src={guilherme} />
                                <h6>Guilherme Fernandes<p>Aprendiz XWF no Google</p><h5>19 anos</h5><a href='#' target='_blank'>Linkedin</a></h6>
                            </div>
                            <p>A Var Solutions tem sido uma experiência muito enriquecedora, proporciona a sensação de um escritório e forma um pensador, não apenas um programador.</p>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span class="carossel-historia-previous carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span class="carossel-historia-next carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container-adotar2 container-adotar'>
                <div className='adotar-left'>
                    <div>
                        <p><BsCheckCircle/>Se você é do lucro presumido, pode abater até 2% do lucro operacional;</p>
                        <p><BsCheckCircle/>Contribuir diretamente em um projeto social que visa dar acesso as pessoas mais pobres;</p>
                        <p><BsCheckCircle/>Apoiar e incentivar a diversidade e tecnologia;</p>
                        <p><BsCheckCircle/>Para empresas, benefícios de acessos exclusivos e prioridade de contratação dos alunos var;</p>
                        <p><BsCheckCircle/>Sua empresa se enquadra no ESG;</p>
                        <p><BsCheckCircle/>O Instituto VAR Solutions pode ser o braço social da sua empresa com toda nossa expertise do terceiro setor;</p>
                    </div>
                </div>
                <div className='adotar-right'>
                    <p>Quais os valores para ser o patrocinador de um aluno?</p>
                    <p>O curso tem um custo total de R$5.000,00 considerando que você irá pagar 40% deste valor, você irá patrocinar um valor de R$2.000,00.
                    Podendo ser doados da seguinte maneira: o curso tem duração de 08 meses, você pode patrocinar um aluno pagando totalmente a vista ou parcelado nas mensalidades sendo no cartão de crédito ou boleto.</p>
                    <div className='adotar-valor'>
                        <div>
                            <h6>10x</h6>
                            <h2><h5>R$</h5>199,99</h2>
                        </div>
                    </div>
                    <Link to="/adote-um-aluno/pagamento"><button>Adote agora</button></Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
};