import {BsDiscord} from 'react-icons/bs';
import './modalsuporte.css';

export default function ModalSuporte() {
    return (
        <div className="modal-suporte modal fade" id="ModalSuporte" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content modal-dialog-scrollable">
                    <div class="modal-header">
                        <BsDiscord/>
                        <h5 class="modal-title">Discord</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ color: 'white' }}>
                        <h2>Suporte via Discord direto com o Instrutor</h2>
                        <p>Você pode obter ajuda direta com o instrutor através do Discord.</p>
                        <p>Nosso horário de atendimento é de <span>Segunda à Sexta das 09:00h às 12:00h e das 14:00h às 17:00h</span>. Estamos aqui para ajudar durante esses horários.</p>
                        <a href='https://discord.gg/3V8gB3x3J5' target='_blank'><button className='botao-suporte'>CHAT COM INSTRUTOR</button></a>
                        <h2>O que é o Fórum:</h2>
                        <p style={{marginBottom: "4%"}}>O Fórum é uma comunidade de aprendizado onde os alunos podem interagir, fazer perguntas e compartilhar conhecimento. É um ótimo lugar para trocar ideias, colaborar e ampliar sua compreensão do conteúdo do curso.</p>
                        <div><iframe src="https://player-vz-a789efd7-bc9.tv.pandavideo.com.br/embed/?v=cb408791-cda5-4132-bfd3-a7cffb2d9160" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen="true"></iframe></div>
                        <h2>Regras de comportamento exigidas:</h2>
                        <p>Mantenha um ambiente respeitoso e construtivo para todos.</p>
                        <p>Evite linguagem ofensiva ou discriminatória.</p>
                        <p>Não compartilhe informações pessoais.</p>
                        <p>Respeite as opiniões e dúvidas dos outros.</p>
                        <br/>
                        <p>Lembre-se, estamos aqui para ajudar você a ter sucesso no curso. Se tiver alguma dúvida, não hesite em nos contatar pelo Discord ou usar o Fórum.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}