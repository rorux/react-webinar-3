import StoreModule from '../module';

const INITIAL_STATE = {
  data: { name: null, email: null, phone: null, username: null },
  error: null,
  waiting: false,
};

/**
 * Данные о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return INITIAL_STATE;
  }

  /**
   * Получение данных о пользователе
   * @return {Promise<void>}
   */
  async getProfile() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      };
      const response = await fetch(`/api/v1/users/self?fields=*`, options);
      const json = await response.json();

      if (json.error)
        throw new Error(json.error.data?.issues?.[0]?.message || 'Требуется авторизация!');

      const {
        email,
        username,
        profile: { name, phone },
      } = json.result;

      this.setState(
        {
          data: { email, name, phone, username },
          error: null,
          waiting: false,
        },
        'Получены данные о пользователе',
      );
    } catch (error) {
      this.setState(Object.assign(INITIAL_STATE, { error: error.message }));
    }
  }
}

export default UserState;
