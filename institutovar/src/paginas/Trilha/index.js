import './trilha.css';
import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAluno from '../../componentes/HeaderAluno';
import api from '../../services/api'
import { IoTime, IoCalendar } from "react-icons/io5"
import { toast } from 'react-toastify';
import ModalSuporte from '../../componentes/ModalSuporte';

export default function Trilha() {
    const [trilha, setTrilha] = useState([]);
    const [Progresso, setprogress] = useState([]);
    const [loading, setloading] = useState(true);    
    const navigate = useNavigate();
    const getTrilha = async () => {
        try {
            const response = await api.get('Dashboard/ObterDashboard');
            const responseData = response.data;
            if(!responseData.unidadeCodigo || responseData.unidadeCodigo === 3)
            {
                await api.get('/home/obtercursos').then((response) => {
                    setTrilha(response.data)
                    setloading(false)
                })
                await api.get('/Home/ObterProgresso').then((response) => {
                    setprogress(response.data)
                })
            }
            else if (!responseData.nome || responseData.nome === null ||
                !responseData.cargo || responseData.cargo === null||
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
            !responseData.cargo || responseData.cargo === null)
            {
                navigate("/dashboard");
                toast.error("Complete seu perfil para acessar as aulas.")
            }
        else{
        await api.get('/home/obtercursos').then((response) => {
            setTrilha(response.data)
            setloading(false)
        })
        await api.get('/Home/ObterProgresso').then((response) => {
            setprogress(response.data)
        })
    }
}
    catch (error) {
    
    }
    }
    useEffect(() => {
        getTrilha();
    }, []);



    return (
        <div>
            <HeaderAluno />
            <div className='article-trilha'>
                {loading == true ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '15%'}}><div style={{color: 'black', width: '3rem', height: '3rem'}} class="text-light spinner-border-sm spinner-border" role="status"></div></div> : ""}
                {trilha.map((curso, i) => {
                    const data = new Date(curso.atualizadoem)
                    return (
                        <article key={curso.codigo}>
                            <div className="body-trilha">
                                <Link to={`/trilha/aula/${curso.codigo}`} className="box-trilha">
                                    <img src={`https://api.varsolutions.com.br/CursosVar/${curso.logo}`} alt='Capa do módulo'/>
                                    <div className="box-trilha-conteudo">
                                        <h1>{curso.descricao}</h1>
                                        <p>{curso.detalhes}</p>
                                    </div>
                                    <div className="box-trilha-box">
                                        <label>Progresso</label>
                                        <div className="div-progress">
                                            <div class="progress heigth-progress" role="progressbar" aria-label="Animated striped example" aria-valuemin="0" aria-valuemax="100">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated width-div2 bg-success" style={{ width: `${Progresso[i]}%` }}></div>
                                            </div>
                                            <span>{Progresso[i] > 100 ? "100" : Progresso[i]}%</span>
                                        </div>

                                        <div className='div-trilha-itens'>
                                            <div className='div-trilha-item'>
                                                <IoTime />
                                                <div>
                                                    <p>Carga horária</p>
                                                        <span>{curso.cargaHoraria}h</span>
                                                </div>
                                            </div>
                                            <div className='div-trilha-item'>
                                                <IoCalendar />
                                                <div>
                                                    <p>Atualizado em</p>
                                                    <span>{`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </article>
                    )
                })}
            </div>
            <ModalSuporte/> 
        </div>


    )
}