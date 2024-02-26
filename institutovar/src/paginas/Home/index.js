import './home.css';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Footer from '../../componentes/Footer';
import HeaderPrincipal from '../../componentes/HeaderPrincipal';
import { FaArrowUp } from 'react-icons/fa';
import avatar from '../../imagens/avatar.png';
// trilha
import icon1 from '../../imagens/icon/frontend.png';
import icon2 from '../../imagens/icon/backend.png';
import icon3 from '../../imagens/icon/backend2.png';
import icon4 from '../../imagens/icon/ferramentas.png';
import html from '../../imagens/icon/html.png';
import css from '../../imagens/icon/css.png';
import javascript from '../../imagens/icon/javascript.png';
import scrum from '../../imagens/icon/scrum.png';
import git from '../../imagens/icon/git.png';
import csharp from '../../imagens/icon/csharp.png';
import sql from '../../imagens/icon/sql-server.png';
import docker from '../../imagens/icon/docker.png';
import aws from '../../imagens/icon/aws.png';
import redis from '../../imagens/icon/redis.png';
import java from '../../imagens/icon/java.png';
import bootstrap from '../../imagens/icon/bootstrap.png';
import arquitetura from '../../imagens/icon/arquitetura.png';
import rabbit from '../../imagens/icon/rabbitmq.png';
import github from '../../imagens/icon/github.png';
import cache from '../../imagens/icon/cache.png';
// cases de sucesso
import oscar from '../../imagens/oscar.jpg';
import dryelle from '../../imagens/dryelle.jpg';
import kaua from '../../imagens/kaua.jpg';
import samuel from '../../imagens/samuel.jpg';
import nathan from '../../imagens/nathan.jpg';
import nilda from '../../imagens/nilda.jpg';
import guilherme from '../../imagens/guilherme.jpeg';
import francisco from '../../imagens/francisco.jpg';
// nossa história
import carossel1 from '../../imagens/var/carossel1.jpg';
import carossel2 from '../../imagens/var/carossel2.jpg';
import carossel3 from '../../imagens/var/carossel3.jpg';
import carossel4 from '../../imagens/var/carossel4.jpg';
// parceiros
import parceiro1 from '../../imagens/swell.png';
import parceiro2 from '../../imagens/ambev.png';
import parceiro3 from '../../imagens/postall-log.png';
import parceiro4 from '../../imagens/ym-yuwork.png';
import parceiro5 from '../../imagens/ecoassistb.png';
//como funciona
import explicacao from '../../imagens/var/como-funciona.png';
import { Link } from 'react-router-dom';

