class Adapter {
  constructor(url) {
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    this.url = url
  }

  getAll() {
    return fetch(`${this.url}`).then(res => res.json())
  }

  create(body) {
    return fetch(`${this.url}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }

  updateLikes(id, numLikes) {
    const body = {likes: numLikes}
    return fetch(`${this.url}/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }

  delete(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    })
  }
}
