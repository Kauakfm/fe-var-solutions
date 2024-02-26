import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from 'react-icons/fa';
import { GoAlertFill } from 'react-icons/go'
import axios from 'axios';
import ModalSuporte from '../../componentes/ModalSuporte';
import api from '../../services/api';
import './homealuno.css';
import HeaderAluno from '../../componentes/HeaderAluno';
import Carossel from '../../componentes/CarosselHome';
import ComponenteAtivo from '../../componentes/ComponenteAtivo';
import alarm from '../../imagens/alarm.png';
import alert from '../../imagens/icon/alert.png';
import { isDate } from 'date-fns';
import ModalPesquisaSatisfacao from '../../componentes/ModalPesquisaSatisfacao';

export default function HomeAluno() {
  const [loading, setloading] = useState(true);
  const ref = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [content, setContent] = useState([]);



  const ultimoAcesso = window.localStorage.getItem("usr_ultimoAcesso");
  const dataFormatada = ultimoAcesso ? new Date(ultimoAcesso).toLocaleDateString() : '';
  const diasAtraso = Math.abs(parseInt(window.localStorage.getItem("usr_diasAtraso"), 10));
  const parcelasAtraso = window.localStorage.getItem("usr_parcelasAtraso");
  const statusPagamento = window.localStorage.getItem("usr_pagamentoEmDia");
  const pagamentoEmDia = statusPagamento === "true" ? "em dia" : "";

  const dataRecorrente = window.localStorage.getItem("usr_dataRecorrente");
  const dataPresencial = new Date(window.localStorage.getItem("usr_dataPresencial"));
  const diaAtual = new Date();

  const nomeCompleto = (window.localStorage.getItem("usr_nome") || '').split(" ");
  const primeirosNomes = nomeCompleto.slice(0, 2).join(" ");

  const navigate = useNavigate();
  const status = window.localStorage.getItem('usr_status');
  // const niveisacesso = status === 1 ? ["active", "active", "active", ""]
  //    : status === 3 ? ["active", "", "active", ""]
  //    : status === 4 ? ["active", "", "active", "active"]
  //    : status === 5 ? ["active", "active", "active", ""]
  //    : ["", "", "", ""];

  const handlePresenca = async () => {
    try {
      const responselocal = await axios.get("https://servervar/Presenca");

      if (responselocal.status === 200) {
        await api.get("Autenticacao/Presenca").then((response) => {
          if (response.data.mensagem != null)
            ref.current.click();
        });
      }
    } catch (error) { }
  };

  const handleawait = () => {
    setTimeout(function () {
      setloading(false);
    }, 1000);
  };

  useEffect(() => {
    if (window.localStorage.getItem('usr_token') == null)
      navigate("/");
    if (window.localStorage.getItem('usr_id') == null)
      navigate("/");
    if (window.localStorage.getItem('usr_status') == null)
      navigate("/");
    if (window.localStorage.getItem('usr_nome') == null)
      navigate("/");

    api.get("Autenticacao");
    handleGetContent();
    handlePresenca();
    handleawait();
  }, []);

  const handleGetContent = async () => {
    await api.get("Estilizacao/ObterHomeAluno").then((response) => {
      setContent(response.data)
    })
  }

  useEffect(() => {
    api.get('Home/ObterAvisos')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const pAviso = response.data[0];
          if (pAviso && pAviso.url) {
            setVideoUrl(pAviso.url);
          }
        }
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
      });
  }, []);

  const Handlealert = () => {
    const cancelamento = diasAtraso - 10;

    if ((dataRecorrente !== 'null') || (dataPresencial.toString() !== "Invalid Date")) {
      if (parcelasAtraso >= 1 && diasAtraso >= 20) {
        return (
          <p className='alerta-cancelamento alerta-pagamento'>Seu pagamento está {diasAtraso} {diasAtraso > 1 ? 'dias' : 'dia'} atrasado com {parcelasAtraso} {parcelasAtraso > 1 ? 'parcelas' : 'parcela'} pendente{parcelasAtraso > 1 ? 's' : ''}. <br /> Você tem apenas {cancelamento} {cancelamento > 1 ? 'dias' : 'dia'} de acesso em nossa plataforma!</p>
        )
      }
      else if (statusPagamento === "false") {
        return (
          <p className='alerta-atraso alerta-pagamento'>Seu pagamento está {diasAtraso} {diasAtraso > 1 ? 'dias' : 'dia'} atrasado com {parcelasAtraso} {parcelasAtraso > 1 ? 'parcelas' : 'parcela'} pendente{parcelasAtraso > 1 ? 's' : ''}!<img className='alert-icon' src={alert} /></p>
        )
      }
      else if ((dataPresencial.getDate() === diaAtual.getDate() && dataPresencial.getMonth() === diaAtual.getMonth() && dataPresencial.getFullYear() === diaAtual.getFullYear())) {
        return (
          <p className='alerta-pagamento'>Hoje é o dia do pagamento do seu curso.</p>
        )
      }
      else if (statusPagamento === "true") {
        return (
          <p className='alerta-pagamento'>Seu pagamento está {pagamentoEmDia}! Mantenha esse hábito e evite atrasos.</p>
        )
      }
    }
  }

  return (
    <div>
      <HeaderAluno espera={true} />

      <div className="body-home-aluno">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15%' }}>
            <div style={{ width: '3rem', height: '3rem' }} className="text-light spinner-border-sm spinner-border" role="status"></div>
          </div>
        ) : (
          <>
            {/* <Carossel /> */}

            {/* <Handlealert /> */}

            <div>
              {videoUrl == null || videoUrl === '' ? (
                <></>
              ) : (
                <iframe className='video-aviso' src={videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen={true}></iframe>
              )}
            </div>

            <div className="info-home">
              <p>Olá, {primeirosNomes}</p>
              <p>Seu último acesso foi dia <span>{dataFormatada}</span></p>
            </div>

            {status === "1" || status === "5" ? <ComponenteAtivo /> : ""}


            <div className="home-section1">
              <div className="box-da-trilha box-csharp">
                <h2>{content.find(x => x.tipo === "Titulo Card 1") ? content.find(x => x.tipo === "Titulo Card 1").valor : ""}</h2>
                <p>{content.find(x => x.tipo === "Body Card 1") ? content.find(x => x.tipo === "Body Card 1").valor : ""}</p>
                {status === "1" || status === "5" ? <Link to={content.find(x => x.tipo === "Button Link Card 1") ? content.find(x => x.tipo === "Button Link Card 1").valor : ""}><button className="botao-azul">{content.find(x => x.tipo === "Button Card 1") ? content.find(x => x.tipo === "Button Card 1").valor : ""}</button></Link> : ""}
              </div>

              <div className="box-da-trilha box-java">
                <h2>{content.find(x => x.tipo === "Titulo Card 2") ? content.find(x => x.tipo === "Titulo Card 2").valor : ""}</h2>
                <p>{content.find(x => x.tipo === "Body Card 2") ? content.find(x => x.tipo === "Body Card 2").valor : ""}</p>
                {status === "1" || status === "5" ? <Link to={content.find(x => x.tipo === "Button Link Card 2") ? content.find(x => x.tipo === "Button Link Card 2").valor : ""}><button className="botao-azul">{content.find(x => x.tipo === "Button Card 2") ? content.find(x => x.tipo === "Button Card 2").valor : ""}</button></Link> : ""}
              </div>
            </div>

            <div className="home-section2">
              <div className="box-do-add box-linkedin">
                <h2>Minhas experiências</h2>
                <a href="https://www.linkedin.com/in/" target='_blank' rel="noreferrer">
                  <button className="botao-branco"><IoLogoLinkedin />Linkedin</button>
                </a>
              </div>

              <div className="box-do-add box-perfil">
                <h2>Projetos Realizados</h2>
                <a href="https://github.com/" target='_blank' rel="noreferrer">
                  <button className="botao-branco"><FaGithub />Github</button>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      <ModalSuporte />
      <ModalPesquisaSatisfacao />

      <div className='modal-atraso'>
        <button hidden type="button" ref={ref} className='botao-inscricao' data-bs-toggle="modal" data-bs-target="#exampleModalAtraso">modal</button>

        <div className="modal fade" id="exampleModalAtraso" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-body">
              <img src={alarm} alt="alarm" />
              <p>Olá {window.localStorage.getItem("usr_nome")}, <br /> detectamos que você acessou nossa plataforma com um pequeno <strong>atraso</strong>!</p>
              <p>Gostaríamos de ressaltar a <strong>importância da pontualidade</strong> em todas as sessões de aula para que você possa aproveitar ao máximo sua experiência de aprendizado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


