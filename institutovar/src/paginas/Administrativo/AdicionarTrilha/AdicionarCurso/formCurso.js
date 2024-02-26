import React, { useRef, useState } from "react";
import '../adicionartrilha.css';
import HeaderAluno from "../../../../componentes/HeaderAluno";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { Link } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";

export default function FormCurso() {
    const [titulo, setTitulo] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [cargaHoraria, setCargaHoraria] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);


    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };


    const handleSubirAImagiPruCurço = async (cursoId) => {
        if (selectedFiles.length === 0) {
            toast.warning('Selecione pelo menos uma foto para fazer o upload.');
            return;
        }

        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        try {
            const response = await api.put('Curso/InserirImgFormCurso/' + cursoId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status == 200)
                toast.success('Foto enviada com sucesso!');
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };


    const handlePostCourse = async () => {
        if (selectedFiles.length === 0) {
            toast.warning('Selecione pelo menos uma foto para fazer o upload.');
            return;
        }
        try {
            api.post("Curso/InserirCurso", {
                titulo: titulo,
                detalhes: detalhes,
                cargaHoraria: cargaHoraria
            }).then((response) => {                
                handleSubirAImagiPruCurço(response.data[response.data.length - 1].codigo)
                if (response.status = 200)
                    toast.success("Curso salvo com sucesso!")
            })
        }
        catch (error) {
            toast.error("Algo deu errado.")
        }
    }
    
    return (
        <>
            <HeaderAluno />
            <div className="body-form-curso">
                <div className="left">
                    <Link to={`/administrativo/cursos`}><BsArrowLeftCircleFill /> Voltar</Link>
                </div>
                <form className="row" onSubmit={(e) => {
                    e.preventDefault();
                    handlePostCourse();
                }}>
                    <img src={selectedFiles[0]} />
                    {/* public string titulo { get; set; }
                        public string detalhes { get; set; }
                        public string? Logo { get; set; }
                        public int? cargaHoraria { get; set; } */}


                    <div className="row">
                    
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange} 
                        
                        />

                        <div className="col-md-6">
                            <label>Título do curso:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Digite o título do curso' value={titulo} onChange={(e) => { setTitulo(e.target.value) }} />

                            </div>
                        </div>
                        <div className="col-md-6">
                            <label>Carga Horária:</label>
                            <div className='presencial-input'>
                                <input type="text" placeholder='Digite a carga horária' value={cargaHoraria} onChange={(e) => { setCargaHoraria(e.target.value.replace(/[^0-9]/g, '')) }} />

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Detalhes:</label>
                            <textarea style={{ color: "black" }} type="text" placeholder='Digite os detalhes do curso' value={detalhes} onChange={(e) => { setDetalhes(e.target.value) }} ></textarea>
                        </div>
                    </div>

                   
                    <div></div>
                    <div className="row">
                        <button className="btn btn-success" type="submit">Enviar</button>
                    </div>
                </form >
            </div >

        </>
    )
}