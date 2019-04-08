class DOMController {
  constructor() {
    this.quoteList = document.getElementById('quote-list')
    this.quoteForm = document.getElementById('new-quote-form')
    this.quoteForm.addEventListener('submit', this.handleQuoteFormSubmit.bind(this))
    this.quoteList.addEventListener('click', this.handleQuoteListClick.bind(this))
  }

  render() {
    this.quoteList.innerHTML = Quote.renderList()
  }

  handleQuoteListClick(e) {
    if (e.target.className === 'btn-danger') { //delete
      Quote.remove(e.target.dataset.id)
      this.render()
    } else if (e.target.className === 'btn-success') { //like
      
    }
  }

  handleQuoteFormSubmit(e) {
    e.preventDefault()
    const quoteObj = {
      author: e.target.author.value,
      quote: e.target.quote.value,
      likes: 0
    }
    Quote.create(quoteObj)
      .then(quote => {
        this.quoteList.innerHTML += quote.renderListItem()
      })
    e.target.reset()
  }

}