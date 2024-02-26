import { MdSportsEsports } from "react-icons/md";
import HeaderAluno from "../../../componentes/HeaderAluno";
import { toast } from 'react-toastify';
import React, { useState, useEffect, useRef } from 'react';
import api from '../../../services/api';
import { PiPictureInPictureThin } from "react-icons/pi";
import '../../Home/home.css';
import { IoMapOutline } from "react-icons/io5";
import { FiUpload } from 'react-icons/fi';
import avatar from '../../../imagens/avatar.png';
import { useActionData } from "react-router-dom";



export default function EstilizarSistema() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [secaoInicioVideo, setSecaoInicioVideo] = useState('');
    const [secaoInicioLogo, setsecaoInicioLogo] = useState('')
    const [showText, setShowText] = useState(false);
    const [tituloQuemSomos, setTituloQuemSomos] = useState('')
    const [subtituloQuemSomos, setSubtituloQueSomos] = useState('')
    const [textoQuemSomos, setTextoQuemSomos] = useState('')
    const [isAtivoQuemSomos, setQuemSomosAtivo] = useState(false);
    const [tituloNossoProposito, setTituloNossoProposito] = useState('')
    const [textoNossoProposito, setTextoNossoProposito] = useState('')
    const [dilema1, setDilema1] = useState('')
    const [dilema2, setDilema2] = useState('')
    const [dilema3, setDilema3] = useState('')
    const [dilema4, setDilema4] = useState('')
    const [isAtivoNossoProposito, setNossoPropositoAtivo] = useState(false)
    const [tituloNossaHistoria, setTituloNossaHistoria] = useState('')
    const [textoNossaHistoria, setTextoNossaHistoria] = useState('')
    const [image1, setImagem1] = useState([])
    const [image1valor, setImagem1Valor] = useState('')
    const [Image1Text, setImage1Text] = useState(false);
    const fileInputRefImage1 = useRef(null);
    const [image2, setImagem2] = useState([])
    const [image2valor, setImagem2Valor] = useState('')
    const [Image2Text, setImage2Text] = useState(false);
    const fileInputRefImage2 = useRef(null);
    const [image3, setImagem3] = useState([])
    const [image3valor, setImagem3Valor] = useState('')
    const [Image3Text, setImage3Text] = useState(false);
    const fileInputRefImage3 = useRef(null);
    const [image4, setImagem4] = useState([])
    const [image4valor, setImagem4Valor] = useState('')
    const [Image4Text, setImage4Text] = useState(false);
    const fileInputRefImage4 = useRef(null);
    const [isAtivoNossaHistoria, setNossaHistoriaAtivo] = useState(false)
    const [tituloCasesDeSucesso, setTituloCasesDeSucesso] = useState('')
    const [foto1, setFoto1] = useState([]);
    const [foto1Valor, setFoto1Valor] = useState('')
    const [foto1Text, setFoto1Text] = useState(false);
    const fileInputRefFoto1 = useRef(null)
    const [nome1, setNome1] = useState('');
    const [cargo1, setCargo1] = useState('');
    const [idade1, setIdade1] = useState('');
    const [urlLinkedin1, setUrlLinkedin1] = useState('');
    const [texto1, setTexto1] = useState('');
    const [foto2, setFoto2] = useState([]);
    const [foto2Valor, setFoto2Valor] = useState('')
    const [foto2Text, setFoto2Text] = useState(false);
    const fileInputRefFoto2 = useRef(null)
    const [nome2, setNome2] = useState('');
    const [cargo2, setCargo2] = useState('');
    const [idade2, setIdade2] = useState('');
    const [urlLinkedin2, setUrlLinkedin2] = useState('');
    const [texto2, setTexto2] = useState('');
    const [foto3, setFoto3] = useState([]);
    const [foto3Valor, setFoto3Valor] = useState('')
    const [foto3Text, setFoto3Text] = useState(false);
    const fileInputRefFoto3 = useRef(null)
    const [nome3, setNome3] = useState([]);
    const [cargo3, setCargo3] = useState([]);
    const [idade3, setIdade3] = useState([]);
    const [urlLinkedin3, setUrlLinkedin3] = useState([]);
    const [texto3, setTexto3] = useState([]);
    const [foto4, setFoto4] = useState([]);
    const [foto4Valor, setFoto4Valor] = useState('')
    const [foto4Text, setFoto4Text] = useState(false);
    const fileInputRefFoto4 = useRef(null)
    const [nome4, setNome4] = useState('');
    const [cargo4, setCargo4] = useState('');
    const [idade4, setIdade4] = useState('');
    const [urlLinkedin4, setUrlLinkedin4] = useState('');
    const [texto4, setTexto4] = useState('');
    const [foto5, setFoto5] = useState([]);
    const [foto5Valor, setFoto5Valor] = useState('')
    const [foto5Text, setFoto5Text] = useState(false);
    const fileInputRefFoto5 = useRef(null)
    const [nome5, setNome5] = useState('');
    const [cargo5, setCargo5] = useState('');
    const [idade5, setIdade5] = useState('');
    const [urlLinkedin5, setUrlLinkedin5] = useState('');
    const [texto5, setTexto5] = useState('');
    const [foto6, setFoto6] = useState([]);
    const [foto6Valor, setFoto6Valor] = useState('')
    const [foto6Text, setFoto6Text] = useState(false);
    const fileInputRefFoto6 = useRef(null)
    const [nome6, setNome6] = useState('');
    const [cargo6, setCargo6] = useState('');
    const [idade6, setIdade6] = useState('');
    const [urlLinkedin6, setUrlLinkedin6] = useState('');
    const [texto6, setTexto6] = useState('');
    const [foto7, setFoto7] = useState([]);
    const [foto7Valor, setFoto7Valor] = useState('')
    const [foto7Text, setFoto7Text] = useState(false);
    const fileInputRefFoto7 = useRef(null)
    const [nome7, setNome7] = useState('');
    const [cargo7, setCargo7] = useState('');
    const [idade7, setIdade7] = useState('');
    const [urlLinkedin7, setUrlLinkedin7] = useState('');
    const [texto7, setTexto7] = useState('');
    const [foto8, setFoto8] = useState([]);
    const [foto8Valor, setFoto8Valor] = useState('')
    const [foto8Text, setFoto8Text] = useState(false);
    const fileInputRefFoto8 = useRef(null)
    const [nome8, setNome8] = useState('');
    const [cargo8, setCargo8] = useState('');
    const [idade8, setIdade8] = useState('');
    const [urlLinkedin8, setUrlLinkedin8] = useState('');
    const [texto8, setTexto8] = useState('');


    const handleFotoClick1 = () => {
        fileInputRefFoto1.current.click();
    };
    const handleTituloCasesDeSucesso = (e) => {
        setTituloCasesDeSucesso(e.target.value)
    }
    const handleFoto1 = (e) => {
        setFoto1(e.target.files)
        setFoto1Text(true)
    }
    const handleNome1 = (e) => {
        setNome1(e.target.value)
    }
    const handleCargo1 = (e) => {
        setCargo1(e.target.value)
    }
    const handleIdade1 = (e) => {
        setIdade1(e.target.value)
    }
    const handleLikedin1 = (e) => {
        setUrlLinkedin1(e.target.value)
    }
    const handleTexto1 = (e) => {
        setTexto1(e.target.value)
    }


    const handleFotoClick2 = () => {
        fileInputRefFoto2.current.click();
    };
    const handleFoto2 = (e) => {
        setFoto2(e.target.files)
        setFoto2Text(true)
    }
    const handleNome2 = (e) => {
        setNome2(e.target.value)
    }
    const handleCargo2 = (e) => {
        setCargo2(e.target.value)
    }
    const handleIdade2 = (e) => {
        setIdade2(e.target.value)
    }
    const handleLikedin2 = (e) => {
        setUrlLinkedin2(e.target.value)
    }
    const handleTexto2 = (e) => {
        setTexto2(e.target.value)
    }


    const handleFotoClick3 = () => {
        fileInputRefFoto3.current.click();
    };
    const handleFoto3 = (e) => {
        setFoto3(e.target.files)
        setFoto3Text(true)
    }
    const handleNome3 = (e) => {
        setNome3(e.target.value)
    }
    const handleCargo3 = (e) => {
        setCargo3(e.target.value)
    }
    const handleIdade3 = (e) => {
        setIdade3(e.target.value)
    }
    const handleLikedin3 = (e) => {
        setUrlLinkedin3(e.target.value)
    }
    const handleTexto3 = (e) => {
        setTexto3(e.target.value)
    }



    const handleFotoClick4 = () => {
        fileInputRefFoto4.current.click();
    };
    const handleFoto4 = (e) => {
        setFoto4(e.target.files)
        setFoto4Text(true)
    }
    const handleNome4 = (e) => {
        setNome4(e.target.value)
    }
    const handleCargo4 = (e) => {
        setCargo4(e.target.value)
    }
    const handleIdade4 = (e) => {
        setIdade4(e.target.value)
    }
    const handleLikedin4 = (e) => {
        setUrlLinkedin4(e.target.value)
    }
    const handleTexto4 = (e) => {
        setTexto4(e.target.value)
    }



    const handleFotoClick5 = () => {
        fileInputRefFoto5.current.click();
    };
    const handleFoto5 = (e) => {
        setFoto5(e.target.files)
        setFoto5Text(true)
    }
    const handleNome5 = (e) => {
        setNome5(e.target.value)
    }
    const handleCargo5 = (e) => {
        setCargo5(e.target.value)
    }
    const handleIdade5 = (e) => {
        setIdade5(e.target.value)
    }
    const handleLikedin5 = (e) => {
        setUrlLinkedin5(e.target.value)
    }
    const handleTexto5 = (e) => {
        setTexto5(e.target.value)
    }


    const handleFotoClick6 = () => {
        fileInputRefFoto6.current.click();
    };
    const handleFoto6 = (e) => {
        setFoto6(e.target.files)
        setFoto6Text(true)
    }
    const handleNome6 = (e) => {
        setNome6(e.target.value)
    }
    const handleCargo6 = (e) => {
        setCargo6(e.target.value)
    }
    const handleIdade6 = (e) => {
        setIdade6(e.target.value)
    }
    const handleLikedin6 = (e) => {
        setUrlLinkedin6(e.target.value)
    }
    const handleTexto6 = (e) => {
        setTexto6(e.target.value)
    }



    const handleFotoClick7 = () => {
        fileInputRefFoto7.current.click();
    };
    const handleFoto7 = (e) => {
        setFoto7(e.target.files)
        setFoto7Text(true)
    }
    const handleNome7 = (e) => {
        setNome7(e.target.value)
    }
    const handleCargo7 = (e) => {
        setCargo7(e.target.value)
    }
    const handleIdade7 = (e) => {
        setIdade7(e.target.value)
    }
    const handleLikedin7 = (e) => {
        setUrlLinkedin7(e.target.value)
    }
    const handleTexto7 = (e) => {
        setTexto7(e.target.value)
    }



    const handleFotoClick8 = () => {
        fileInputRefFoto8.current.click();
    };
    const handleFoto8 = (e) => {
        setFoto8(e.target.files)
        setFoto8Text(true)
    }
    const handleNome8 = (e) => {
        setNome8(e.target.value)
    }
    const handleCargo8 = (e) => {
        setCargo8(e.target.value)
    }
    const handleIdade8 = (e) => {
        setIdade8(e.target.value)
    }
    const handleLikedin8 = (e) => {
        setUrlLinkedin8(e.target.value)
    }
    const handleTexto8 = (e) => {
        setTexto8(e.target.value)
    }



    const handletiutloQuemSomos = (e) => {
        setTituloQuemSomos(e.target.value);
    }
    const handleSubitituloQuemSomos = (e) => {
        setSubtituloQueSomos(e.target.value)
    }
    const handleTextoQueSomos = (e) => {
        setTextoQuemSomos(e.target.value)
    }
    const handleTituloNossoProposito = (e) => {
        setTituloNossoProposito(e.target.value)
    }
    const handleTextoNossoProposito = (e) => {
        setTextoNossoProposito(e.target.value)
    }
    const handleDilema1 = (e) => {
        setDilema1(e.target.value)
    }
    const handleDilema2 = (e) => {
        setDilema2(e.target.value)
    }
    const handleDilema3 = (e) => {
        setDilema3(e.target.value)
    }
    const handleDilema4 = (e) => {
        setDilema4(e.target.value)
    }


    const handleTituloNossaHistoria = (e) => {
        setTituloNossaHistoria(e.target.value)
    }
    const handleTextoNossaHistoria = (e) => {
        setTextoNossaHistoria(e.target.value)
    }

    const handleCaso1 = async (e) => {
        e.preventDefault();
                
        const formData = new FormData();

        for (let i = 0; i < foto1.length; i++) {
            formData.append('files', foto1[i]);
        }

        formData.append('nome', nome1);
        formData.append('cargo', cargo1);
        formData.append('idade', idade1);
        formData.append('linkedin', urlLinkedin1);
        formData.append('texto', texto1);
        formData.append('numero', "1");
        try {
            const response = await api.put('Estilizacao/AtualizarCasos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Atualizado');
            else
                toast.warn("Algo deu errado");
            setFoto1Text(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };
    const handleCaso2 = async (e) => {
        e.preventDefault();        

        const formData = new FormData();

        for (let i = 0; i < foto2.length; i++) {
            formData.append('files', foto2[i]);
        }

        formData.append('nome', nome2);
        formData.append('cargo', cargo2);
        formData.append('idade', idade2);
        formData.append('linkedin', urlLinkedin2);
        formData.append('texto', texto2);
        formData.append('numero', "2");
        try {
            const response = await api.put('Estilizacao/AtualizarCasos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Atualizado');
            else
                toast.warn("Algo deu errado");
            setFoto2Text(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };


    const handleCaso3 = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < foto3.length; i++) {
            formData.append('files', foto3[i]);
        }

        formData.append('nome', nome3);
        formData.append('cargo', cargo3);
        formData.append('idade', idade3);
        formData.append('linkedin', urlLinkedin3);
        formData.append('texto', texto3);
        formData.append('numero', "3");
        try {
            const response = await api.put('Estilizacao/AtualizarCasos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Atualizado');
            else
                toast.warn("Algo deu errado");
            setFoto3Text(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };



    const handleCaso4 = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < foto4.length; i++) {
            formData.append('files', foto4[i]);
        }

        formData.append('nome', nome4);
        formData.append('cargo', cargo4);
        formData.append('idade', idade4);
        formData.append('linkedin', urlLinkedin4);
        formData.append('texto', texto4);
        formData.append('numero', "4");
        try {
            const response = await api.put('Estilizacao/AtualizarCasos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Atualizado');
            else
                toast.warn("Algo deu errado");
            setFoto4Text(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };




    const handleCaso5 = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < foto5.length; i++) {
            formData.append('files', foto5[i]);
        }

        formData.append('nome', nome5);
        formData.append('cargo', cargo5);
        formData.append('idade', idade5);
        formData.append('linkedin', urlLinkedin5);
        formData.append('texto', texto5);
        formData.append('numero', "5");
        try {
            const response = await api.put('Estilizacao/AtualizarCasos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Atualizado');
            else
                toast.warn("Algo deu errado");
            setFoto5Text(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };


    const handleCaso6 = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < foto6.length; i++) {
            formData.append('files', foto6[i]);
        }

        formData.append('nome', nome6);
        formData.append('cargo', cargo6);
        formData.append('idade', idade6);
        formData.append('linkedin', urlLinkedin6);
        formData.append('texto', texto6);
        formData.append('numero', "6");
        try {
            const response = await api.put('Estilizacao/AtualizarCasos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Atualizado');
            else
                toast.warn("Algo deu errado");
            setFoto6Text(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };




    const handleCaso7 = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < foto7.length; i++) {
            formData.append('files', foto7[i]);
        }

        formData.append('nome', nome7);
        formData.append('cargo', cargo7);
        formData.append('idade', idade7);
        formData.append('linkedin', urlLinkedin7);
        formData.append('texto', texto7);
        formData.append('numero', "7");
        try {
            const response = await api.put('Estilizacao/AtualizarCasos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Atualizado');
            else
                toast.warn("Algo deu errado");
            setFoto7Text(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };



    const handleCaso8 = async (e) => {
        e.preventDefault();

        const formData = new FormData();        

        for (let i = 0; i < foto8.length; i++) {
            formData.append('files', foto8[i]);
        }

        formData.append('nome', nome8);
        formData.append('cargo', cargo8);
        formData.append('idade', idade8);
        formData.append('linkedin', urlLinkedin8);
        formData.append('texto', texto8);
        formData.append('numero', "8");
        try {
            const response = await api.put('Estilizacao/AtualizarCasos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Atualizado');
            else
                toast.warn("Algo deu errado");
            setFoto8Text(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };

    const handleFormImage1 = async (e) => {
        e.preventDefault();
        if (image1.length === 0) {
            toast.warning('Selecione pelo menos uma foto para fazer o upload.');
            return;
        }


        const formData = new FormData();

        for (let i = 0; i < image1.length; i++) {
            formData.append('files', image1[i]);
        }

        try {
            const response = await api.put('Estilizacao/atualizarImagem1', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Foto enviada com sucesso!');
            else
                toast.warn("Algo deu errado");

            setImage1Text(false)
            await handleObter()
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };
    const handleFormImage2 = async (e) => {
        e.preventDefault();
        if (image2.length === 0) {
            toast.warning('Selecione pelo menos uma foto para fazer o upload.');
            return;
        }


        const formData = new FormData();

        for (let i = 0; i < image2.length; i++) {
            formData.append('files', image2[i]);
        }

        try {
            const response = await api.put('Estilizacao/atualizarImagem2', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Foto enviada com sucesso!');
            else
                toast.warn("Algo deu errado");
            setImage2Text(false)
            await handleObter()
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };
    const handleFormImage3 = async (e) => {
        e.preventDefault();
        if (image3.length === 0) {
            toast.warning('Selecione pelo menos uma foto para fazer o upload.');
            return;
        }


        const formData = new FormData();

        for (let i = 0; i < image3.length; i++) {
            formData.append('files', image3[i]);
        }

        try {
            const response = await api.put('Estilizacao/atualizarImagem3', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Foto enviada com sucesso!');
            else
                toast.warn("Algo deu errado");
            setImage3Text(false)
            await handleObter()
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };
    const handleFormImage4 = async (e) => {
        e.preventDefault();
        if (image4.length === 0) {
            toast.warning('Selecione pelo menos uma foto para fazer o upload.');
            return;
        }


        const formData = new FormData();

        for (let i = 0; i < image4.length; i++) {
            formData.append('files', image4[i]);
        }

        try {
            const response = await api.put('Estilizacao/atualizarImagem4', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200)
                toast.success('Foto enviada com sucesso!');
            else
                toast.warn("Algo deu errado");
            setImage4Text(false)
            await handleObter()
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };





    const handleAtualizarNossaHistoria = async () => {
        try {
            const response = await api.put('Estilizacao/EstilizarNossaHistoria', {
                titutlo: tituloNossaHistoria, texto: textoNossaHistoria
            })
            
            if (response.status === 200)
                toast.success('Seção "NOSSA HISTORIA" atualizada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }
    const handleisAtivarNossaHistoria = async () => {
        try {
            const response = await api.put('Estilizacao/isAtivarNossaHistoria', {
                isAtivo: true
            })
            if (response.status === 200)
                toast.success('Seção "NOSSO PROPÓSITO" ativada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }
    const handleisDesativarNossaHistoria = async () => {
        try {
            const response = await api.put('Estilizacao/isAtivarNossaHistoria', {
                isAtivo: false
            })
            if (response.status === 200)
                toast.success('Seção "NOSSO PROPÓSITO" desativada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }


    const handleAtualizarNossoProposito = async () => {
        try {
            const response = await api.put('Estilizacao/estilizarNossoProposito', {
                titulo: tituloNossoProposito, texto: textoNossoProposito, dilema1: dilema1, dilema2: dilema2, dilema3: dilema3, dilema4: dilema4
            })
            if (response.status === 200)
                toast.success('Seção "NOSSO PROPÓSITO" atualizada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }
    const handleisAtivarNossoProposito = async (response) => { 
        try {
            const response = await api.put('Estilizacao/isAtivarNossoProposito', {
                isAtivo: true
            })
            if (response.status === 200)
                toast.success('Seção "NOSSO PROPÓSITO" ativada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }
    const handleisDesativarNossoProposito = async () => {
        try {
            const response = await api.put('Estilizacao/isAtivarNossoProposito', {
                isAtivo: false
            })

            if (response.status === 200)
                toast.success('Seção "NOSSO PROPÓSITO" desativada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }

    const handleAtuzalizarQuemSomos = async () => {
        try {
            if (tituloQuemSomos == null || tituloQuemSomos == "") {
                toast.warn('Digite o titulo para atualiza a seção "QUEM SOMOS" ')
                return;
            }
            if (subtituloQuemSomos == null || subtituloQuemSomos == "") {
                toast.warn('Digite o subtítulo para atualizar a seção "QUEM SOMOS".')
                return;
            }
            if (textoQuemSomos == null || textoQuemSomos == "") {
                toast.warn('Digite um texto para atualizar a seção "QUEM SOMOS".')
                return;
            }
            const response = await api.put('Estilizacao/estilizarQuemSomos', {
                titulo: tituloQuemSomos, subtitulo: subtituloQuemSomos, texto: textoQuemSomos
            })

            if (response.status === 200)
                toast.success('Seção "NOSSO PROPÓSITO" atualizada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }
    const handleisAtivarQuemSomos = async () => {
        try {
            const response = await api.put('Estilizacao/isAtivarQuemSomos', {
                isAtivo: true
            })

            if (response.status === 200)
                toast.success('Seção "QUEM SOMOS" ativada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }
    const handleisDesativarQuemSomos = async () => {
        try {
            const response = await api.put('Estilizacao/isAtivarQuemSomos', {
                isAtivo: false
            })

            if (response.status === 200)
                toast.success('Seção "QUEM SOMOS" desativada com sucesso');
            else
                toast.warn("Algo deu errado");
            await handleObter();
        } catch (error) {

        }
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (selectedFiles.length === 0) {
            toast.warning('Selecione pelo menos uma foto para fazer o upload.');
            return;
        }
        if (secaoInicioVideo == null || secaoInicioVideo === "" || secaoInicioVideo == "" || secaoInicioVideo === null) {
            toast.warn("Digite a url do video")
            return;
        }

        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        formData.append('urlVideo', secaoInicioVideo);
        try {
            const response = await api.put('Estilizacao/estilizarInicio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (response.status === 200)
                toast.success('Logo e vídeo atualizado com sucesso!');
            else
                toast.warn("Algo deu errado");
            setShowText(false)
            await handleObter();
        } catch (error) {
            toast.error('Erro ao enviar a foto.');
        }
    };
    const handleUrlVideo = (event) => {
        setSecaoInicioVideo(event.target.value);
    }
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
        setShowText(true);
    };

    const handleImage1NossaHistoria = (e) => {
        setImagem1(e.target.files);
        setImage1Text(true);
    };
    const handleImageClick1 = () => {
        fileInputRefImage1.current.click();
    };
    const handleImage2NossaHistoria = (e) => {
        setImagem2(e.target.files);
        setImage2Text(true);
    };
    const handleImageClick2 = () => {
        fileInputRefImage2.current.click();
    };
    const handleImage3NossaHistoria = (e) => {
        setImagem3(e.target.files);
        setImage3Text(true);
    };
    const handleImageClick3 = () => {
        fileInputRefImage3.current.click();
    };
    const handleImage4NossaHistoria = (e) => {
        setImagem4(e.target.files);
        setImage4Text(true);
    };
    const handleImageClick4 = () => {
        fileInputRefImage4.current.click();
    };
    const handleObter = async () => {
        try {
            const response = await api.get('Estilizacao/ObterInicio');
            const responseData = response.data;

            const videoFiltrado = responseData.find(item => item.codigoSecao === 1 && item.tipo === "Url Video");
            setSecaoInicioVideo(videoFiltrado.valor)

            const logoFiltrado = responseData.find(item => item.codigoSecao === 1 && item.tipo === "Imagem Logo")
            setsecaoInicioLogo(logoFiltrado.valor)





            const ativoQuemSomos = responseData.find(item => item.codigoSecao === 2 && item.tipo === "Titulo Quem Somos")
            setQuemSomosAtivo(ativoQuemSomos.isativo)

            const tituloquemsomos = responseData.find(item => item.codigoSecao === 2 && item.tipo === "Titulo Quem Somos");
            setTituloQuemSomos(tituloquemsomos.valor);

            const Subtituloquemsomos = responseData.find(item => item.codigoSecao === 2 && item.tipo === "Subtitulo Quem Somos");
            setSubtituloQueSomos(Subtituloquemsomos.valor);

            const textoquemsomos = responseData.find(item => item.codigoSecao === 2 && item.tipo === "Texto Quem Somos");
            setTextoQuemSomos(textoquemsomos.valor);







            const tituloNossoProposito = responseData.find(item => item.codigoSecao === 3 && item.tipo === "Titulo Nosso Proposito");
            setTituloNossoProposito(tituloNossoProposito.valor)

            const textoNossoProposito = responseData.find(item => item.codigoSecao === 3 && item.tipo === "Texto Nosso Proposito");
            setTextoNossoProposito(textoNossoProposito.valor);

            const dilema1 = responseData.find(item => item.codigoSecao === 3 && item.tipo === "Dilema 1");
            setDilema1(dilema1.valor)

            const dilema2 = responseData.find(item => item.codigoSecao === 3 && item.tipo === "Dilema 2");
            setDilema2(dilema2.valor)

            const dilema3 = responseData.find(item => item.codigoSecao === 3 && item.tipo === "Dilema 3");
            setDilema3(dilema3.valor)

            const dilema4 = responseData.find(item => item.codigoSecao === 3 && item.tipo === "Dilema 4");
            setDilema4(dilema4.valor);

            const ativoNossoProposito = responseData.find(item => item.codigoSecao === 3 && item.tipo === "Titulo Nosso Proposito")
            setNossoPropositoAtivo(ativoNossoProposito.isativo)





            const tituloNossaHistoria = responseData.find(item => item.codigoSecao === 6 && item.tipo === "Titulo Nossa Historia")
            setTituloNossaHistoria(tituloNossaHistoria.valor)


            const textoNossaHistoria = responseData.find(item => item.codigoSecao === 6 && item.tipo === "Texto Nossa Historia")
            setTextoNossaHistoria(textoNossaHistoria.valor);

            const image1Valor = responseData.find(item => item.codigoSecao === 6 && item.tipo === "Imagem 1")
            setImagem1Valor(image1Valor.valor)

            const image2Valor = responseData.find(item => item.codigoSecao === 6 && item.tipo === "Imagem 2")
            setImagem2Valor(image2Valor.valor)

            const image3valor = responseData.find(item => item.codigoSecao === 6 && item.tipo === "Imagem 3")
            setImagem3Valor(image3valor.valor)

            const image4valor = responseData.find(item => item.codigoSecao === 6 && item.tipo === "Imagem 4")
            setImagem4Valor(image4valor.valor)

            const ativoNossaHistoria = responseData.find(item => item.codigoSecao === 6 && item.tipo === "Titulo Nossa Historia")
            setNossaHistoriaAtivo(ativoNossaHistoria.isativo)





            const tituloCasesDeSucesso = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Titulo Cases de sucesso");
            setTituloCasesDeSucesso(tituloCasesDeSucesso.valor)

            const foto1Valor = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Foto 1");
            const nome1 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Nome 1");
            const cargo1 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Cargo 1");
            const idade1 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Idade 1");
            const linkedin1 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Url Likedin 1");
            const texto1 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Texto 1");
            setFoto1Valor(foto1Valor.valor);
            setNome1(nome1.valor);
            setCargo1(cargo1.valor);
            setIdade1(idade1.valor);
            setUrlLinkedin1(linkedin1.valor);
            setTexto1(texto1.valor);


            const foto2Valor = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Foto 2");
            const nome2 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Nome 2");
            const cargo2 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Cargo 2");
            const idade2 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Idade 2");
            const linkedin2 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Url Likedin 2");
            const texto2 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Texto 2");
            setFoto2Valor(foto2Valor.valor);
            setNome2(nome2.valor);
            setCargo2(cargo2.valor);
            setIdade2(idade2.valor);
            setUrlLinkedin2(linkedin2.valor);
            setTexto2(texto2.valor);


            const foto3Valor = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Foto 3");
            const nome3 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Nome 3");
            const cargo3 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Cargo 3");
            const idade3 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Idade 3");
            const linkedin3 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Url Likedin 3");
            const texto3 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Texto 3");
            setFoto3Valor(foto3Valor.valor);
            setNome3(nome3.valor);
            setCargo3(cargo3.valor);
            setIdade3(idade3.valor);
            setUrlLinkedin3(linkedin3.valor);
            setTexto3(texto3.valor);


            const foto4Valor = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Foto 4");
            const nome4 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Nome 4");
            const cargo4 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Cargo 4");
            const idade4 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Idade 4");
            const linkedin4 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Url Likedin 4");
            const texto4 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Texto 4");
            setFoto4Valor(foto4Valor.valor);
            setNome4(nome4.valor);
            setCargo4(cargo4.valor);
            setIdade4(idade4.valor);
            setUrlLinkedin4(linkedin4.valor);
            setTexto4(texto4.valor);


            const foto5Valor = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Foto 5");
            const nome5 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Nome 5");
            const cargo5 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Cargo 5");
            const idade5 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Idade 5");
            const linkedin5 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Url Likedin 5");
            const texto5 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Texto 5");
            setFoto5Valor(foto5Valor.valor);
            setNome5(nome5.valor);
            setCargo5(cargo5.valor);
            setIdade5(idade5.valor);
            setUrlLinkedin5(linkedin5.valor);
            setTexto5(texto5.valor);

            // Casos de sucesso - Item 6
            const foto6Valor = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Foto 6");
            const nome6 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Nome 6");
            const cargo6 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Cargo 6");
            const idade6 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Idade 6");
            const linkedin6 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Url Likedin 6");
            const texto6 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Texto 6");
            setFoto6Valor(foto6Valor.valor);
            setNome6(nome6.valor);
            setCargo6(cargo6.valor);
            setIdade6(idade6.valor);
            setUrlLinkedin6(linkedin6.valor);
            setTexto6(texto6.valor);

            // Casos de sucesso - Item 7
            const foto7Valor = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Foto 7");
            const nome7 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Nome 7");
            const cargo7 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Cargo 7");
            const idade7 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Idade 7");
            const linkedin7 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Url Likedin 7");
            const texto7 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Texto 7");
            setFoto7Valor(foto7Valor.valor);
            setNome7(nome7.valor);
            setCargo7(cargo7.valor);
            setIdade7(idade7.valor);
            setUrlLinkedin7(linkedin7.valor);
            setTexto7(texto7.valor);


            // Casos de sucesso - Item 8
            const foto8Valor = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Foto 8");
            const nome8 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Nome 8");
            const cargo8 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Cargo 8");
            const idade8 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Idade 8");
            const linkedin8 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Url Likedin 8");
            const texto8 = responseData.find(item => item.codigoSecao === 7 && item.tipo === "Texto 8");
            setFoto8Valor(foto8Valor.valor);
            setNome8(nome8.valor);
            setCargo8(cargo8.valor);
            setIdade8(idade8.valor);
            setUrlLinkedin8(linkedin8.valor);
            setTexto8(texto8.valor);



        } catch (error) {

        }
    }

    useEffect(() => {
        handleObter();
    }, [])

    return (
        <div className="body-administrativo">
            <HeaderAluno />
            <main>
                <div className="body-editar container-dados">
                    <div className='row' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {showText ? (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem selecionda! Deseja selecionar outra imagem?</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick} color="#fff" size={40} />
                                <img className="adm-input-img" src="" alt='Clique em carregar para atualizar' />
                                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: 1024 x 438</b></span>
                            </div>
                        ) : (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Adicione a logo</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick} color="#fff" size={40} />
                                <img className="adm-input-img" src={secaoInicioLogo == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${secaoInicioLogo}`} />
                                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: 1024 x 438</b></span>
                            </div>
                        )}
                        <div className="col-md-4">
                            <label>Digite a url do vídeo</label>
                            <input className="adm-input" type="text" value={secaoInicioVideo} onChange={handleUrlVideo}></input>
                        </div>
                        <iframe src={secaoInicioVideo} width="340px" height="400px" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen="true"></iframe>
                        <button className='btn btn-success' onClick={handleFormSubmit} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                    </div>
                    {isAtivoQuemSomos == false ? (
                        <div id='quem-somos'>
                            <h1>Quem somos</h1> <button className="btn btn-success" onClick={handleisAtivarQuemSomos}>Ativar Seção</button>
                            <label>Titulo</label>
                            <input className="adm-input" type="text" maxLength={112} value={tituloQuemSomos} onChange={handletiutloQuemSomos}></input>
                            <label>Subtitulo</label>
                            <input className="adm-input" type="text" maxLength={10} value={subtituloQuemSomos} onChange={handleSubitituloQuemSomos}></input>
                            <label>Texto</label>
                            <textarea className="adm-input" style={{ backgroundColor: "white", color: "black" }} rows="3" cols="40" maxLength={689} value={textoQuemSomos} onChange={handleTextoQueSomos}></textarea>
                        </div>
                    ) : (
                        <div id='quem-somos'>
                            <h1>Quem somos</h1> <button className="btn btn-danger" onClick={handleisDesativarQuemSomos}>Desativar seção</button>
                            <label>Titulo</label>
                            <input className="adm-input" type="text" value={tituloQuemSomos} onChange={handletiutloQuemSomos}></input>
                            <label>Subtitulo</label>
                            <input className="adm-input" type="text" maxLength={10} value={subtituloQuemSomos} onChange={handleSubitituloQuemSomos}></input>
                            <label>Texto</label>
                            <textarea className="adm-input" style={{ backgroundColor: "white", color: "black" }} rows="3" cols="40" maxLength={689} value={textoQuemSomos} onChange={handleTextoQueSomos}></textarea>
                            <button className="btn btn-success" onClick={handleAtuzalizarQuemSomos} type="button" style={{ width: '20%', marginTop: '4%' }}>Atualizar quem somos</button>
                        </div>
                    )}
                    {isAtivoNossoProposito == false ? (
                        <div id='quem-somos'>
                            <h1>Nosso Propósito</h1>
                            <button className="btn btn-success" onClick={handleisAtivarNossoProposito}>Ativar seção</button>
                            <label>Titulo</label>
                            <input className="adm-input" type="text" maxLength={15} value={tituloNossoProposito} onChange={handleTituloNossoProposito}></input>
                            <label>Texto</label>
                            <textarea style={{ backgroundColor: "white", color: "black" }} rows="3" cols="40" maxLength={663} value={textoNossoProposito} onChange={handleTextoNossoProposito}></textarea>
                            <label>Dilema</label>
                            <input className="adm-input" type="text" maxLength={12} placeholder="Parte dilema 1" value={dilema1} onChange={handleDilema1}></input>
                            <input className="adm-input" type="text" maxLength={10} placeholder="Parte dilema 2" value={dilema2} onChange={handleDilema2}></input>
                            <input className="adm-input" type="text" maxLength={12} placeholder="Parte dilema 3" value={dilema3} onChange={handleDilema3}></input>
                            <input className="adm-input" type="text" maxLength={17} placeholder="Parte dilema 4" value={dilema4} onChange={handleDilema4}></input>
                        </div>
                    ) : (
                        <div id='quem-somos'>
                            <h1>Nosso Proposito</h1>
                            <button className="btn btn-danger" onClick={handleisDesativarNossoProposito}>Desativar seção</button>
                            <label>Titulo</label>
                            <input className="adm-input" type="text" maxLength={15} value={tituloNossoProposito} onChange={handleTituloNossoProposito}></input>
                            <label>Texto</label>
                            <textarea className="adm-input" style={{ backgroundColor: "white", color: "black" }} rows="3" cols="40" maxLength={663} value={textoNossoProposito} onChange={handleTextoNossoProposito}></textarea>
                            <label>Dilema</label>
                            <input className="adm-input" type="text" maxLength={12} placeholder="Parte dilema 1" value={dilema1} onChange={handleDilema1}></input>
                            <input className="adm-input" type="text" maxLength={10} placeholder="Parte dilema 2" value={dilema2} onChange={handleDilema2}></input>
                            <input className="adm-input" type="text" maxLength={12} placeholder="Parte dilema 3" value={dilema3} onChange={handleDilema3}></input>
                            <input className="adm-input" type="text" maxLength={17} placeholder="Parte dilema 4" value={dilema4} onChange={handleDilema4}></input>
                            <button className="btn btn-success" onClick={handleAtualizarNossoProposito} type="button" style={{ width: '20%', marginTop: '4%' }}>Atualizar nosso propósito</button>
                        </div>
                    )}
                    <div id='quem-somos'>
                        {isAtivoNossaHistoria == false ? (
                            <div id='quem-somos'>
                                <h1>Nossa Historia</h1>
                                <button className="btn btn-success" onClick={handleisAtivarNossaHistoria}>Ativar seção</button>
                                <label>Titulo</label>
                                <input className="adm-input" type="text" maxLength={14} value={tituloNossaHistoria} onChange={handleTituloNossaHistoria}></input>
                                <label>Texto</label>
                                <input className="adm-input" type="text" value={textoNossaHistoria} onChange={handleTextoNossaHistoria}></input>
                            </div>
                        ) : (
                            <div id='quem-somos'>
                                <h1>Nossa Historia</h1>
                                <button className="btn btn-danger" onClick={handleisDesativarNossaHistoria}>Desativar seção</button>
                                <label>Titulo</label>
                                <input className="adm-input" type="text" maxLength={14} value={tituloNossaHistoria} onChange={handleTituloNossaHistoria}></input>
                                <label>Texto</label>
                                <input className="adm-input" type="text" value={textoNossaHistoria} onChange={handleTextoNossaHistoria}></input>
                                <button className="btn btn-success" onClick={handleAtualizarNossaHistoria} type="button" style={{ width: '20%', marginTop: '4%' }}>Atualizar</button>
                            </div>
                        )}
                        {Image1Text ? (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem selecionda! Deseja selecionar outra imagem?</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick1} color="#fff" size={40} />
                                <img className="adm-input-img" src="" alt='Clique em carregar para atualizar' />
                                <input ref={fileInputRefImage1} type="file" accept="image/*" multiple onChange={handleImage1NossaHistoria} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: xxxxxx</b></span>
                                <button className='btn btn-success' onClick={handleFormImage1} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                            </div>
                        ) : (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem 1</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick1} color="#fff" size={40} />
                                <img className="adm-input-img" src={image1valor == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${image1valor}`} />
                                <input ref={fileInputRefImage1} type="file" accept="image/*" multiple onChange={handleImage1NossaHistoria} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: xxxxx</b></span>
                                <button className='btn btn-success' onClick={handleFormImage1} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                            </div>
                        )}
                        {Image2Text ? (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem selecionda! Deseja selecionar outra imagem?</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick2} color="#fff" size={40} />
                                <img className="adm-input-img" src="" alt='Clique em carregar para atualizar' />
                                <input ref={fileInputRefImage2} type="file" accept="image/*" multiple onChange={handleImage2NossaHistoria} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: xxxxxx</b></span>
                                <button className='btn btn-success' onClick={handleFormImage2} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                            </div>
                        ) : (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem 2</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick2} color="#fff" size={40} />
                                <img className="adm-input-img" src={image2valor == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${image2valor}`} />
                                <input ref={fileInputRefImage2} type="file" accept="image/*" multiple onChange={handleImage2NossaHistoria} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: xxxxx</b></span>
                                <button className='btn btn-success' onClick={handleFormImage2} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                            </div>
                        )}
                        {Image3Text ? (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem selecionda! Deseja selecionar outra imagem?</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick3} color="#fff" size={40} />
                                <img className="adm-input-img" src="" alt='Clique em carregar para atualizar' />
                                <input ref={fileInputRefImage3} type="file" accept="image/*" multiple onChange={handleImage3NossaHistoria} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: xxxxxx</b></span>
                                <button className='btn btn-success' onClick={handleFormImage3} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                            </div>
                        ) : (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem 3</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick3} color="#fff" size={40} />
                                <img className="adm-input-img" src={image3valor == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${image3valor}`} />
                                <input ref={fileInputRefImage3} type="file" accept="image/*" multiple onChange={handleImage3NossaHistoria} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: xxxxx</b></span>
                                <button className='btn btn-success' onClick={handleFormImage3} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                            </div>
                        )}
                        {Image4Text ? (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem selecionda! Deseja selecionar outra imagem?</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick4} color="#fff" size={40} />
                                <img className="adm-input-img" src="" alt='Clique em carregar para atualizar' />
                                <input ref={fileInputRefImage4} type="file" accept="image/*" multiple onChange={handleImage4NossaHistoria} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: xxxxxx</b></span>
                                <button className='btn btn-success' onClick={handleFormImage4} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                            </div>
                        ) : (
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Imagem 4</label>
                                <FiUpload className="adm-input-svg" onClick={handleImageClick4} color="#fff" size={40} />
                                <img className="adm-input-img" src={image4valor == null ? avatar : `https://api.varsolutions.com.br/images/telaInicio/${image4valor}`} />
                                <input ref={fileInputRefImage4} type="file" accept="image/*" multiple onChange={handleImage4NossaHistoria} style={{ display: 'none' }} />
                                <span><b>Tamanho recomendado: xxxxx</b></span>
                                <button className='btn btn-success' onClick={handleFormImage4} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar foto</button>
                            </div>
                        )}
                    </div>
                </div>
                <div id='quem-somos'>
                    <h1>Casos de suscesso</h1>
                    <label>Titulo</label>
                    <input type="text" value={tituloCasesDeSucesso} onChange={handleTituloCasesDeSucesso}></input>
                    <div className="box-cases">
                        <div>
                            {foto1Text == false ?
                                (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick1} color="#fff" size={40} />
                                        <img className='imgperfil' src={foto1Valor == null ? avatar : `https://api.varsolutions.com.br/images/CasesSucesso/${foto1Valor}`} />
                                        <input ref={fileInputRefFoto1} type="file" accept="image/*" multiple onChange={handleFoto1} style={{ display: 'none' }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick1} color="#fff" size={40} />
                                        <img className='imgperfil' src="" alt="Imagem selecionda!" />
                                        <input ref={fileInputRefFoto1} type="file" accept="image/*" multiple onChange={handleFoto1} style={{ display: 'none' }} />
                                    </div>
                                )}
                            <label>Nome</label>
                            <input className="adm-input" type="text" value={nome1} onChange={handleNome1}></input>
                            <lebel>Cargo</lebel>
                            <input className="adm-input" type="text" value={cargo1} onChange={handleCargo1}></input>
                            <label>Idade</label>
                            <input className="adm-input" type="number" value={idade1} onChange={handleIdade1}></input>
                            <label>Likedin</label>
                            <input className="adm-input" type="text" placeholder="Url Likedin" value={urlLinkedin1} onChange={handleLikedin1}></input>
                            <label>Texto</label>
                            <input className="adm-input" type="text" value={texto1} onChange={handleTexto1}></input>
                            <button className='btn btn-success' onClick={handleCaso1} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar</button>
                        </div>
                        <div>
                            {foto2Text == false ?
                                (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick2} color="#fff" size={40} />
                                        <img className='imgperfil' src={foto2Valor == null ? avatar : `https://api.varsolutions.com.br/images/CasesSucesso/${foto2Valor}`} />
                                        <input ref={fileInputRefFoto2} type="file" accept="image/*" multiple onChange={handleFoto2} style={{ display: 'none' }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick2} color="#fff" size={40} />
                                        <img className='imgperfil' src="" alt="Imagem selecionda!" />
                                        <input ref={fileInputRefFoto2} type="file" accept="image/*" multiple onChange={handleFoto2} style={{ display: 'none' }} />
                                    </div>
                                )}
                            <label>Nome</label>
                            <input className="adm-input" type="text" value={nome2} onChange={handleNome2}></input>
                            <lebel>Cargo</lebel>
                            <input className="adm-input" type="text" value={cargo2} onChange={handleCargo2}></input>
                            <label>Idade</label>
                            <input className="adm-input" type="number" value={idade2} onChange={handleIdade2}></input>
                            <label>Likedin</label>
                            <input className="adm-input" type="text" placeholder="Url Likedin" value={urlLinkedin2} onChange={handleLikedin2}></input>
                            <label>Texto</label>
                            <input className="adm-input" type="text" value={texto2} onChange={handleTexto2}></input>
                            <button className='btn btn-success' onClick={handleCaso2} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar</button>
                        </div>
                        <div>
                            {foto3Text == false ?
                                (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick3} color="#fff" size={40} />
                                        <img className='imgperfil' src={foto3Valor == null ? avatar : `https://api.varsolutions.com.br/images/CasesSucesso/${foto3Valor}`} />
                                        <input ref={fileInputRefFoto3} type="file" accept="image/*" multiple onChange={handleFoto3} style={{ display: 'none' }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick3} color="#fff" size={40} />
                                        <img className='imgperfil' src="" alt="Imagem selecionda!" />
                                        <input ref={fileInputRefFoto3} type="file" accept="image/*" multiple onChange={handleFoto3} style={{ display: 'none' }} />
                                    </div>
                                )}
                            <label>Nome</label>
                            <input className="adm-input" type="text" value={nome3} onChange={handleNome3}></input>
                            <lebel>Cargo</lebel>
                            <input className="adm-input" type="text" value={cargo3} onChange={handleCargo3}></input>
                            <label>Idade</label>
                            <input className="adm-input" type="number" value={idade3} onChange={handleIdade3}></input>
                            <label>Likedin</label>
                            <input className="adm-input" type="text" placeholder="Url Likedin" value={urlLinkedin3} onChange={handleLikedin3}></input>
                            <label>Texto</label>
                            <input className="adm-input" type="text" value={texto3} onChange={handleTexto3}></input>
                            <button className='btn btn-success' onClick={handleCaso3} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar</button>
                        </div>
                        <div>
                            {foto4Text == false ?
                                (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick4} color="#fff" size={40} />
                                        <img className='imgperfil' src={foto4Valor == null ? avatar : `https://api.varsolutions.com.br/images/CasesSucesso/${foto4Valor}`} />
                                        <input ref={fileInputRefFoto4} type="file" accept="image/*" multiple onChange={handleFoto4} style={{ display: 'none' }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick4} color="#fff" size={40} />
                                        <img className='imgperfil' src="" alt="Imagem selecionda!" />
                                        <input ref={fileInputRefFoto4} type="file" accept="image/*" multiple onChange={handleFoto4} style={{ display: 'none' }} />
                                    </div>
                                )}
                            <label>Nome</label>
                            <input className="adm-input" type="text" value={nome4} onChange={handleNome4}></input>
                            <lebel>Cargo</lebel>
                            <input className="adm-input" type="text" value={cargo4} onChange={handleCargo4}></input>
                            <label>Idade</label>
                            <input className="adm-input" type="number" value={idade4} onChange={handleIdade4}></input>
                            <label>Likedin</label>
                            <input className="adm-input" type="text" placeholder="Url Likedin" value={urlLinkedin4} onChange={handleLikedin4}></input>
                            <label>Texto</label>
                            <input className="adm-input" type="text" value={texto4} onChange={handleTexto4}></input>
                            <button className='btn btn-success' onClick={handleCaso4} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar</button>
                        </div>
                        <div>
                            {foto5Text == false ?
                                (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick5} color="#fff" size={40} />
                                        <img className='imgperfil' src={foto5Valor == null ? avatar : `https://api.varsolutions.com.br/images/CasesSucesso/${foto5Valor}`} />
                                        <input ref={fileInputRefFoto5} type="file" accept="image/*" multiple onChange={handleFoto5} style={{ display: 'none' }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick5} color="#fff" size={40} />
                                        <img className='imgperfil' src="" alt="Imagem selecionda!" />
                                        <input ref={fileInputRefFoto5} type="file" accept="image/*" multiple onChange={handleFoto5} style={{ display: 'none' }} />
                                    </div>
                                )}
                            <label>Nome</label>
                            <input className="adm-input" type="text" value={nome5} onChange={handleNome5}></input>
                            <lebel>Cargo</lebel>
                            <input className="adm-input" type="text" value={cargo5} onChange={handleCargo5}></input>
                            <label>Idade</label>
                            <input className="adm-input" type="number" value={idade5} onChange={handleIdade5}></input>
                            <label>Likedin</label>
                            <input className="adm-input" type="text" placeholder="Url Likedin" value={urlLinkedin5} onChange={handleLikedin5}></input>
                            <label>Texto</label>
                            <input className="adm-input" type="text" value={texto5} onChange={handleTexto5}></input>
                            <button className='btn btn-success' onClick={handleCaso5} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar</button>
                        </div>
                        <div>
                            {foto6Text == false ?
                                (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick6} color="#fff" size={40} />
                                        <img className='imgperfil' src={foto6Valor == null ? avatar : `https://api.varsolutions.com.br/images/CasesSucesso/${foto6Valor}`} />
                                        <input ref={fileInputRefFoto6} type="file" accept="image/*" multiple onChange={handleFoto6} style={{ display: 'none' }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick6} color="#fff" size={40} />
                                        <img className='imgperfil' src="" alt="Imagem selecionda!" />
                                        <input ref={fileInputRefFoto6} type="file" accept="image/*" multiple onChange={handleFoto6} style={{ display: 'none' }} />
                                    </div>
                                )}
                            <label>Nome</label>
                            <input className="adm-input" type="text" value={nome6} onChange={handleNome6}></input>
                            <lebel>Cargo</lebel>
                            <input className="adm-input" type="text" value={cargo6} onChange={handleCargo6}></input>
                            <label>Idade</label>
                            <input className="adm-input" type="number" value={idade6} onChange={handleIdade6}></input>
                            <label>Likedin</label>
                            <input className="adm-input" type="text" placeholder="Url Likedin" value={urlLinkedin6} onChange={handleLikedin6}></input>
                            <label>Texto</label>
                            <input className="adm-input" type="text" value={texto6} onChange={handleTexto6}></input>
                            <button className='btn btn-success' onClick={handleCaso6} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar</button>
                        </div>
                        <div>
                            {foto7Text == false ?
                                (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick7} color="#fff" size={40} />
                                        <img className='imgperfil' src={foto7Valor == null ? avatar : `https://api.varsolutions.com.br/images/CasesSucesso/${foto7Valor}`} />
                                        <input ref={fileInputRefFoto7} type="file" accept="image/*" multiple onChange={handleFoto7} style={{ display: 'none' }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick7} color="#fff" size={40} />
                                        <img className='imgperfil' src="" alt="Imagem selecionda!" />
                                        <input ref={fileInputRefFoto7} type="file" accept="image/*" multiple onChange={handleFoto7} style={{ display: 'none' }} />
                                    </div>
                                )}
                            <label>Nome</label>
                            <input className="adm-input" type="text" value={nome7} onChange={handleNome7}></input>
                            <lebel>Cargo</lebel>
                            <input className="adm-input" type="text" value={cargo7} onChange={handleCargo7}></input>
                            <label>Idade</label>
                            <input className="adm-input" type="number" value={idade7} onChange={handleIdade7}></input>
                            <label>Likedin</label>
                            <input className="adm-input" type="text" placeholder="Url Likedin" value={urlLinkedin7} onChange={handleLikedin7}></input>
                            <label>Texto</label>
                            <input className="adm-input" type="text" value={texto7} onChange={handleTexto7}></input>
                            <button className='btn btn-success' onClick={handleCaso7} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar</button>
                        </div>
                        <div>
                            {foto8Text == false ?
                                (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick8} color="#fff" size={40} />
                                        <img className='imgperfil' src={foto8Valor == null ? avatar : `https://api.varsolutions.com.br/images/CasesSucesso/${foto8Valor}`} />
                                        <input ref={fileInputRefFoto8} type="file" accept="image/*" multiple onChange={handleFoto8} style={{ display: 'none' }} />
                                    </div>
                                ) : (
                                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FiUpload className="adm-input-svg" onClick={handleFotoClick8} color="#fff" size={40} />
                                        <img className='imgperfil' src="" alt="Imagem selecionda!" />
                                        <input ref={fileInputRefFoto8} type="file" accept="image/*" multiple onChange={handleFoto8} style={{ display: 'none' }} />
                                    </div>
                                )}
                            <label>Nome</label>
                            <input className="adm-input" type="text" value={nome8} onChange={handleNome8}></input>
                            <lebel>Cargo</lebel>
                            <input className="adm-input" type="text" value={cargo8} onChange={handleCargo8}></input>
                            <label>Idade</label>
                            <input className="adm-input" type="number" value={idade8} onChange={handleIdade8}></input>
                            <label>Likedin</label>
                            <input className="adm-input" type="text" placeholder="Url Likedin" value={urlLinkedin8} onChange={handleLikedin8}></input>
                            <label>Texto</label>
                            <input className="adm-input" type="text" value={texto8} onChange={handleTexto8}></input>
                            <button className='btn btn-success' onClick={handleCaso8} type="button" style={{ width: '20%', marginTop: '4%' }}>Carregar</button>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    )
}