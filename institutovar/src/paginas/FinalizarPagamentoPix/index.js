import React, { useState } from "react";
import './finalizarpagamentopix.css';
import qrcode from '../../imagens/var/qrcode-pix.jpg';
import pixIcon from '../../imagens/icon/pix.png';
import {BsCheckLg} from 'react-icons/bs';
import {FaCopy} from 'react-icons/fa';

export default function FinalizarPagamentoPix() {
    const codigoPix = "042084101928421804810090";
    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(codigoPix)
            .then(() => {
                setCopied(true);
            })
            .catch((error) => {
            //console.error("Ocorreu um erro ao copiar o código Pix", error);
            });
    };

    return (
        <div className="body-finalizar-pix">
            <h4>Finalize seu pagamento via Pix <img src={pixIcon} alt="Ícone Pix"/></h4>
            <div className="div-code">
                <h6>Escaneie este código para pagar:</h6>
                <img src={qrcode} alt="QR Code"/>
                <h6>Ou copie este código QR:</h6>
                <div>
                    <span>{codigoPix}</span>
                    {copied ? <p><BsCheckLg/> Copiado!</p> : <p onClick={handleCopyCode}><FaCopy/> Copiar</p>}
                </div>
                <section> 
                    <p>Para a aprovação de sua compra, por gentileza, envie o comprovante de pagamento via WhatsApp <a href="https://api.whatsapp.com/send/?phone=551151987389&text=Olá, gostaria de confirmar o meu pagamento para o curso online mensal via Pix. Segue em anexo o comprovante da transação. Fico no aguardo do seu retorno com a confirmação. 😊&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">clicando aqui</a>, ou faça o upload abaixo:</p>
                    <input type="file"/>
                    <button>Enviar Arquivo</button>
                    <p>Obs.: Sua compra será aprovada em até 24 horas.</p>
                    <p>Além disso, o QR Code também foi enviado para o seu e-mail!</p>
                </section>
            </div>
        </div>
    );
}
