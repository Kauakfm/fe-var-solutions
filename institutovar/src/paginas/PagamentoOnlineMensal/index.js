import React, { useState } from 'react';
import HeaderPrincipal from '../../componentes/HeaderPrincipal';
import '../PagamentoOnlineAnual/pagamentoonline.css';
import '../CursoOnline/cursoonline.css';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ComponenteCartao from '../../componentes/PagamentosOnlineMensal/ComponenteCartao';
import ComponentePix from '../../componentes/PagamentosOnlineMensal/ComponentePix';

export default function PagamentoOnlineMensal() {
    const [mostrarCartao, setMostrarCartao] = useState(true);
    const [mostrarPix, setMostrarPix] = useState(false);

    const mostrarComponenteCartao = () => {
        setMostrarCartao(true);
        setMostrarPix(false);
    };

    const mostrarComponentePix = () => {
        setMostrarPix(true);
        setMostrarCartao(false);
    };

    return (
        <div>
            <HeaderPrincipal />
            <div className='body-trocar-pagamento body-pagamento-online'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/planos/online/mensal`}>Curso online</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Pagamento mensal</li>
                    </ol>
                </nav>
                <div className='trocar-pagamento'>
                    <h4>Escolha a forma de pagamento:</h4>
                    <div>
                        <button
                            onClick={mostrarComponenteCartao}
                            className={mostrarCartao ? 'btn-active' : ''}
                        >
                            Cartão de crédito
                        </button>
                        <button
                            onClick={mostrarComponentePix}
                            className={mostrarPix ? 'btn-active' : ''}
                        >
                            Pix
                        </button>
                    </div>
                </div>
            </div>
            {mostrarCartao && <ComponenteCartao />}
            {mostrarPix && <ComponentePix />}
        </div>
    );
}
