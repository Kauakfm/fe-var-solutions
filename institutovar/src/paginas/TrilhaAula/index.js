import './trilhaaula.css';
import { BrowserRouter as Router, Link, Route, useParams } from 'react-router-dom'; import HeaderAluno from '../../componentes/HeaderAluno';
import React, { useState, useEffect , useRef} from 'react';
import ModalSuporte from '../../componentes/ModalSuporte';
import api from "../../services/api"
import { useNavigate } from 'react-router-dom';
import Aulas from '../../componentes/Aulas';
import Comentarios from '../../componentes/Comentarios';
import { toast } from 'react-toastify';
import '../HomeAluno/homealuno.css';
import 'react-toastify/dist/ReactToastify.css';
import certificate from '../../imagens/icon/certificate.png';
import quality from '../../imagens/icon/quality.png';

export default function TrilhaAula(match) {
    const ref = useRef(null);
    const nomeCompleto = (window.localStorage.getItem("usr_nome") || '').split(" ");
    const primeirosNomes = nomeCompleto.slice(0, 2).join(" ");
    const [componenteAtivo, setComponenteAtivo] = useState('aulas');
    const [pAtivo, setPAtivo] = useState(null);
    const navigate = useNavigate();
    const [pAula, setpAula] = useState(null);
    const [curso, setCurso] = useState();
    const [aulaConcluida, setAulaConcluida] = useState([]);
    const { id } = useParams();
    const url = "/Home/ObterCursos";
    const urlPrimeiraAula = "/Curso/obterPrimeiraAula/";
    const status = window.localStorage.getItem('usr_status');
    const [fileAula, setFileAula] = useState([])
    const [nomeModulo, setNomeModulo] = useState('') 
    const [loading, setloading] = useState(false);    
    

    const mostrarAulas = () => {
        setComponenteAtivo('aulas');
        setPAtivo('aulas');
    };

    const mostrarComentarios = () => {
        setComponenteAtivo('comentarios');
        setPAtivo('comentarios');
    };

    const redirecionarTela = () => {
        navigate('/dashboard/meus-certificados');
        window.location.reload();
    };

    const getCurso = async () => {
        try {
            const response = await api.get('Dashboard/ObterDashboard');
            const responseData = response.data;
            if (!responseData.unidadeCodigo || responseData.unidadeCodigo === 3) {
                await api.get(url).then((response) => {
                    setCurso(response.data.find(filtro => filtro.codigo == id))
                })


            }
            else if (!responseData.nome || responseData.nome === null ||
                !responseData.cargo || responseData.cargo === null ||
                !responseData.celular || responseData.celular === null ||
                !responseData.dataNascimento || responseData.dataNascimento === null ||
                !responseData.genero || responseData.genero === null ||
                !responseData.cpf || responseData.cpf === null ||
                !responseData.cor || responseData.cor === null ||
                !responseData.cep || responseData.cep === null ||
                !responseData.rua || responseData.rua === null ||
                !responseData.cidade || responseData.cidade === null ||
                !responseData.uf || responseData.uf === null ||
                !responseData.bairro || responseData.bairro === null ||
                !responseData.complemento || responseData.complemento === null ||
                !responseData.numeroCasa || responseData.numeroCasa === null ||
                !responseData.qntdPessoas || responseData.qntdPessoas === null ||
                !responseData.rendaFamiliar || responseData.rendaFamiliar == null ||
                !responseData.rg || responseData.rg === null ||
                !responseData.cargo || responseData.cargo === null) {
                navigate("/dashboard");
                toast.error("Complete seu perfil para acessar as aulas.")
            }
            else {
                await api.get(url).then((response) => {
                    setCurso(response.data.find(filtro => filtro.codigo == id))
                })


            }
        }
        catch (error) {

        }
    }
    const getAulaConcluida = async () => {
        try {
            await api.get('/Curso/obterConcluidos').then((response) => {
                setAulaConcluida(response.data)
            })
        } catch (error) {

        }
    };
    const setAula = async () => {
        await api.get(urlPrimeiraAula + id).then((aula) => {

            setpAula({
                codigo: aula.data.codigo,
                descricao: aula.data.descricao,
                detalhe: aula.data.detalhe,

                urlAula: window.localStorage.getItem("26") ? aula.data.urlAula : aula.data.urlAulapanda,
                isAtivo: aula.data.isAtivo,
                dataCadastro: aula.data.dataCadastro,
                tempoVideoSegundos: aula.data.tempoVideoSegundos,
                arquivo: aula.data.arquivo,
                isDesafio: aula.data.isDesafio

            })
        })
    };

    function handleFileAula(codigo) {
        api.get(`Curso/obterMaterialId/${codigo}`)
            .then(function (response) {
                setFileAula(response.data)
            })
            .catch(function (error) {

            })
    }

    useEffect(() => {
        setAula();
        getCurso();
        api.get(url).then((response) => {
            setCurso(response.data.find(filtro => filtro.codigo == id))
        })
    }, []);

    const marcarAulaConcluida = async () => {
        try {
            setloading(true)
            await api.get('Curso/MarcarConcluido/' + pAula.codigo).then((response) => {
                setNomeModulo(response.data.nomeModulo)
                if(response.data.isCertificado == true)
                {
                    setloading(false)
                    ref.current.click()
                }
                else if (response.data.status == true)
                {
                    setloading(false)
                    toast.success('Aula marcada como concluída!')
                }
                else if (response.data.status == true && response.data.isCertificado == false)
                {
                    setloading(false)
                    toast.success('Aula marcada como concluída!')
                }
            });
        } catch {
            setloading(false)
            toast.warning("Essa aula já está marcada como concluída!")
        }
        finally {
            getAulaConcluida();
        }
    };

    return (
        <div>
            <HeaderAluno />
            <div className="body-aula">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={`/trilha`}>Trilha</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">FULL STACK {curso == null ? "" : curso.descricao.split(" ")[2]}</li>
                    </ol>
                </nav>
                {loading == true ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '15%'}}><div style={{width: '3rem', height: '3rem'}} class="text-light spinner-border-sm spinner-border" role="status"></div></div> : 
                <div className="box-aulas">
                    <div className="box-aulas-video">
                        <iframe width="560" height="315" src={pAula?.urlAula} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen="true"></iframe>
                    </div>

                    <div className="box-aulas-videos blocos-dashboard">
                        <div className="videos-nav">
                            <p className={pAtivo === 'aulas' ? 'ativo' : ''} onClick={mostrarAulas}>Aulas</p>
                            <p className={pAtivo === 'comentarios' ? 'ativo' : ''} onClick={mostrarComentarios}>Comentários</p>
                        </div>
                        {componenteAtivo === 'aulas' && <Aulas setAula={setpAula} handleFileAula={handleFileAula} cursoid={id} aulaConcluida={aulaConcluida} getAulaConcluida={getAulaConcluida} />}
                        {componenteAtivo === 'comentarios' && <Comentarios AulaId={pAula?.codigo} />}
                        <button className="botao-aula-concluida" onClick={marcarAulaConcluida}>Marcar aula como concluída</button>
                    </div>

                    <div className="box-descricao">
                        <h1>{pAula?.descricao}</h1>
                        <span>Descrição</span>
                        <p>{pAula?.detalhe}</p>
                        {fileAula.length > 0 ? <p>Material de Apoio:</p> : ""}
                        <ul>
                            {fileAula.length > 0 ? fileAula.map((file) => {
                                return (
                                    <li>
                                    <a target='_blank' href={`https://api.varsolutions.com.br/filesAula/${file.url}`}><p className='fileAula'>{file?.nome}</p></a>
                                    </li>
                                )
                            }) :
                                ""
                            }
                        </ul>
                    </div>
                </div>
                    }
            </div>

            <ModalSuporte />

            <div className="modal-certificado modal-atraso modal fade" id="exampleModalCertificado" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <button hidden ref={ref} type="button" className='botao-inscricao' data-bs-toggle="modal" data-bs-target="#exampleModalCertificado">modal</button>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <img src={quality}/>
                            <p><strong>Parabéns {primeirosNomes}!</strong> <br/> Você concluiu com sucesso o módulo de <br/><strong>{nomeModulo}</strong>!</p>
                            <p>Seu certificado foi enviado diretamente para o seu e-mail. Por favor, verifique sua caixa de entrada.</p>
                            <p>Siga investindo em seu desenvolvimento e continue alcançando novas conquistas!</p>
                            <button className="btn btn-primary" onClick={redirecionarTela}>Meus Certificados</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}