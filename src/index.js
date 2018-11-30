let quoteList = null
let newQuoteForm = null
const quoteAdapter = new Adapter('http://localhost:3000/quotes')

document.addEventListener('DOMContentLoaded', () => {
  // Redeclare 'constants' after document loads
  quoteList = document.querySelector('#quote-list')
  newQuoteForm = document.getElementById('new-quote-form')

  // Functions that fire on load
  displayAll()
  bindCreateButton()
})

// Display all quotes
function displayAll() {
  quoteList.innerHTML = ''

  quoteAdapter.getAll().then(res => {
    res.forEach((quote) => {
      const newQuote = new Quote(quote)
      quoteList.innerHTML += newQuote.render()
    })
    bindLikeButtons()
    bindDeleteButtons()
  })
}

// Create new quote
function bindCreateButton() {
  newQuoteForm.addEventListener('submit', createQuote)
}

function createQuote(event) {
  event.preventDefault()
  const newQuote = event.target.querySelector('#new-quote')
  const newAuthor = event.target.querySelector('#author')
  body = {quote: newQuote.value, author: newAuthor.value, likes: 0}
  quoteAdapter.create(body).then(res => {
    console.log(res)
    displayAll()
    newQuote.value = ''
    newAuthor.value = ''
  })
}

// Like quote
function bindLikeButtons() {
  const buttons = [...document.getElementsByClassName('btn-like')]
  buttons.forEach((button) => {
    button.addEventListener('click', likeQuote)
  })
}

function likeQuote(event) {
  const button = event.target
  const quoteID = button.parentNode.parentNode.dataset.id
  const numLikes = parseInt(button.children[0].innerHTML) + 1
  button.children[0].innerHTML = numLikes
  quoteAdapter.updateLikes(quoteID, numLikes)
}

// Delete quote
function bindDeleteButtons() {
  const buttons = [...document.getElementsByClassName('btn-delete')]
  buttons.forEach(button => {
    button.addEventListener('click', deleteQuote)
  })
}


function deleteQuote(event) {
  const button = event.target
  const quoteElement = button.parentNode.parentNode
  quoteAdapter.delete(quoteElement.dataset.id)
  quoteElement.parentNode.removeChild(quoteElement)
}
