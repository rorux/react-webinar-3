import StoreModule from '../module';

const INITIAL_STATE = {
  loginInputValue: '',
  passwordInputValue: '',
  username: null,
  error: null,
  waiting: false,
};

/**
 * Данные авторизации
 */
class AuthState extends StoreModule {
  initState() {
    return INITIAL_STATE;
  }

  /**
   * Авторизация пользователя
   * @return {Promise<void>}
   */
  async sign() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const login = this.getState().loginInputValue;
    const password = this.getState().passwordInputValue;

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      };
      const response = await fetch(`/api/v1/users/sign`, options);
      const json = await response.json();

      if (json.error)
        throw new Error(json.error.data?.issues?.[0]?.message || 'Ошибка отправки формы!');

      const {
        token,
        user: { username },
      } = json.result;

      if (token) {
        localStorage.setItem('token', token);
        this.setState(
          {
            loginInputValue: '',
            passwordInputValue: '',
            username,
            error: null,
            waiting: false,
          },
          'Пользователь авторизован',
        );
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        username: null,
        error: error.message,
        waiting: false,
      });
    }
  }

  /**
   * Выход из аккаунта
   * @return {Promise<void>}
   */
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      };
      const response = await fetch(`/api/v1/users/sign`, options);
      const json = await response.json();

      if (json.error)
        throw new Error(json.error.data?.issues?.[0]?.message || 'Требуется авторизация!');

      if (json.result) {
        localStorage.removeItem('token');
        this.setState(Object.assign(INITIAL_STATE), 'Пользователь разлогинился');
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        username: null,
        error: error.message,
        waiting: false,
      });
    }
  }

  /**
   * Изменение значения поля ввода логина
   * @param login {String}
   */
  setLoginInput(login) {
    this.setState({
      ...this.getState(),
      loginInputValue: login,
    });
  }

  /**
   * Изменение значения поля ввода пароля
   * @param password {String}
   */
  setPasswordInput(password) {
    this.setState({
      ...this.getState(),
      passwordInputValue: password,
    });
  }

  /**
   * Изменение username
   * @param username {String}
   */
  setUsername(username) {
    this.setState({
      ...this.getState(),
      username,
    });
  }
}

export default AuthState;
