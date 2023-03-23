const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

const { NODE_ENV, JWT_SECRET } = process.env;

// получить всех юзеров
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// получить юзера по айди
module.exports.getUserByID = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound('Получение пользователя с несуществующим в БД id'));
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ErrorNotFound('Пользователь по указанному _id не найден.');
      } else {
        next(err);
      }
    });
};

// создать юзера
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Некорректные данные при создании карточки'));
        return;
      }
      if (err.code === 11000) {
        next(new ErrorConflict('Пользователь с таким электронным адресом уже зарегистрирован'));
        return;
      }
      next(err);
    });
};

// обновить информацию по юзеру
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Пользователь по указанному _id не найден.');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorBadRequest('Некорректные данные при создании карточки');
      } else {
        next(err);
      }
    });
};

// обновить отдельно аватар юзера
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Пользователь по указанному _id не найден.');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ErrorBadRequest('Некорректные данные при создании карточки');
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized('Неправильные почта или пароль');
      }

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      res.send({ token: `${token}` });
    })
    .catch(next);
};

module.exports.userInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound('Пользователя с указанным _id не существует');
      }

      res.send({
        data: user,
      });
    })
    .catch((err) => next(err));
};
