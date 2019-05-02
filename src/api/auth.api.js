import Api from './base.api';

const LOGIN_ENDPOINT = '/login';
const LOGOUT_ENDPOINT = '/logout';
const PASSWORD_ENDPOINT = '/password';
const REFRESH_TOKEN_ENDPOINT = '/refreshToken';

/**
 * @class AuthApi
 * Classe responsável por fazer as chamadas para a Api 
 * do módulo de Autenticação
 */

class AuthApi {

  /**
   * @function fetchUserStateAsync
   * Verifica se existe algum usuário logado
   * Se o accessToken está válido
   * @return Promise
   */
  static async fetchUserStateAsync() {
    try {
      throw ({ message: 'Not Logged' });
    } catch (e) {
      throw (e);
    }
  }

  /**
   * @function loginAsync
   * Faz a chamada de login
   * @param email string
   * @param password string  
   * @return Promise
   */
  // TODO - ainda teremos outros dados a serem enviados no login
  // pois precisamos logar o DEVICE do usuário
  static async loginAsync(email, password) {
    try {
      const data = await Api.post(LOGIN_ENDPOINT, {
        email, password
      });
      Api.defaults.headers['Authorization'] = `Bearer ${data.authToken}`;
      return data;
    } catch (e) {
      throw (e)
    }
  }

  /**
   * @function logoutAsync
   * @param uid number id do usuário
   * Faz a chamada de logout
   * @return Promise
   */
  // TODO - ainda teremos outros dados a serem enviados no logout
  // pois precisamos logar o DEVICE do usuário
  static async logoutAsync(uid) {
    try {
      const data = await Api.post(LOGOUT_ENDPOINT, {
        uid
      });
      return data;
    } catch (e) {
      throw (e)
    }
  }

  /**
   * @function recoverPasswordAsync
   * @param email string 
   * Envia o email para a recuperação de senha
   * @return Promise
   */
  static async recoverPasswordAsync(email) {
    try {
      const data = await Api.post(PASSWORD_ENDPOINT, {
        email
      });
      return data;
    } catch (e) {
      throw (e)
    }
  }

  /**
   * @function refreshTokenAsync
   * @param refreshToken string 
   * Faz a requisição de troca de authToken
   * @return Promise
   */
  static async refreshTokenAsync(refreshToken) {
    try {
      const data = await Api.post(REFRESH_TOKEN_ENDPOINT, {
        refreshToken
      });
      return data;
    } catch (e) {
      throw (e)
    }
  }

  /**
   * @function login
   * @param email string 
   * @param password string
   * Esta é apenas uma versão de teste sem async e await 
   * mas tratanto o then e o catch que é basicamente a 
   * mesma coisa!!!
   * @return Promise
   */
  static login = (email, password) => {
    return Api.post('/login', {
      email, password
    })
      .then(data => {
        // set access token to headers
        Api.defaults.headers['Authorization'] = `Bearer ${data.jwt}`;
        return Promise.resolve(data);
      })
      .catch(err => {
        return Promise.reject(err);
      })
  }

}

export default AuthApi