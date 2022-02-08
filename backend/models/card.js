const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Минимальная длина поля 'name' - 2 символа."],
    maxlength: [30, "Максимальная длина поля 'name' - 30 символов."],
    required: true,
  },
  link: {
    type: String,
    required: [true, "Поле 'link' должно быть заполнено."],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  llikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
