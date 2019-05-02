//https://github.com/axios/axios
import axios from 'axios';
export const API_BASE_URL = 'https://controlare.com.br/luppas/dev/api';

//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// Função que verifica e retorna a mensagem de erro
const parseError = error => {
  let msg;
  if (error.response) {
    switch (error.response.status) {
      case 0:
        msg = 'ERRO 0: Erro desconhecido.';
        break;
      case 400:
        msg = 'ERRO 400: Requisição mal formada. URL: ' + error.config.url;
        break;
      case 401:
        msg = 'ERRO 401: Requisição não autorizada. URL: ' + error.config.url;
        break;
      case 404:
        msg = 'ERRO 404: Recurso não encontrado. URL: ' + error.config.url;
        break;
      case 405:
        msg = 'ERRO 405: Método não permitido. URL: ' + error.config.url;
        break;
      case 500:
        msg = 'ERRO 500: Erro interno de servidor. URL: ' + error.config.url;
        break;
      case 504:
        msg = 'ERRO 504: Requisição expirada. URL: ' + error.config.url;
        break;
      default:
        msg = 'Erro desconhecido. URL: ' + error.config.url;
    }
  } else if (error.request) {
    msg = 'Erro na requisição. URL: ' + error.config.url;
  } else {
    msg = error.message;
  }
  return msg;
}

// Criar a instância do Axios 
const Api = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

// apenas logando o request para verificar parametros
Api.interceptors.request.use(
  config => {
    console.log('RequestInterceptor: ', JSON.stringify(config))
    return config;
  },
  err => Promise.reject(err)
)

/*
  Response Schema
  response.data = provided by the server
  response.status = 200, 300, 500 and so on
  response.statusText = HTTP Status message
  response.headers
  response.config
  response.request
  when using .then the response does not come with response.request
*/
Api.interceptors.response.use(
  response => {
    console.log('ResponseInterceptor RESPONSE: ', JSON.stringify(response))

    if (response.status == 200 && response.data) {
      if (response.data.code == 1) return response.data.data;
      return Promise.reject({ message: response.data.msg });
    }

    //verificação de status e response para outras APIS eg. randomuser.me
    if (response.status == 200 && response.error) {
      return Promise.reject({ message: response.error.message });
    }

    // verificação de outro erro qualquer
    return Promise.reject({ message: `Requisição completou mas com status: ${response.status} e texto: ${response.statusText}` });

  },
  error => {
    console.log('ResponseInterceptor ERROR: ', JSON.stringify(error))
    /**
     * https://gist.github.com/alfonmga/96474f6adb6ed8dee8bc8bf8627c0ae1
     * lidar com token expirado
     * obs importante no link acima:
     * IMPORTANT: if an invalid refresh token is sent to our API endpoint /auth/refresh_access_token BACKEND MUST RETURN A 403 HTTP CODE NOT A 401 HTTP CODE otherwise it will produce an infinite loop. BTW, also login API endpoint must return a 403 if invalid credentials are provided or 423 if account is locked/banned.
     * 
     * https://www.npmjs.com/package/axios-auth-refresh
     * Axios plugin that makes it easy to implement automatic refresh of authorization via axios' interceptors. 
     * 
     * https://github.com/functionalStoic/my-idea-pool-client/blob/master/src/api/utils/axiosInstance.js
     */
    if (error.response.status !== 401) {
      const msg = parseError(error);
      return Promise.reject({ message: msg })
    }

    const originalRequest = error.config;
    //Adicionar lógica de recuperação do token com refreshToken
  }
);

export default Api;
