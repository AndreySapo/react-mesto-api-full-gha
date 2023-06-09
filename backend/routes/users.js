const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserByID,
  updateUser,
  updateAvatar,
  userInfo,
} = require('../controllers/users');
const regexLink = require('../utils/regexLink');

usersRouter.get('/', getUsers);

usersRouter.get('/me', userInfo);

usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserByID,
);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser,
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(regexLink),
    }),
  }),
  updateAvatar,
);

module.exports = usersRouter;