export default function Home() {
    const codeString = `{`;
    const codeString2 = `}`;

    const [scrollY, setScrollY] = useState(0);
    const [secaoInicioVideo, setSecaoInicioVideo] = useState([]);
    const [tituloQuemSomos, setTituloQuemSomos] = useState([])
    const [subtituloQuemSomos, setSubtituloQueSomos] = useState([])
    const [textoQuemSomos, setTextoQuemSomos] = useState([])
    const [tituloNossoProposito, setTituloNossoProposito] = useState([])
    const [textoNossoProposito, setTextoNossoProposito] = useState([])
    const [isAtivoQuemSomos, setQuemSomosAtivo] = useState(false);
    const [dilema1, setDilema1] = useState([])
    const [dilema2, setDilema2] = useState([])
    const [dilema3, setDilema3] = useState([])
    const [dilema4, setDilema4] = useState([])
    const [isAtivoNossoProposito, setNossoPropositoAtivo] = useState(false)
    const [tituloNossaHistoria, setTituloNossaHistoria] = useState([])
    const [textoNossaHistoria, setTextoNossaHistoria] = useState([])
    const [image1, setImagem1] = useState([])
    const [image2, setImagem2] = useState([])
    const [image3, setImagem3] = useState([])
    const [image4, setImagem4] = useState([])
    const [isAtivoNossaHistoria, setNossaHistoriaAtivo] = useState(false)
    const [secao7, setSecao7] = useState([])
    const [foto1, setFoto1] = useState([]);
    const [nome1, setNome1] = useState([]);
    const [cargo1, setCargo1] = useState([]);
    const [idade1, setIdade1] = useState([]);
    const [urlLinkedin1, setUrlLinkedin1] = useState([]);
    const [texto1, setTexto1] = useState([]);
    const [foto2, setFoto2] = useState([]);
    const [nome2, setNome2] = useState([]);
    const [cargo2, setCargo2] = useState([]);
    const [idade2, setIdade2] = useState([]);
    const [urlLinkedin2, setUrlLinkedin2] = useState([]);
    const [texto2, setTexto2] = useState([]);
    const [foto3, setFoto3] = useState([]);
    const [nome3, setNome3] = useState([]);
    const [cargo3, setCargo3] = useState([]);
    const [idade3, setIdade3] = useState([]);
    const [urlLinkedin3, setUrlLinkedin3] = useState([]);
    const [texto3, setTexto3] = useState([]);
    const [foto4, setFoto4] = useState([]);
    const [nome4, setNome4] = useState([]);
    const [cargo4, setCargo4] = useState([]);
    const [idade4, setIdade4] = useState([]);
    const [urlLinkedin4, setUrlLinkedin4] = useState([]);
    const [texto4, setTexto4] = useState([]);
    const [foto5, setFoto5] = useState([]);
    const [nome5, setNome5] = useState([]);
    const [cargo5, setCargo5] = useState([]);
    const [idade5, setIdade5] = useState([]);
    const [urlLinkedin5, setUrlLinkedin5] = useState([]);
    const [texto5, setTexto5] = useState([]);
    const [foto6, setFoto6] = useState([]);
    const [nome6, setNome6] = useState([]);
    const [cargo6, setCargo6] = useState([]);
    const [idade6, setIdade6] = useState([]);
    const [urlLinkedin6, setUrlLinkedin6] = useState([]);
    const [texto6, setTexto6] = useState([]);
    const [foto7, setFoto7] = useState([]);
    const [nome7, setNome7] = useState([]);
    const [cargo7, setCargo7] = useState([]);
    const [idade7, setIdade7] = useState([]);
    const [urlLinkedin7, setUrlLinkedin7] = useState([]);
    const [texto7, setTexto7] = useState([]);
    const [foto8, setFoto8] = useState([]);
    const [nome8, setNome8] = useState([]);
    const [cargo8, setCargo8] = useState([]);
    const [idade8, setIdade8] = useState([]);
    const [urlLinkedin8, setUrlLinkedin8] = useState([]);
    const [texto8, setTexto8] = useState([]);


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
    const handleObter = async () => {
        try {
            const response = await api.get('Estilizacao/ObterInicio');
            const responseData = response.data;

            const videoFiltrado = responseData.filter(item => item.codigoSecao === 1).filter(item => item.tipo === "Url Video");            
            setSecaoInicioVideo(videoFiltrado)

            const tituloquemsomos = responseData.filter(item => item.codigoSecao === 2).filter(item => item.tipo === "Titulo Quem Somos");
            setTituloQuemSomos(tituloquemsomos);

            const Subtituloquemsomos = responseData.filter(item => item.codigoSecao === 2).filter(item => item.tipo === "Subtitulo Quem Somos");
            setSubtituloQueSomos(Subtituloquemsomos);

            const textoquemsomos = responseData.filter(item => item.codigoSecao === 2).filter(item => item.tipo === "Texto Quem Somos");
            setTextoQuemSomos(textoquemsomos);

            const ativoQuemSomos = responseData.find(item => item.codigoSecao === 2 && item.tipo === "Titulo Quem Somos")
            setQuemSomosAtivo(ativoQuemSomos.isativo)



            const tituloNossoProposito = responseData.filter(item => item.codigoSecao === 3).filter(item => item.tipo === "Titulo Nosso Proposito");
            setTituloNossoProposito(tituloNossoProposito)

            const textoNossoProposito = responseData.filter(item => item.codigoSecao === 3).filter(item => item.tipo === "Texto Nosso Proposito");
            setTextoNossoProposito(textoNossoProposito);

            const dilema1 = responseData.filter(item => item.codigoSecao === 3).filter(item => item.tipo === "Dilema 1");
            setDilema1(dilema1)

            const dilema2 = responseData.filter(item => item.codigoSecao === 3).filter(item => item.tipo === "Dilema 2");
            setDilema2(dilema2)

            const dilema3 = responseData.filter(item => item.codigoSecao === 3).filter(item => item.tipo === "Dilema 3");
            setDilema3(dilema3)

            const dilema4 = responseData.filter(item => item.codigoSecao === 3).filter(item => item.tipo === "Dilema 4");
            setDilema4(dilema4);
            const ativoNossoProposito = responseData.find(item => item.codigoSecao === 3 && item.tipo === "Titulo Nosso Proposito")
            setNossoPropositoAtivo(ativoNossoProposito.isativo)


            const tituloNossaHistoria = responseData.filter(item => item.codigoSecao === 6).filter(item => item.tipo === "Titulo Nossa Historia")
            setTituloNossaHistoria(tituloNossaHistoria)
            const textoNossaHistoria = responseData.filter(item => item.codigoSecao === 6).filter(item => item.tipo === "Texto Nossa Historia")
            setTextoNossaHistoria(textoNossaHistoria);
            const image1 = responseData.filter(item => item.codigoSecao === 6).filter(item => item.tipo === "Imagem 1")
            setImagem1(image1)
            const image2 = responseData.filter(item => item.codigoSecao === 6).filter(item => item.tipo === "Imagem 2")
            setImagem2(image2)
            const image3 = responseData.filter(item => item.codigoSecao === 6).filter(item => item.tipo === "Imagem 3")
            setImagem3(image3)
            const image4 = responseData.filter(item => item.codigoSecao === 6).filter(item => item.tipo === "Imagem 4")
            setImagem4(image4)
            const ativoNossaHistoria = responseData.find(item => item.codigoSecao === 6 && item.tipo === "Titulo Nossa Historia")
            setNossaHistoriaAtivo(ativoNossaHistoria.isativo)

            const tituloCasesDeSucesso = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Titulo Cases de sucesso");

            const foto1 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Foto 1");
            const nome1 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Nome 1");
            const cargo1 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Cargo 1");
            const idade1 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Idade 1");
            const linkedin1 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Url Likedin 1");
            const texto1 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Texto 1");
            setFoto1(foto1);
            setNome1(nome1);
            setCargo1(cargo1);
            setIdade1(idade1);
            setUrlLinkedin1(linkedin1);
            setTexto1(texto1);

            // Casos de sucesso - Item 2
            const foto2 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Foto 2");
            const nome2 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Nome 2");
            const cargo2 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Cargo 2");
            const idade2 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Idade 2");
            const linkedin2 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Url Likedin 2");
            const texto2 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Texto 2");
            setFoto2(foto2);
            setNome2(nome2);
            setCargo2(cargo2);
            setIdade2(idade2);
            setUrlLinkedin2(linkedin2);
            setTexto2(texto2);

            const foto3 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Foto 3");
            const nome3 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Nome 3");
            const cargo3 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Cargo 3");
            const idade3 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Idade 3");
            const linkedin3 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Url Likedin 3");
            const texto3 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Texto 3");
            setFoto3(foto3);
            setNome3(nome3);
            setCargo3(cargo3);
            setIdade3(idade3);
            setUrlLinkedin3(linkedin3);
            setTexto3(texto3);


            // Casos de sucesso - Item 4
            const foto4 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Foto 4");
            const nome4 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Nome 4");
            const cargo4 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Cargo 4");
            const idade4 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Idade 4");
            const linkedin4 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Url Likedin 4");
            const texto4 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Texto 4");
            setFoto4(foto4);
            setNome4(nome4);
            setCargo4(cargo4);
            setIdade4(idade4);
            setUrlLinkedin4(linkedin4);
            setTexto4(texto4);
            // Casos de sucesso - Item 5
            const foto5 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Foto 5");
            const nome5 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Nome 5");
            const cargo5 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Cargo 5");
            const idade5 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Idade 5");
            const linkedin5 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Url Likedin 5");
            const texto5 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Texto 5");
            setFoto5(foto5);
            setNome5(nome5);
            setCargo5(cargo5);
            setIdade5(idade5);
            setUrlLinkedin5(linkedin5);
            setTexto5(texto5);
            // Casos de sucesso - Item 6
            const foto6 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Foto 6");
            const nome6 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Nome 6");
            const cargo6 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Cargo 6");
            const idade6 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Idade 6");
            const linkedin6 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Url Likedin 6");
            const texto6 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Texto 6");
            setFoto6(foto6);
            setNome6(nome6);
            setCargo6(cargo6);
            setIdade6(idade6);
            setUrlLinkedin6(linkedin6);
            setTexto6(texto6);
            // Casos de sucesso - Item 7
            const foto7 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Foto 7");
            const nome7 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Nome 7");
            const cargo7 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Cargo 7");
            const idade7 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Idade 7");
            const linkedin7 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Url Likedin 7");
            const texto7 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Texto 7");
            setFoto7(foto7);
            setNome7(nome7);
            setCargo7(cargo7);
            setIdade7(idade7);
            setUrlLinkedin7(linkedin7);
            setTexto7(texto7);


            // Casos de sucesso - Item 8
            const foto8 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Foto 8");
            const nome8 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Nome 8");
            const cargo8 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Cargo 8");
            const idade8 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Idade 8");
            const linkedin8 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Url Likedin 8");
            const texto8 = responseData.filter(item => item.codigoSecao === 7).filter(item => item.tipo === "Texto 8");
            setFoto8(foto8);
            setNome8(nome8);
            setCargo8(cargo8);
            setIdade8(idade8);
            setUrlLinkedin8(linkedin8);
            setTexto8(texto8);
        } catch (error) {

        }
    }

    useEffect(() => {
        handleObter();
    }, [])

    return (
        <div className='imagem-body body-home'>
            <HeaderPrincipal />

            <div id="scrollToTop" className={`scroll-to-top ${scrollY > window.innerHeight * 0.5 ? 'show' : 'hide'}`} onClick={scrollToTop}>
                <FaArrowUp className="icon-up" />
            </div>

            {secaoInicioVideo.map((video) => {
                return (
                    <div className='video-home' id='inicio'>
                        <iframe src={video.valor} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen="true"></iframe>
                        <Link to={`/planos`}><button>MATRICULE-SE</button></Link>
                    </div>
                )
            })}
{isAtivoQuemSomos == true
 ? 
            <div id='quem-somos'>
                {tituloQuemSomos.map((somos) => {
                    return (
                        <h2>{somos.valor} </h2>
                    )
                })}
                {subtituloQuemSomos.map((somos) => {
                    return (
                        <h1>{somos.valor}</h1>
                    )
                })}
                {textoQuemSomos.map((somos) => {
                    return (
                        <h3>{somos.valor}</h3>
                    )
                })}
            </div>
 : <></>}
 {isAtivoNossoProposito == true ? 
            <div id='nosso-proposito'>
                <p className='codeString'>
                    {codeString}<br />
                    <span>{dilema1.map((dil) => {
                        return (
                            <span>"{dil.valor}"</span>
                        )
                    })}:{dilema2.map((dil2) => {
                        return (
                            <span>"{dil2.valor}"</span>
                        )
                    })},</span><br />
                    <span>{dilema3.map((dil3) => {
                        return (
                            <span>"{dil3.valor}"</span>
                        )
                    })}:{dilema4.map((dil4) => {
                        return (
                            <span>"{dil4.valor}"</span>
                        )
                    })}</span><br />
                    {codeString2}
                </p>
                <div>
                    {tituloNossoProposito.map((titu) => {
                        return (
                            <h1>{titu.valor}</h1>
                        )
                    })}
                    {textoNossoProposito.map((txt) => {
                        return (
                            <h3>{txt.valor}</h3>
                        )
                    })}
                </div>
            </div>
           : <></>}
            {/*
            <div id='como-funciona'>
                <h1>COMO FUNCIONA?</h1>
                <img src={explicacao} />
            </div> */}

            {/* <div id='nossa-trilha'>
                <h1>NOSSA TRILHA</h1>
                <div className='trilha-cards'>
                    <div class="container">
                        <div class="front">
                            <h3>Front End</h3>
                            <img src={icon1} />
                        </div>
                        <div class="back">
                            <div>
                                <img src={html} />
                                <p>HTML5</p>
                            </div>
                            <div>
                                <img src={css} />
                                <p>CSS3</p>
                            </div>
                            <div>
                                <img src={bootstrap} className='bootstrap' />
                                <p>Bootstrap5</p>
                            </div>
                            <div>
                                <img src={javascript} />
                                <p>JavaScript</p>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="front">
                            <h3>Back End C#</h3>
                            <img src={icon2} />
                        </div>
                        <div class="back">
                            <div>
                                <img src={csharp} />
                                <p>Csharp</p>
                            </div>
                            <div>
                                <img src={sql} />
                                <p>Sql Server</p>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="front">
                            <h3>Back End Java</h3>
                            <img src={icon3} />
                        </div>
                        <div class="back">
                            <div>
                                <img src={java} />
                                <p>Java</p>
                            </div>
                            <div>
                                <img src={sql} />
                                <p>Sql Server</p>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="front">
                            <h3>Ferramentas</h3>
                            <img src={icon4} />
                        </div>
                        <div class="back-ferramentas back">
                            <div>
                                <img src={scrum} />
                                <p>Scrum</p>
                            </div>
                            <div>
                                <img src={git} />
                                <p>Git</p>
                            </div>
                            <div>
                                <img src={github} />
                                <p>Github</p>
                            </div>
                            <div>
                                <img src={docker} />
                                <p>Docker</p>
                            </div>
                            <div>
                                <img src={arquitetura} />
                                <p>Arquitetura</p>
                            </div>
                            <div>
                                <img src={aws} />
                                <p>Cloud</p>
                            </div>
                            <div>
                                <img src={rabbit} />
                                <p>RabbitMQ</p>
                            </div>
                            <div>
                                <img src={cache} />
                                <p>Cache</p>
                            </div>
                            <div>
                                <img src={redis} />
                                <p>Redis</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
{isAtivoNossaHistoria == true ? 
            <div id='nossa-historia'>
                <div className='historia-texto'>
                    {tituloNossaHistoria.map((titu) => {
                        return (
                            <h1>{titu.valor}</h1>
                        )
                    })}
                    {textoNossaHistoria.map((txt) => {
                        return (
                            <h3>{txt.valor}</h3>
                        )
                    })}
                </div>
                <div id="carouselExampleAutoplayin" class="carossel-historia carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            {image1.map((img) => {
                                return (
                                    <img src={img.valor == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${img.valor}`} class="d-block w-100" />
                                )
                            })}
                        </div>
                        <div class="carousel-item">
                            {image2.map((img) => {
                                return (
                                    <img src={img.valor == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${img.valor}`} class="d-block w-100" />
                                )

                            })}
                        </div>
                        <div class="carousel-item">
                            {image3.map((img) => {
                                return (
                                    <img src={img.valor == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${img.valor}`} class="d-block w-100" />
                                )

                            })}
                        </div>
                        <div class="carousel-item">
                            {image4.map((img) => {
                                return (
                                    <img src={img.valor == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${img.valor}`} class="d-block w-100" />
                                )

                            })}
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
   : <></>}
            <div id='cases-de-sucesso'>
                <h1>CASES DE SUCESSO</h1>
                <div id="carouselExampleAutoplaying" class="carossel-cases carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="cases-card carousel-item active">
                            <div className='cases-card-div'>
                                {foto5.map((img) => <img src={"https://api.varsolutions.com.br/images/CasesSucesso/"+img.valor} alt="Foto 5" />)}
                                <h6>
                                    {nome5.map((nome) => <h6>{nome.valor}</h6>)}
                                    {cargo5.map((cargo) => <p>{cargo.valor}</p>)}
                                    {idade5.map((idade) => <h5>{idade.valor} anos</h5>)}
                                    {urlLinkedin5.map((linkedin) => <a href={linkedin.valor} target='_blank' rel="noreferrer">Linkedin</a>)}
                                </h6>
                            </div>
                            {texto5.map((txt) => <p>{txt.valor}</p>)}
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                {foto6.map((img) => <img src={"https://api.varsolutions.com.br/images/CasesSucesso/"+img.valor} alt="Foto 6" />)}
                                <h6>
                                    {nome6.map((nome) => <h6>{nome.valor}</h6>)}
                                    {cargo6.map((cargo) => <p>{cargo.valor}</p>)}
                                    {idade6.map((idade) => <h5>{idade.valor} anos</h5>)}
                                    {urlLinkedin6.map((linkedin) => <a href={linkedin.valor} target='_blank' rel="noreferrer">Linkedin</a>)}
                                </h6>
                            </div>
                            {texto6.map((txt) => <p>{txt.valor}</p>)}
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                {foto7.map((img) => <img src={"https://api.varsolutions.com.br/images/CasesSucesso/"+img.valor} alt="Foto 7" />)}
                                <h6>
                                    {nome7.map((nome) => <h6>{nome.valor}</h6>)}
                                    {cargo7.map((cargo) => <p>{cargo.valor}</p>)}
                                    {idade7.map((idade) => <h5>{idade.valor} anos</h5>)}
                                    {urlLinkedin7.map((linkedin) => <a href={linkedin.valor} target='_blank' rel="noreferrer">Linkedin</a>)}
                                </h6>
                            </div>
                            {texto7.map((txt) => <p>{txt.valor}</p>)}
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                {foto8.map((img) => <img src={"https://api.varsolutions.com.br/images/CasesSucesso/"+img.valor} alt="Foto 8" />)}
                                <h6>
                                    {nome8.map((nome) => <h6>{nome.valor}</h6>)}
                                    {cargo8.map((cargo) => <p>{cargo.valor}</p>)}
                                    {idade8.map((idade) => <h5>{idade.valor} anos</h5>)}
                                    {urlLinkedin8.map((linkedin) => <a href={linkedin.valor} target='_blank' rel="noreferrer">Linkedin</a>)}
                                </h6>
                            </div>
                            {texto8.map((txt) => <p>{txt.valor}</p>)}
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                {foto1.map((img) => <img src={"https://api.varsolutions.com.br/images/CasesSucesso/"+img.valor} alt="Foto 1" />)}
                                <h6>{nome1.map((nome) => <h6>{nome.valor}</h6>)}
                                    {cargo1.map((cargo) => <p>{cargo.valor}</p>)}
                                    {idade1.map((idade) => <h5>{idade.valor} anos</h5>)}
                                    {urlLinkedin1.map((linkedin) => <a href={linkedin.valor} target='_blank' rel="noreferrer">Linkedin</a>)}</h6>
                            </div>
                            {texto1.map((txt) => <p>{txt.valor}</p>)}
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                {foto2.map((img) => <img src={"https://api.varsolutions.com.br/images/CasesSucesso/"+img.valor} alt="Foto 2" />)}
                                <h6>
                                    {nome2.map((nome) => <h6>{nome.valor}</h6>)}
                                    {cargo2.map((cargo) => <p>{cargo.valor}</p>)}
                                    {idade2.map((idade) => <h5>{idade.valor} anos</h5>)}
                                    {urlLinkedin2.map((linkedin) => <a href={linkedin.valor} target='_blank' rel="noreferrer">Linkedin</a>)}
                                </h6>
                            </div>
                            {texto2.map((txt) => <p>{txt.valor}</p>)}
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                {foto3.map((img) => <img src={"https://api.varsolutions.com.br/images/CasesSucesso/"+img.valor} alt="Foto 3" />)}
                                <h6>
                                    {nome3.map((nome) => <h6>{nome.valor}</h6>)}
                                    {cargo3.map((cargo) => <p>{cargo.valor}</p>)}
                                    {idade3.map((idade) => <h5>{idade.valor} anos</h5>)}
                                    {urlLinkedin3.map((linkedin) => <a href={linkedin.valor} target='_blank' rel="noreferrer">Linkedin</a>)}
                                </h6>
                            </div>
                            {texto3.map((txt) => <p>{txt.valor}</p>)}
                        </div>
                        <div class="cases-card carousel-item">
                            <div className='cases-card-div'>
                                {foto4.map((img) => <img src={"https://api.varsolutions.com.br/images/CasesSucesso/"+img.valor} alt="Foto 4" />)}
                                <h6>
                                    {nome4.map((nome) => <h6>{nome.valor}</h6>)}
                                    {cargo4.map((cargo) => <p>{cargo.valor}</p>)}
                                    {idade4.map((idade) => <h5>{idade.valor} anos</h5>)}
                                    {urlLinkedin4.map((linkedin) => <a href={linkedin.valor} target='_blank' rel="noreferrer">Linkedin</a>)}
                                </h6>
                            </div>
                            {texto4.map((txt) => <p>{txt.valor}</p>)}
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
            {/*
            <div id='parceiros'>
                <h1>ALGUNS DE NOSSOS PARCEIROS</h1>
                <div>
                    <a href='https://www.linkedin.com/company/swell-it-solutions/' target='_blank' rel="noreferrer"><img src={parceiro1} /></a>
                    <a href='https://www.ambev.com.br/' target='_blank' rel="noreferrer"><img src={parceiro2} /></a>
                    <a href='https://postall-log.com.br/' target='_blank' rel="noreferrer"><img src={parceiro3} /></a>
                    <a href='https://www.linkedin.com/company/yuwork-processos/' target='_blank' rel="noreferrer"><img src={parceiro4} /></a>
                    <a href='https://ecoassist.com.br/' target='_blank' rel="noreferrer"><img src={parceiro5} /></a>
                </div>
            </div>
*/}
            <Footer />
        </div>
    );
}