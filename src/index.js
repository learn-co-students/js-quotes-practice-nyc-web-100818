
document.addEventListener('click', event => {
  if (event.target.className == "btn-success") {
    let quoteId = event.target.dataset.id
    patchQuote(quoteId)
  } else if (event.target.className == "btn-danger") {
    let quoteId = event.target.dataset.id
    let quote = dataStore.quotez.find(quote => quote.id == quoteId)
    deleteQuote(quote)
  }
})

form.addEventListener('submit', event => {
  event.preventDefault()
  let newParams = {
    quote: document.getElementById('new-quote').value,
    author: document.getElementById('author').value
  }
  let newQuote = new Quote(newParams)
  proxy2.quotez = dataStore.quotez
  postFetch(newQuote)
})
