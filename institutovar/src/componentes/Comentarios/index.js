import './comentarios.css';
import { useEffect, useState } from 'react';
import api from "../../services/api"

export default function Comentarios(props) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLoadComments = () => {        
    const url = '/Curso/obterComentariosPorAula/' + props.AulaId;
    api.get(url).then((response) => {            
      setComments(response.data);
    });
  }

  const handleChangeComments = (event) => {
    setComment(event.target.value);
  }

  const handleSaveComment = async () => {
    const url = '/Curso/SalvarComentarios/';

    await api.post(url, {
      comentario: comment,
      aulaCodigo: props.AulaId,
      usuarioCodigo: window.localStorage.getItem("usr_id")
    }).then((response) => {
      if (response.status === 200) {                
        handleLoadComments();
        setComment("");
      } else {
        throw new Error('Erro de solicitação: ' + response);
      }
    });
  }

  useEffect(() => {
    handleLoadComments();        
  }, []);

  return (
    <div className='body-comentarios'>
      <div className='publicar'>
        <textarea 
          placeholder='Digite o seu comentário ou dúvida sobre a aula...' 
          onChange={handleChangeComments} 
          value={comment}
        />
        <button type='submit' onClick={handleSaveComment}>Publicar</button>
      </div>
      <div>
        {comments == null ? '' :
          comments.slice().reverse().map((comentario) => {
            const data = new Date(comentario.data);
            return (
              <div className='box-comentario' key={comentario.id}>
                <h6>{comentario.nome} <span>{`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`}</span></h6>
                <p>{comentario.comentario}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
