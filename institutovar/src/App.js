import { useEffect } from 'react';
import RoutesApp from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from './services/api';

function App() {
  const handleGetCSS = async () => {
    api.get("Estilizacao/ObterCSS").then((response) => {
      let style = document.createElement("style");      
      let text = document.createTextNode(response.data.css);

      style.appendChild(text)
      document.head.appendChild(style);
    })
  }

  useEffect(() => {
    handleGetCSS();
  }, [])
  return (
    <div>
      <BrowserRouter>
        <RoutesApp/>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
