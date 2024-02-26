import React from 'react';
import '../Cadastro/cadastro.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../imagens/var/logo3.png';

export default function CadastroConfirmacao() {
  const { id } = useParams()
  const navigate = useNavigate();
  const url = "Cadastro/ValidarEmail/"


  const handleValidarEmail = async () => {
    await api.get(url + id).then((response) => {

      if (response.status === 200) {
        api.defaults.headers.authorization = `Bearer ${response.data.token}`;
        window.localStorage.setItem('usr_token', response.data.token);
        window.localStorage.setItem('usr_id', response.data.usuarioid);
        window.localStorage.setItem('usr_status', response.data.status);
        window.localStorage.setItem('usr_nome', response.data.nome);
        const foto = response.data.urlFoto == null ? "avatar.png" : response.data.urlFoto 
        window.localStorage.setItem('usr_foto', "https://api.varsolutions.com.br/images/image_Aluno/" + foto );
        navigate("/home")
      }
    }
    )
  }
  return (
    <div className="body-confirmacao">
      <div>
        <img src={logo}/>
        <h1>Confirmação de E-mail</h1>
        <p>Por favor, clique no botão abaixo para confirmar seu e-mail:</p>
        <button onClick={handleValidarEmail}>Confirmar E-mail</button>
      </div>
    </div>
  );
}
