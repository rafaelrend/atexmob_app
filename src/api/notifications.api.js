import Api from './base.api';

const ENDPOINT = '/notificacoes';

/**
 * @class NotificationsApi
 * Classe responsável por fazer as chamadas para a Api 
 * do módulo de Notificações
 */

class NotificationsApi {

  /**
   * @function fetchNotifications
   * Lista notificações por usuário
   * @param uid number id do usuário
   * @param params object no formato da Config.params do axios
   * @return Promise
   */
  static async fetchNotifications(uid, params) {
    try {
      const path = `${ENDPOINT}/${uid}`;
      const config = { params };
      const data = await Api.get(path, config);
      return data;
    } catch (e) {
      throw (e)
    }
  }

  /**
   * @function fetchNotification
   * Notificação por id
   * @param id number id da notificação
   * @return Promise
   */
  static async fetchNotification(id) {
    try {
      const path = `${ENDPOINT}/${id}`;
      const data = await Api.get(path, config);
      return data;
    } catch (e) {
      throw (e)
    }
  }

  /**
   * @function updateNotification
   * Update de Notificação
   * @param data object Notificação
   * @return Promise
   */
  static async updateNotification(data) {
    try {
      const path = `${ENDPOINT}/${data.id}`;
      const data = await Api.put(path, data);
      return data;
    } catch (e) {
      throw (e)
    }
  }
}


export default NotificationsApi;