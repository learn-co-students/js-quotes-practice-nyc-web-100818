class DOMController {
  constructor() {
    this.sort = document.getElementById('sort')
    this.quoteList = document.getElementById('quote-list')
    this.newQuoteForm = document.getElementById('new-quote-form')
    this.newQuoteForm.addEventListener('submit', this.handleNewQuoteSubmit.bind(this))
    this.quoteList.addEventListener('click', this.handleListClick.bind(this))
    this.sort.addEventListener('change', this.handleSortCheck.bind(this))
  }

  render() {
    this.quoteList.innerHTML = Quote.renderList()
  }

  handleSortCheck(e) {
    if (e.target.checked) {
      Quote.sortBy("author")
    } else {
      Quote.sortBy("id")
    }
    this.render()
  }

  handleListClick(e) {
    if (e.target.className === "btn-danger") { // delete event
      Quote.remove(e.target.dataset.id)
      const liToRemove = e.target.closest("li")
      this.quoteList.removeChild(liToRemove)
    } else if (e.target.className === "btn-success") { // like event
      const quote = Quote.findBy("id", e.target.dataset.id)
      quote.updateLikes()
      e.target.querySelector('span').innerText = quote.likes
    } else if (e.target.className === "btn-secondary") { // edit event
      const quote = Quote.findBy("id", e.target.dataset.id) // find the quote
      const quoteForm = DOMController.stringToHtmlElement(quote.renderEditForm()) // create a new quote form... as a string...
      quoteForm.addEventListener('submit', this.handleEditQuoteSubmit.bind(this)) // bind the submit handler
      const liToRemove = e.target.closest("li")
      this.quoteList.replaceChild(quoteForm, liToRemove)
    }
  }

  handleEditQuoteSubmit(e) {
    e.preventDefault()
    const quote = Quote.findBy("id", e.target.dataset.id) // find the quote
    quote.author = e.target.author.value
    quote.quote = e.target.quote.value
    quote.update() // update on API, don't wait cuz we're optimist
    // e.target.removeEventListener('submit', this.handleEditQuoteSubmit) // this won't work, need to save a reference to the event handler...
    const liToAdd = DOMController.stringToHtmlElement(quote.render()) // swap back to li
    this.quoteList.replaceChild(liToAdd, e.target)
  }

  handleNewQuoteSubmit(e) {
    e.preventDefault()
    const quoteObj = { // parse the form
      author: e.target.author.value,
      quote: e.target.quote.value,
      likes: 0
    }
    Quote.create(quoteObj) // add the quote
      .then(() => { this.render() }) // rerender (pessimistic, since we need ID to do anything...)
    e.target.reset()
  }

  static stringToHtmlElement(html) {
    const template = document.createElement('template')
    template.innerHTML = html.trim()
    return template.content.firstChild
  }
}