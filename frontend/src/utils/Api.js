class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
}

//получение данных юзера
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }
//редактирование данных юзера
  editUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse)
  }
//редактирование аватара
  editAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: link.avatar})
    })
    .then(this._checkResponse)
  }
//Отрисовка начальных карточек
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }
//добавление карточки
  addPlaceCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  }
//удаление карточки
  deletePlaceCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

//добавление и удаление лайка
updateCardLike(id, liked) {
  return this._set(`cards/likes/${id}`, liked ? 'PUT' : 'DELETE')
}

_set(query, method) {
  return fetch(`${this._url}${query}`, {
    method,
    headers: this._headers,
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}

_checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   }
}

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-29/',
  headers: {
  authorization: 'f0580056-984e-4f07-9580-70b86980b58c',
  'Content-Type': 'application/json'
  }
})

export default api;
