const ru = {
  translation: {
    global: {
      hexletChat: 'Hexlet Chat',
      cancel: 'Отменить',
      submit: 'Отправить',
      delete: 'Удалить',
      channelName: 'Имя канала',
      error: {
        network: 'Ошибка сети',
        unknown: 'Неизвестная ошибка',
      },
    },
    header: {
      logout: 'Выйти',
    },
    auth: {
      loginForm: {
        error: {
          invalidUsernameOrPassword: 'Неверные имя пользователя или пароль',
          requiredField: 'Обязательное поле',
        },
        yourNickname: 'Ваш ник',
        password: 'Пароль',
        login: 'Войти',
        dontHaveAccount: 'Нет аккаунта?',
      },
      signupForm: {
        error: {
          requiredField: 'Обязательное поле',
          userAlreadyExist: 'Такой пользователь уже существует',
          usernameLength: 'От 3 до 20 символов',
          passwordLength: 'Не менее 6 символов',
          passwordsMustMatch: 'Пароли должны совпадать',
        },
        yourNickname: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        registration: 'Регистрация',
        register: 'Зарегистрироваться',
      },
    },
    channels: {
      addForm: {
        addChannel: 'Добавить канал',
        error: {
          length: 'От 3 до 20 символов',
          mustBeUnique: 'Должно быть уникальным',
          removeLeadSpaces: 'Исключите пробелы перед названием',
          requiredField: 'Обязательное поле',
        },
      },
      deleteForm: {
        deleteChannel: 'Удалить канал',
        areYouSure: 'Уверены?',
      },
      renameForm: {
        renameChannel: 'Переименовать канал',
        error: {
          length: 'От 3 до 20 символов',
          mustBeUnique: 'Должно быть уникальным',
          removeLeadSpaces: 'Исключите пробелы перед названием',
          requiredField: 'Обязательное поле',
        },
      },
      channels: 'Каналы',
      addChannel: 'Добавить канал',
      rename: 'Переименовать',
      delete: 'Удалить',
      channelControl: 'Управление каналом',
      сhannelAddedSuccessfully: 'Канал создан',
      сhannelDeletedSuccessfully: 'Канал удалён',
      сhannelRenamedSuccessfully: 'Канал переименован',
    },
    chat: {
      typeYourMessage: 'Введите сообщение...',
      newMessage: 'Новое сообщение',
      messagesCount_zero: 'сообщений',
      messagesCount_one: 'сообщение',
      messagesCount_few: 'сообщения',
      messagesCount_many: 'сообщений',
    },
  },
};

export default ru;
