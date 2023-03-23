const Card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorBadRequest = require('../errors/ErrorBadRequest');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карточка с указанным _id не найдена.');
      }

      const userID = req.user._id;
      const cardOwner = card.owner.toString();

      if (userID !== cardOwner) {
        throw new ErrorForbidden('Попытка удалить чужую карточку');
      }

      return card.remove()
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Удаление карточки с несуществующим в БД id'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Переданы некорректные данные для постановки лайка');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Переданы некорректные данные для снятия лайка');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Передан несуществующий _id карточки'));
      } else {
        next(err);
      }
    });
};
