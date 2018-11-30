const quotesDiv = document.getElementById('quote-list')
const form = document.getElementById('new-quote-form')

const createQuote = (quote) => {
  quotesDiv.innerHTML += `
  <li class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success' data-id="${quote.id}" data-likes="${quote.likes}">Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger'data-id="${quote.id}" >Delete</button>
    </blockquote>
  </li>
  `
}

const getAllQuotes = (quotes) => {
  quotes.forEach(quote => createQuote(quote))
}

const patchQuote = (quoteId) => {
  let quote = dataStore.quotez.find(quote => quote.id == quoteId)
  quote.likes++
  // let quote = proxy3.quotez

  patch(quote)
  proxy2.quotez = dataStore.quotez
}

const deleteQuote = (quote) => {
  // deleteFetch(quote)
  let quoteIndex = dataStore.quotez.indexOf(quote)
  dataStore.quotez.splice(quoteIndex, 1);
  proxy2.quotez = dataStore.quotez
}
