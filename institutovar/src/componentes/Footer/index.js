import '../../paginas/Home/home.css';
import seloPag from '../../imagens/seloPagarX.png'
import { FaWhatsapp, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import MapIframe from '../Mapa';
import '../../paginas/Home/home.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-div'>
                <div className='footer-unidade'>
                    <h6>Nossas unidades</h6>
                    <p>Unidade 1:</p>
                    <p>R. Nicolau Maevsky, 612 - Jardim <br /> Lindomar, Jandira, SP - Brasil <br /> 06622-005</p>                    
                    <div>                        
                        <a href='https://api.whatsapp.com/send?phone=551151987389' target='_blank' rel="noreferrer"><FaWhatsapp /></a>
                        <a href='https://www.instagram.com/var.solutions/' target='_blank' rel="noreferrer"><FaInstagram /></a>
                        <a href='https://br.linkedin.com/company/varsolution' target='_blank' rel="noreferrer"><FaLinkedin /></a>
                        <a href='https://www.youtube.com/@varsolutions' target='_blank' rel="noreferrer"><FaYoutube /></a>
                    </div>
                
                </div>
                <div className='footer-participar'>
                    <h6>Como participar</h6>
                    <Link to="/login">Entrar</Link>
                    <Link to="/planos">Quero participar</Link>
                    <Link to="/doar">Doar</Link>
                    <Link to="/adote-um-aluno">Adote um aluno</Link>
                    <Link to="/portal-da-transparencia">Portal da transparência</Link>
                </div>
                <MapIframe className="map-container"/>
            </div>
            {/* <img src={seloPag} style={{width:"200px", marginBottom: '0', marginTop: '3vh'}}/> */}
            <span>&#169; Copyright Var Solutions. Todos os direitos reservados</span>
        </div>
    )
}