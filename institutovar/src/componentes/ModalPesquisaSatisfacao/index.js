import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import './modalpesquisasatisfacao.css';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalPesquisaSatisfacao() {
  const ref = useRef(null);
  const [perguntas, setPerguntas] = useState([]);
  const [avaliacao, setAvaliacao] = useState(0);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [botaoHabilitado, setBotaoHabilitado] = useState(false);

  const obterPerguntas = async () => {
    try {
      const response = await api.get('Home/obterPerguntas');
      const responseData = response.data;
      const respondeu = window.localStorage.getItem("0723");
      if (response.data.length > 0 && !respondeu) {
        ref.current.click();
        window.localStorage.setItem("0723", 3);
      }    
      setPerguntas(responseData)
    } catch (error) {

    }
  }

  useEffect(() => {
    obterPerguntas();
  }, []);

  useEffect(() => {
    if (avaliacao > 0) {
      setBotaoHabilitado(true);
    } else {
      setBotaoHabilitado(false);
    }
  }, [avaliacao]);

  const registrarAvaliacao = () => {
    const pergunta = perguntas[perguntaAtual]?.codigo;
    const avaliacaoRegistro = { perguntaCodigo: pergunta, resposta: avaliacao };

    api.post("Home/MarcarPerguntas", avaliacaoRegistro).then((response) => {
      try {
        if (response.status != 204)
          toast.error("Erro ao enviar a pergunta. Por favor, contate o suporte.")
      }
      catch (error) {
        toast.error("Erro ao enviar a pergunta. Por favor, contate o suporte.")
      }
    })


    proximaPergunta();
  }

  const finalizarPesquisa = () => {
    const pergunta = perguntas[perguntaAtual]?.codigo;
    const avaliacaoRegistro = { perguntaCodigo: pergunta, resposta: avaliacao };

    api.post("Home/MarcarPerguntas", avaliacaoRegistro).then((response) => {
      try {
        if (response.status != 204)
          toast.error("Erro ao enviar a pergunta. Por favor, contate o suporte.")
      }
      catch (error) {
        toast.error("Erro ao enviar a pergunta. Por favor, contate o suporte.")
      }
    })

    toast.success('Seu formulário foi enviado com sucesso! Agradecemos pela sua participação.');
  }

  const proximaPergunta = () => {    
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setAvaliacao(0);
    } else {
      finalizarPesquisa();
    }
  }

  return (
    <>
      <button hidden={true} ref={ref} className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Open first modal</button>

      <div className="modal-perguntas modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <p>Pergunta {perguntaAtual + 1}/{perguntas.length}</p>
            </div>
            <div className="modal-body">
              <p>{perguntas[perguntaAtual]?.pergunta}</p>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value}>
                    <input type="radio" name="avaliacao" value={value} checked={avaliacao === value} onChange={() => setAvaliacao(value)} style={{ display: 'none' }} />
                    {avaliacao >= value ? (
                      <BsStarFill className="star filled" onClick={() => setAvaliacao(value)} />
                    ) : (
                      <BsStar className="star" onClick={() => setAvaliacao(value)} />
                    )}
                  </label>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              {perguntaAtual < perguntas.length- 1 ? (
                <button onClick={registrarAvaliacao} className="btn btn-primary" disabled={!botaoHabilitado}>Próxima</button>
              ) : (
                <button onClick={finalizarPesquisa} data-bs-dismiss="modal" aria-label="Close" className="btn btn-primary">Enviar</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
