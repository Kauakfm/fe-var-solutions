import React, { useEffect, useState } from "react";
import '../../Administrativo/AdicionarTrilha/adicionartrilha.css';
import HeaderAluno from "../../../componentes/HeaderAluno";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function EstilizarHomeAluno() {
    const [titleCard1, setTitleCard1] = useState('');
    const [titleCard2, setTitleCard2] = useState('');
    const [bodyCard1, setBodyCard1] = useState('');
    const [bodyCard2, setBodyCard2] = useState('');
    const [buttonCard1, setButtonCard1] = useState('');
    const [buttonCard2, setButtonCard2] = useState('');
    const [buttonLinkCard1, setButtonLinkCard1] = useState('');
    const [buttonLinkCard2, setButtonLinkCard2] = useState('');

    const handleGetCards = async () => {
        await api.get("Estilizacao/ObterHomeAluno").then((response) => {
            const responseData = response.data;
            setTitleCard1(responseData.find(x => x.tipo === "Titulo Card 1").valor);
            setTitleCard2(responseData.find(x => x.tipo === "Titulo Card 2").valor);
            setBodyCard1(responseData.find(x => x.tipo === "Body Card 1").valor);
            setBodyCard2(responseData.find(x => x.tipo === "Body Card 2").valor);
            setButtonCard1(responseData.find(x => x.tipo === "Button Card 1").valor);
            setButtonCard2(responseData.find(x => x.tipo === "Button Card 2").valor);
            setButtonLinkCard1(responseData.find(x => x.tipo === "Button Link Card 1").valor);
            setButtonLinkCard2(responseData.find(x => x.tipo === "Button Link Card 2").valor);
        })
    }

    const handlePostCard = async () => {

        api.put("Estilizacao/AtualizarHomeAluno", {
            TitleCard1: titleCard1,
            TitleCard2: titleCard2,
            BodyCard1: bodyCard1,
            BodyCard2: bodyCard2,
            ButtonCard1: buttonCard1,
            ButtonCard2: buttonCard2,
            ButtonLinkCard1: buttonLinkCard1,
            ButtonLinkCard2: buttonLinkCard2
        }).then((response) => {
            try {
                if (response.status == 204) {
                    toast.success("Atualizado com sucesso!");
                }
            }
            catch (error) {
                toast.error("Algo deu errado.");
            }
        });
    }

    useEffect(() => {
        handleGetCards();
    }, [])

    return (
        <>
            <HeaderAluno />
            <div className="body-form-curso">

                <form className="row" onSubmit={(e) => {
                    e.preventDefault();
                    handlePostCard();
                }}
                    style={{ maxWidth: "80%" }}>

                    <div className="col-md-6">
                        <label>Título do Card 1:</label>
                        <div className='presencial-input'>
                            <input type="text" onChange={(e) => { setTitleCard1(e.target.value) }} value={titleCard1} />
                        </div>
                        <label>Texto do Card 1:</label>

                        <textarea style={{ color: "black" }} onChange={(e) => { setBodyCard1(e.target.value) }} value={bodyCard1}>

                        </textarea>
                        <label>Botão do Card 1:</label>
                        <div className='presencial-input'>
                            <input type="text" onChange={(e) => { setButtonCard1(e.target.value) }} value={buttonCard1} />
                        </div>
                        <label>Link do Botão do Card 1:</label>
                        <div className='presencial-input'>
                            <input type="text" onChange={(e) => { setButtonLinkCard1(e.target.value) }} value={buttonLinkCard1} />
                        </div>

                    </div>
                    <div className="col-md-6">
                        <label>Título do Card 2:</label>
                        <div className='presencial-input'>
                            <input type="text" onChange={(e) => { setTitleCard2(e.target.value) }} value={titleCard2} />

                        </div>
                        <label>Texto do Card 2:</label>
                        <textarea style={{ color: "black" }} onChange={(e) => { setBodyCard2(e.target.value) }} value={bodyCard2}>

                        </textarea>
                        <label>Botão do Card 2:</label>
                        <div className='presencial-input'>
                            <input type="text" onChange={(e) => { setButtonCard2(e.target.value) }} value={buttonCard2} />
                        </div>
                        <label>Link do Botão do Card 2:</label>
                        <div className='presencial-input'>
                            <input type="text" onChange={(e) => { setButtonLinkCard2(e.target.value) }} value={buttonLinkCard2} />
                        </div>

                    </div>
                    <div className="row">
                        <button className="btn btn-success" type="submit">Enviar</button>
                    </div>
                </form >
            </div >

        </>
    )
}