// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", function() {

const quoteList = document.getElementById('quote-list')


const submitButtonCollection = document.getElementsByClassName('btn btn-primary')
const submitButton = submitButtonCollection[0]


const quoteForm = document.getElementById('new-quote-form')
const newQuoteInput = document.getElementById('new-quote')
const newAuthorInput = document.getElementById('author')
console.log(newQuoteInput, newAuthorInput);

let allQuotes

function fetchQuotes(){
fetch('http://localhost:3000/quotes')
  .then(response => response.json())
  .then(data => {
    allQuotes = data
    console.table(data);
    quoteList.innerHTML = showQuotes(data)
    console.log(allQuotes);
  })
}


  function showQuotes(data) {
    return data.map(function(eachQuote) {
      return `<li class='quote-card ${eachQuote.id}'>
      <blockquote id=${eachQuote.id} class="blockquote">
      <p class="mb-0">${eachQuote.quote}</p>
      <footer class="blockquote-footer">${eachQuote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${eachQuote.likes}</span></button>
      <button class='btn-danger'>Delete</button>
      </blockquote>
      </li>`
    }).join("")
  }
  fetchQuotes()


  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
           {
            "quote": newQuoteInput.value,
            "author": newAuthorInput.value,
            "likes": 0
          }
        )
      })//end of fetch
      .then(response => response.json())
      .then(data => quoteList.innerHTML +=
        `<li class='quote-card ${data.id}'>
        <blockquote id=${data.id} class="blockquote">
        <p class="mb-0">${data.quote}</p>
        <footer class="blockquote-footer">${data.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${data.likes}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
        </li>`
      )
  })
//end of eventListener for submitButton

quoteList.addEventListener('click', (e) => {
  if (e.target.className === 'btn-success'){
    selectedQuote = parseInt(e.target.parentElement.id)
    console.log(`The id of the quote selected is ${selectedQuote}`);
    currentLikes = parseInt(e.target.parentElement.querySelector('button').innerText.split(' ')[1])
    console.log(currentLikes);
    e.target.parentElement.querySelector('button').innerText = `Likes: ${currentLikes + 1}`
    fetch(`http://localhost:3000/quotes/${selectedQuote}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        {
          "likes": (currentLikes + 1)
        }
      )
    })

  }
  else if (e.target.className === 'btn-danger'){
    console.log('you finna delete this');
    let deleteId = parseInt(e.target.parentElement.id)
    filteredQuotes = allQuotes.filter(quote => {
      return quote.id !== deleteId
    })
    fetch(`http://localhost:3000/quotes/${deleteId}`, {method: 'DELETE'})
    let selectedLi = document.getElementsByClassName(`${deleteId}`)
    console.log(selectedLi[0]);
    let selectedQuote = allQuotes.filter((quote) =>
      quote.id === deleteId
        )
        console.log(selectedQuote);
        quoteIndex = allQuotes.indexOf(selectedQuote[0])
        console.log(quoteIndex);
      allQuotes.splice(quoteIndex, 1)
      selectedLi[0].parentNode.removeChild(selectedLi[0]) 
  }
})//end of event listener for quoteList













})//end of DOMContentLoaded
