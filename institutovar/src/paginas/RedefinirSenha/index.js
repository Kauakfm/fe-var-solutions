import React, { useState } from 'react';
import '../Login/login.css';
import { useParams , useNavigate} from 'react-router-dom';
import { MdLock } from 'react-icons/md';
import api from '../../services/api';
import logo from '../../imagens/var/logo3.png';

export default function RedefinirSenha() {
    const [senha, setSenha] = useState();
    const [senha2, setSenha2] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const url = 'Cadastro/EsqueciSenha/'

    const handleChange = (event) => {
        setSenha(event.target.value);
    };

    const handleChange2 = (event) => {
        setSenha2(event.target.value);
    };

    const handleRedefinirSenha = async () => {
        if (senha !== senha2)
            return;

        await api.post(url + id, { senha: senha }).then((response) => {
            if (response.status === 204) {
                navigate("/login")
            }
            else {
                throw new Error('Erro de solicitação: ' + response);
            }
        })
    }
    return (
        <div className='body-redefinir-senha'>
            <div className='box-redefinir-senha'>
                <img src={logo}/>
                <h1>Nova senha</h1>
                <section>
                    <label>Senha:</label>
                    <div className="container-input">
                        <MdLock />
                        <input type="password" placeholder="Digite sua senha" onChange={handleChange} />
                    </div>
                    <label>Confirmar a senha:</label>
                    <div className="container-input">
                        <MdLock />
                        <input type="password" placeholder="Confirme sua senha" onChange={handleChange2} />
                    </div>
                </section>
                <button onClick={handleRedefinirSenha}>Criar nova senha</button>
            </div>
        </div>
    )
}