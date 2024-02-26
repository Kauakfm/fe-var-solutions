import React from 'react';
import '../../../paginas/PagamentoOnlineAnual/pagamentoonline.css';
import '../../../paginas/CursoOnline/cursoonline.css';
import { FaClipboardUser } from 'react-icons/fa6';
import seloPag from '../../../imagens/seloPagarX.png'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import {FaPix} from 'react-icons/fa6';

export default function ComponentePix() {
    return (
        <div>
            <div style={{paddingTop: '0'}} className='body-pagamento-online'>
                <div className='conteudo-pagamento'>
                    <section>
                        <div className='row formulario-pagamento'>
                            <section>
                                <h5><FaPix />Pagamento PIX</h5>
                            </section>
                            <div className='col-md-6'>
                                <label>CPF</label>
                                <input type="text" placeholder="CPF" />
                            </div>
                            <div className='col-md-6'>
                                <label>Telefone</label>
                                <input type="tel" placeholder="(**) *****-****" maxLength={14} />
                            </div>
                            <div className='col-md-6'>
                                <label>CEP</label>
                                <input type="text" placeholder="CEP" maxLength={9} />
                            </div>
                            <div className='col-md-6'>
                                <label>Nº residencial</label>
                                <input type="text" placeholder="Nº residencial" maxLength={9} />
                            </div>
                            <section className='section2'>
                                <h5><FaClipboardUser />Crie seu usuário</h5>
                            </section>
                            <div className='col-md-12'>
                                <label>E-mail</label>
                                <input type="email" placeholder='Digite seu e-mail' />
                            </div>
                            <div className='col-md-6'>
                                <label>Senha</label>
                                <input type="password" placeholder="Digite sua senha" />
                            </div>
                            <div className='col-md-6'>
                                <label>Confirme a Senha</label>
                                <input type="password" placeholder="Confirme sua senha" />
                            </div>
                        </div>
                    </section>
                    <section className='section-detalhes'>
                        <h5>Detalhes da compra:</h5>
                        <p style={{ display: 'block', marginBottom: '2vh' }}>Curso: <span>Desenvolvimento de Software em C# e Java.</span></p>
                        <p style={{ display: 'block', marginBottom: '2vh' }}>Forma de pagamento: <span>Pix</span></p>
                        <p>Preço: <span className='alinhamento-preco'>R$ 70,00</span></p>
                        <img src={seloPag} style={{ width: "65%", marginTop: "5%" }} />
                        <p className='total-diviser'></p>
                        <p className='total'>Total:
                            <span>
                                R$ 70,00
                            </span>
                        </p>
                        <div>
                            <label><input type='checkbox' />Ao marcar esta opção, você está concordando com estes <a href='https://instituto.varsolutions.com.br/termos/mensal' target="_blank" rel="noreferrer">Termos de Serviço</a>.</label>
                        </div>
                        <Link to={`/planos/online/mensal/pagamento/finalizar`}><button className='botao-azul'>Finalizar compra</button></Link>
                    </section>
                </div>
            </div>
        </div>
    )
}