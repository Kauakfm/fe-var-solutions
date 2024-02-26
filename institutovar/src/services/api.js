import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:5142/'
    baseURL: 'https://api.varsolutions.com.br/webapivar/'
    //baseURL: 'http://192.168.0.1/'
});

api.interceptors.request.use(
    async (config) => {

        var token = localStorage.getItem("usr_token");

        api.defaults.headers.authorization = `Bearer ${token}`;
        config.headers = {
            Authorization: `Bearer ${token}`,
        };

        if (config.url.includes('autenticacao'))
            return config;
        if (config.url.includes('ValidarEmail'))
            return config;
        if (config.url.includes('CadastrarUsuario'))
            return config;
        if (config.url.includes('EnviarEmailDeRedefinirSenha'))
            return config;
        if (config.url.includes('Atualizarfoto'))
            return config;
        if (config.url.includes("Pagamento"))
            return config;
        if (config.url.includes("InscreverPresencial"))
            return config;
        if (config.url.includes("ObterInicio"))
            return config;
        if (config.url.includes("Estilizacao"))
            return config;        

        if (!token) {
            window.location.href = '/login';
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

api.interceptors.response.use(async (response) => {

    return response
}, async (error) => {
    if (error.response.status == 401)
        window.location.href = '/login';

    if (error.response.status == 403)
        window.location.href = '/login';
})

export default api;