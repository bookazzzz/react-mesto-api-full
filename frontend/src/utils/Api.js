class Api {
  constructor({ url }) {
    this._url = url;
  }

  getAppInfo(token) {
    this._token = token;

    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  //получение данных юзера
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
  //редактирование данных юзера
  editUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }
  //редактирование аватара
  editAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: link.avatar }),
    }).then(this._checkResponse);
  }
  //Отрисовка начальных карточек
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
  //добавление карточки
  addPlaceCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }
  //удаление карточки
  deletePlaceCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

  //добавление и удаление лайка
  updateCardLike(id, liked) {
    return this._set(`cards/likes/${id}`, liked ? "PUT" : "DELETE");
  }

  _set(query, method) {
    return fetch(`${this._url}${query}`, {
      method,
      headers: {
        Authorization: `Bearer ${this._token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: "https://bookaback.nomoredomains.work/"
  // url: "http://localhost:3001/"
});

export default api;
