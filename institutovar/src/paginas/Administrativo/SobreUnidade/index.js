import HeaderAluno from "../../../componentes/HeaderAluno";
import api from "../../../services/api";
import React, { useEffect, useState } from "react";
import '../SobreUnidade/SobreUnidade.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";



export default function SobreUnidade() {
    const [unidades, setUnidades] = useState([])//get

    const [NameUnidade, setUnidade] = useState([])
    const [qtdNote, setQtdNote] = useState(0)
    const [telContato, setTelContato] = useState([])


    const [idUnidade, setIdUnidade] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        api.get('Administrativo/BuscarUnidades')
            .then(function (response) {
                setUnidades(response.data)
                setIsLoading(false)
            })
            .catch(function (error) {                
            })
    }, [])

    function handleEditClick(unidade) {
        setIdUnidade(unidade.codigo);
    }

    function handleDeleteClick(unidade) {
        setIdUnidade(unidade.codigo);
    }

    function EditarUnidade() {
        api.put(`Administrativo/AtualizarUnidade/${idUnidade}`, {
            descricao: NameUnidade,
            qtdNote: qtdNote,
            telContato: telContato,
        })
            .then((response) => {                
                toast.success("Unidade editada com sucesso!")
                window.location.reload()
            })
            .catch((response) => {
                toast.error(`Não foi possivel realizar o seu cadastro.`)                
            })
    }

    function DeletarUnidade() {
        api.delete(`Administrativo/DeletarUnidade/${idUnidade}`)
            .then((response) => {                
                toast.success("deletado com sucesso!")
                window.location.reload()
            })
            .catch((response) => {
                toast.error(`Não foi possivel deletar`)                
            })
    }

    function adicionarUnidade() {
        api.post(`Administrativo/InserirUnidade`, {
            descricao: NameUnidade,
            qtdNote: qtdNote,
            telContato: telContato,
        })
            .then((r) => {                
                toast.success("unidade adicionada com sucesso!")
                window.location.reload()
            })
            .catch((r) => {
                toast.error(`Não foi possivel adicionar a unidade!`)                
            })
    }

    const handleTrocaPagina = () => {
        navigate('/administrativo/cursosVinculados');
    };

    if (isLoading) {
        return (
            <div>
                <HeaderAluno espera={true} />
                <p className="isLoading">Carregando Unidades...</p>
            </div>
        )
    }


    return (
        <div className="body-administrativo">

            <HeaderAluno espera={true} />

            <main>

                <h1>Unidades</h1>
                <div className='body-buttons'>
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalInsert">Adicionar</button>

                    <button className="btn btn-primary" onClick={handleTrocaPagina}>Vincular curso à Unidade</button>
                </div>

                <div className="table-container">
                    <table class="table table-info table-dark table-striped table-hover table-striped" id="tabela">
                        <thead>
                            <tr>
                                <th>Descrição/Unidade</th>
                                <th>qtdNote</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unidades.map((unidade) => (
                                <tr key={unidade.codigo}>
                                    <td>{unidade.descricao}</td>
                                    <td>{unidade.qtdNote}</td>
                                    <td>{unidade.telContato}</td>
                                    <td><button data-bs-toggle="modal" className="btn btn-primary" data-bs-target="#modalEdit" onClick={() => handleEditClick(unidade)}>Editar</button>                                    <button data-bs-toggle="modal" data-bs-target="#modalDelete" className="btn btn-danger" onClick={() => handleDeleteClick(unidade)}>Deletar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='modal-parabens'>
                    <div class="modal fade"
                        id="modalEdit"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true">

                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <h2>Editar unidade</h2>

                                    {/* <input value={idUnidade} type="text" onChange={(e) => setIdUnidade(e.target.value)} placeholder="Digite o id da unidade para ser editada" /> */}

                                    <label>Nome unidade</label>
                                    <input value={NameUnidade} type="text" onChange={(e) => setUnidade(e.target.value)} placeholder="Digite o nome da unidade/descrição" />

                                    <label>Quantidade de notebooks</label>
                                    <input value={qtdNote} type="number" onChange={(e) => setQtdNote(e.target.value)} placeholder="Digite a quantidade de notebooks" />

                                    <label>Telefone para contato</label>
                                    <input value={telContato} type="text" onChange={(e) => setTelContato(e.target.value)} placeholder="Digite um numero de telefone para contato" />

                                    <button onClick={EditarUnidade}>Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='modal-parabens'>
                    <div class="modal fade"
                        id="modalDelete"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true">

                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <h2>Deletar unidade</h2>

                                    {/* <label>Id unidade</label>
                                <input value={idUnidade} type="text" onChange={(e) => setIdUnidade(e.target.value)} placeholder="Digite o id da unidade para ser deletada" /> */}

                                    <button onClick={DeletarUnidade}>Deletar unidade</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='modal-parabens'>
                    <div class="modal fade"
                        id="modalInsert"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true">

                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <h2>Inserir unidade</h2>

                                    <label>Nome unidade</label>
                                    <input value={NameUnidade} type="text" onChange={(e) => setUnidade(e.target.value)} placeholder="Digite o nome da unidade/descrição" />

                                    <label>Quantidade de notebooks</label>
                                    <input value={qtdNote} type="number" onChange={(e) => setQtdNote(e.target.value)} placeholder="Digite a quantidade de notebooks" />

                                    <label>Telefone para contato</label>
                                    <input value={telContato} type="text" onChange={(e) => setTelContato(e.target.value)} placeholder="Digite um numero de telefone para contato" />

                                    <button onClick={adicionarUnidade}>Adicionar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}