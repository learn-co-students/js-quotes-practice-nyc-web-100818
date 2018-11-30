class Quote {
  constructor({id, quote, likes, author}) {
    this.id = id
    this.quote = quote
    this.likes = likes
    this.author = author
    Quote.all.push(this)
  }

  render() {
    return `<li class='quote-card'>
              <blockquote class="blockquote">
                <p class="mb-0">${this.quote}</p>
                <footer class="blockquote-footer">${this.author}</footer>
                <br>
                <button data-id="${this.id}" class='btn-secondary'>Edit</button>
                <button data-id="${this.id}" class='btn-success'>Likes: <span>${this.likes}</span></button>
                <button data-id="${this.id}" class='btn-danger'>Delete</button>
              </blockquote>
            </li>`
  }

  renderEditForm() {
    return `<form id="edit-quote-form" data-id="${this.id}">
              <div class="form-group">
                <label for="new-quote">New Quote</label>
                <input type="text" class="form-control" name="quote" value="${this.quote}">
              </div>
              <div class="form-group">
                <label for="Author">Author</label>
                <input type="text" class="form-control" name="author" value="${this.author}">
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>`
  }

  updateLikes() {
    this.likes++
    Quote.adapter.patch(this.id, { likes: this.likes })
  }

  update() {
    Quote.adapter.patch(this.id, { author: this.author, quote: this.quote })
  }

  static findBy(key, value) {
    return Quote.all.find(q => q[key] == value)
  }

  static create(quoteObj) {
    return Quote.adapter.post(quoteObj)
      .then(json => {
        new Quote(json)
      })
  }

  static remove(id) {
    Quote.adapter.delete(id) // call delete but don't wait for it
    const i = Quote.all.findIndex(q => q.id == id)
    Quote.all.splice(i, 1)
  }

  static renderList() {
    return Quote.all.map(q => q.render()).join("")
  }

  static populateFromAPI() {
    return Quote.adapter.getAll()
      .then(json => {
        json.forEach(quoteObj => {
          new Quote(quoteObj)
        })
      })
  }

  static sortBy(key) {
    // sort in place
    Quote.all.sort((q1, q2) => q1[key] < q2[key] ? -1 : (q1[key] > q2[key] ? 1 : 0))
  }
}

Quote.all = []
Quote.adapter = new JSONAPIAdapter('http://localhost:3000/quotes')