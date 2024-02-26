import { Routes, Route } from 'react-router-dom';

import Home from '../paginas/Home';
import Login from '../paginas/Login';
import RedefinirSenha from '../paginas/RedefinirSenha';
import Cadastro from '../paginas/Cadastro';
import CadastroConfirmacao from '../paginas/CadastroConfirmacao';
import HomeAluno from '../paginas/HomeAluno';
import DescricaoPresencial from '../paginas/DescricaoPresencial';
import InscricaoPresencial from '../paginas/InscricaoPresencial';
import Trilha from '../paginas/Trilha';
import TrilhaAula from '../paginas/TrilhaAula';
import Dashboard from '../paginas/Dashboard';
import AdoteUmAluno from '../paginas/AdoteUmAluno';
import PagamentoDoar from '../paginas/PagamentoDoar';
import PagamentoAdoteUmAluno from '../paginas/PagamentoAdoteUmAluno';
import PortalDaTransparencia from '../paginas/PortalDaTransparencia';
import CursoOnline from '../paginas/CursoOnline';
import PagamentoOnlineAnual from '../paginas/PagamentoOnlineAnual';
import PagamentoOnlineMensal from '../paginas/PagamentoOnlineMensal';
import Planos from '../paginas/Planos';
import TermosAnual from '../paginas/TermosDeServicoAnual';
import TermosMensal from '../paginas/TermosDeServicoMensal';
import Convocados from '../paginas/Administrativo/Convocados';
import Espera from '../paginas/Administrativo/Espera';
import Pagantes from '../paginas/Administrativo/Pagantes';
import Presenca from '../paginas/Administrativo/Presenca';
import Vagas from '../paginas/Administrativo/Vagas';
import Editar from '../paginas/Administrativo/Editar';
import Detalhes from '../paginas/Administrativo/Detalhes';
import MeusCertificados from '../paginas/MeusCertificados';
import AdicionarCurso from '../paginas/Administrativo/AdicionarTrilha/AdicionarCurso/adicionarCurso';
import FormCurso from '../paginas/Administrativo/AdicionarTrilha/AdicionarCurso/formCurso';
import AdicionarModulo from '../paginas/Administrativo/AdicionarTrilha/AdicionarModulo/adicionarModulo';
import FinalizarPagamentoPix from '../paginas/FinalizarPagamentoPix';
import FormModulo from '../paginas/Administrativo/AdicionarTrilha/AdicionarModulo/FormModulo';
import AdicionarAula from '../paginas/Administrativo/AdicionarTrilha/AdicionarAula';
import FormAula from '../paginas/Administrativo/AdicionarTrilha/AdicionarAula/FormAula';
import VincularAula from '../paginas/Administrativo/AdicionarTrilha/AdicionarAula/VincularAula';
import Estilizar from '../paginas/Administrativo/EstilizarSistema';

import SobreUnidade from '../paginas/Administrativo/SobreUnidade';
import CursosVinculados from '../paginas/Administrativo/CursosVinculados';
import VincularCursos from '../paginas/Administrativo/VincularCursos';
import EstilizarHomeAluno from '../paginas/Administrativo/EstilizarHomeAluno';
import EscolherEstilo from '../paginas/Administrativo/EscolherEstilo';

function RoutesApp() {
    return (
        <Routes>
            <Route path="*" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/redefinir/:id" element={<RedefinirSenha />} />

            <Route path="/cadastro" element={<Cadastro />}/>
            <Route path="/cadastro/confirmacao/:id" element={<CadastroConfirmacao />} />

            <Route path="/home" element={<HomeAluno />} />
            <Route path="/trilha" element={<Trilha />} />
            <Route path="/trilha/aula/:id" element={<TrilhaAula />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/meus-certificados" element={<MeusCertificados />} />

            <Route path="/doar" element={<PagamentoDoar />} />
            <Route path="/adote-um-aluno" element={<AdoteUmAluno />} />
            <Route path="/adote-um-aluno/pagamento" element={<PagamentoAdoteUmAluno />} />
            <Route path="/portal-da-transparencia" element={<PortalDaTransparencia />} />

            <Route path="/planos" element={<Planos />} />
            <Route path="/planos/presencial" element={<DescricaoPresencial />} />
            <Route path="/planos/presencial/inscricao" element={<InscricaoPresencial />} />
            <Route path="/planos/online/:id" element={<CursoOnline />} />
            <Route path="/planos/online/anual/pagamento" element={<PagamentoOnlineAnual />} />
            <Route path="/planos/online/mensal/pagamento" element={<PagamentoOnlineMensal />} />
            <Route path="/planos/online/mensal/pagamento/finalizar" element={<FinalizarPagamentoPix />} />
            <Route path="/termos/anual" element={<TermosAnual />} />
            <Route path="/termos/mensal" element={<TermosMensal />} />

            <Route path="/administrativo/convocados" element={<Convocados />} />
            <Route path="/administrativo/espera" element={<Espera />} />
            <Route path="/administrativo/pagantes" element={<Pagantes />} />
            <Route path="/administrativo/presenca" element={<Presenca />} />
            <Route path="/administrativo/vagas" element={<Vagas />} />
            <Route path='/administrativo/editar/aluno/:id' element={<Editar />} />
            <Route path='/administrativo/detalhes/aluno/:id' element={<Detalhes />} />

            <Route path="/administrativo/cursos" element={<AdicionarCurso />} />
            <Route path="/administrativo/cursos/adicionar" element={<FormCurso />} />
            <Route path="/administrativo/cursos/modulos" element={<AdicionarModulo />} />
            <Route path="/administrativo/cursos/modulos/adicionar" element={<FormModulo />} />
            <Route path="/administrativo/cursos/aulas" element={<AdicionarAula />} />
            <Route path="/administrativo/cursos/aulas/adicionar" element={<FormAula />} />
            <Route path="/administrativo/cursos/aulas/vincularAoCurso" element={<VincularAula />} />
            <Route path="/administrativo/EstilizarSistema" element={<Estilizar />} />
            <Route path='/administrativo/sobreUnidade' element={<SobreUnidade/>}></Route>
            <Route path='/administrativo/cursosVinculados' element={<CursosVinculados/>}></Route>
            <Route path='/administrativo/vincularCursos' element={<VincularCursos/>}></Route>
            <Route path='/administrativo/homeAluno' element={<EstilizarHomeAluno/>}></Route>
            <Route path='/administrativo/EscolherEstilo' element={<EscolherEstilo/>}></Route>
        </Routes >
    )
}

export default RoutesApp; 