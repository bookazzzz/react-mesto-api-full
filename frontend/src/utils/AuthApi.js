const baseUrl = 'https://auth.nomoreparties.co';

class AuthApi {

    constructor(config) {
        this.url = config;
    }

    register ({email, password}) {
        return fetch(this.url +'/signup', {
            method: 'POST',
            headers: {'Accept': 'application/json',
                      'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(response => {
                return this._getResponseData(response)
        })
    };

    authorization ({email, password}) {
        return fetch(this.url +'/signin', {
            method: 'POST',
            headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }).then(response => {
            return this._getResponseData(response)
        })
    };

    getContent (token) {
        return fetch(this.url + '/users/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then(response => {
            return this._getResponseData(response)
        })
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}

export const apiAuth = new AuthApi(baseUrl);
