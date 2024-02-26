import React, { useRef, useState } from 'react';
import '../../paginas/Login/login.css';
import logo from '../../imagens/var/logo-circulo.png';
import { MdEmail } from 'react-icons/md';
import api from "../../services/api"

export default function ComponenteRedefinirSenha() {
    const [email, setEmail] = useState();
    const ref = useRef(null);
    const url = 'Cadastro/EnviarEmailDeRedefinirSenha/'
    
    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRecuperar = async () => {    
        await api.post(url, { email: email }).then((response) => {
            //console.log(response)
            if (response.status === 204) {
                ref.current.click();
            }
            else {
                throw new Error('Erro de solicitação: ' + response);
            }
        })
    }   
    const handleVoltar = () => {
        window.location.href = '/login';
    };

    return (
        <div className="componente-redefinir-senha container-login">
            <img className="logo-var-circulo" src={logo} alt="Logo Circulo" />
            <p style={{ fontWeight: '600' }}>Recuperar senha</p>
            <p className='p-redefinir'>Digite seu e-mail que enviaremos um link para definir uma nova senha.</p>
            <div>
                <label>E-mail:</label>
                <div className="container-input">
                    <MdEmail />
                    <input type="email" placeholder="Digite seu e-mail" onChange={handleChange}/>
                </div>
                <span onClick={handleVoltar}>Voltar.</span>
                <div className='botoes-login'>
                    <button className="botao-azul" onClick={handleRecuperar}>Recuperar</button>
                </div>
            </div>

            <div className='modal-redefinir-senha'>
                <button hidden ref={ref} type="button" class="botao-azul botao-cadastro" data-bs-toggle="modal" data-bs-target="#exampleModal">Cadastrar</button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h6>E-mail de redefinição de senha enviado!</h6>
                                <p>Em breve, você vai receber um e-mail para redefinir sua senha. Se não conseguir encontrar o e-mail, lembre-se de procurar na pasta de spam ou lixo eletrônico.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
