class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  register({ name, email, password }) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
  }

  authorize({ email, password }) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken(jwt) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: "include",
    });
  }

  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
      credentials: "include",
    });
  }

  getInitialMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: "include",
    });
  }

  addNewMovie(movie) {
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
      credentials: "include",
    });
  }

  deleteMovie(movieId) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: "include",
    });
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.rumpelstilzchen.nomoredomains.monster",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default mainApi;
