export class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error:${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`${this._baseURL}cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._baseURL}users/me`, { headers: this._headers });
  }

  editUserInfo({ name, about }) {
    return this._request(`${this._baseURL}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  editAvatarInfo({ avatar }) {
    return this._request(`${this._baseURL}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  addCard({ name, link}) {
    return this._request(`${this._baseURL}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(_id) {
    return this._request(`${this._baseURL}cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeStatus(_id, isLiked) {
    return this._request(`${this._baseURL}cards/${_id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }
}
