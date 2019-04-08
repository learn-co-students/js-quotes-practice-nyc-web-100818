class Quote {
  constructor({ id, quote, likes, author }) {
    this.id = id
    this.quote = quote
    this.likes = likes
    this.author = author
    Quote.all.push(this)
  }

  renderListItem() {
    return `<li class='quote-card'>
              <blockquote class="blockquote">
                <p class="mb-0">${this.quote}</p>
                <footer class="blockquote-footer">${this.author}</footer>
                <br>
                <button data-id="${this.id}" class='btn-success'>Likes: <span>${this.likes}</span></button>
                <button data-id="${this.id}" class='btn-danger'>Delete</button>
              </blockquote>
            </li>`
  }

  static remove(id) {
    const i = Quote.all.findIndex(q => q.id == id)
    Quote.splice(i, 1)
    return Quote.adapter.delete(id)
  }

  static create(quoteObj) {
    return Quote.adapter.post(quoteObj)
      .then(json => new Quote(json))
  }

  static renderList() {
    return Quote.all.map(q => q.renderListItem()).join('')
  }

  static populateFromAPI() {
    return Quote.adapter.getAll()
      .then(json => {
        json.forEach(quoteObj => {
          new Quote(quoteObj)
        })
      })
  }
}

Quote.all = []
Quote.adapter = new JSONAPIAdapter('http://localhost:3000/quotes')