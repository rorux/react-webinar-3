import StoreModule from '../module';

/**
 * Данные авторизации
 */
class UserState extends StoreModule {
  initState() {
    return {
      loginInputValue: '',
      passwordInputValue: '',
      username: null,
      error: null,
      waiting: false,
    };
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
   * Изменение значения поля ввода логина
   * @param login {String}
   */
  setLoginInput(loginInputValue) {
    this.setState({
      ...this.getState(),
      loginInputValue,
    });
  }

  /**
   * Изменение значения поля ввода пароля
   * @param password {String}
   */
  setPasswordInput(passwordInputValue) {
    this.setState({
      ...this.getState(),
      passwordInputValue,
    });
  }
}

export default UserState;
