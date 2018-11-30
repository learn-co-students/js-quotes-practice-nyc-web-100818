class Quote {
  constructor(body) {
    this.id = body.id
    this.quote = body.quote
    this.likes = body.likes
    this.author = body.author
    allQuotes.push(this)
  }

  render() {
    return `<li class='quote-card' data-id='${this.id}'>
        <blockquote class="blockquote">
        <p class="mb-0">${this.quote}</p>
        <footer class="blockquote-footer">${this.author}</footer>
        <br>
        <button class='btn-like'>Likes: <span>${this.likes}</span></button>
        <button class='btn-delete'>Delete</button>
        </blockquote>
      </li>`
  }
}

allQuotes = []
