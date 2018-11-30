fetch(`http://localhost:3000/quotes`)
.then(resp => resp.json())
.then(quotes => {
  quotes.forEach(quote => {
    let newQuote = new Quote(quote)
  })
  proxy1.quotez = dataStore.quotez
})

const patch = (quote) => {
  fetch(`http://localhost:3000/quotes/${quote.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: (quote.likes)
    })
  })
}

const deleteFetch = (quote) => {
  fetch(`http://localhost:3000/quotes/${quote.id}`, {method: 'DELETE'})
}

const postFetch = (quote) => {
  fetch(`http://localhost:3000/quotes`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      quote: quote.quote,
      likes: quote.likes,
      author: quote.author
    })
  })
}
