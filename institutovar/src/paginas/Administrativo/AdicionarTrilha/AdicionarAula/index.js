import React, { useEffect, useState } from "react";
import "./adicionaraula.css";
import HeaderAluno from "../../../../componentes/HeaderAluno";
import api from "../../../../services/api";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

export default function AdicionarAula() {
  const [aulas, setAulas] = useState([]);
  useEffect(() => {
    handleGetAulas();
  }, [])

  const handleSalvarClick = () => {

  };
  const handleGetAulas = () => {
    api.get("Curso/ObterTodasAulas").then((response) => {
      setAulas(response.data)
    })
  }
  return (
    <div>
      <HeaderAluno />
      <div className="body-add-aula">
      <h1>Aulas</h1>

        <div className='body-buttons'>
          <Link to={`/administrativo/cursos`} className='btn-addd'><button className="btn-add">Ver curso</button></Link>
          <Link to={`/administrativo/cursos/modulos`} className='btn-addd'><button className="btn-add"> Ver módulo</button></Link>
          <Link to={`/administrativo/cursos/aulas/adicionar`} className='btn-addd'><button className="btn-add"><IoAdd /> Adicionar aulas</button></Link>          
          <Link to={`/administrativo/cursos/aulas/vincularAoCurso`} className='btn-addd'><button className="btn-add"><IoAdd /> Vincular aula</button></Link>          
        </div>

        <table className="table table-dark table-striped table-bordered col-md-12">
          <thead>
            <tr>
              <th>codigo</th>
              <th>descricao</th>
              <th>detalhe</th>
              <th>urlAula</th>
              <th>urlAulapanda</th>
              <th>isAtivo</th>
              <th>dataCadastro</th>
              <th>tempoVideoSegundos</th>
              <th>moduloId</th>
            </tr>
          </thead>
          <tbody>
            {aulas.length > 0 ?
              aulas.map((aula) => {
                return (
                  <tr>
                    <td>{aula.codigo}</td>
                    <td>{aula.descricao}</td>
                    <td>{aula.detalhe}</td>
                    <td>{aula.urlAula}</td>
                    <td>{aula.urlAulapanda}</td>
                    <td>{aula.isAtivo ? "ativo" : "inativo"}</td>
                    <td>{aula.dataCadastro}</td>
                    <td>{aula.tempoVideoSegundos} segundos</td>
                    <td>{aula.moduloId}</td>
                  </tr>
                );
              })
              :
              ""}

          </tbody>
        </table>
      </div>
    </div>
  );
}
