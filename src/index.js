// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener('DOMContentLoaded', ()=> {
  const quoteList = document.querySelector("#quote-list")
  const newForm = document.querySelector("#new-quote-form")
  const newQuote = document.querySelector("#new-quote")
  const newAuthor = document.querySelector("#author")
  let allQuotes = []
  // console.log(quoteList);
  // console.log("hi");
function fetchData() {
  fetch(`http://localhost:3000/quotes`)
  .then(res => res.json())
  .then(data => {console.table(data);
    renderAllQuotes(data);
    allQuotes = data;
  })//end of then
}//end of fetchData
fetchData()


newForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(newQuote.value, newAuthor.value)
  fetch(`http://localhost:3000/quotes`, {method: 'POST',
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "quote": newQuote.value,
        "likes": 0,
        "author": newAuthor.value
      })
      })//end pf fetch
  .then(res => res.json())
  .then(data => {console.log(data);
  renderSingleQuote(data);
  allQuotes.push(data)});
  newForm.reset()
}) // end form event listener

/// HELPER METHODS
function renderAllQuotes(quotes) {
  quoteList.innerHTML =
  quotes.map((e) => {
    return ` <li class='quote-card'>
    <blockquote class="blockquote">
    <p class="mb-0">${e.quote}</p>
    <footer class="blockquote-footer">${e.author}</footer>
    <br>
    <button class='btn-success' data-id="${e.id}">Likes: <span>${e.likes}</span></button>
    <button data-id="${e.id}" class='btn-danger'>Delete</button>
    </blockquote>
    </li>`
  }).join('')
}
function renderSingleQuote(quote) {
  quoteList.innerHTML +=
    ` <li class='quote-card'>
    <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success' data-id="${quote.id}">Likes: <span>${quote.likes}</span></button>
    <button data-id="${quote.id}" class='btn-danger'>Delete</button>
    </blockquote>
    </li>`
} // end single quote

quoteList.addEventListener('click', (e) => {
  if (e.target.className === 'btn-danger'){
    let quoteId = parseInt(e.target.dataset.id);
    // console.log(allQuotes);
    foundQuote = allQuotes.find((e) => e.id === quoteId)
    // console.log(foundQuote);
    updatedQuotes = allQuotes.filter((e) => e.id != foundQuote.id)
    allQuotes = updatedQuotes
    renderAllQuotes(allQuotes)
  fetch(`http://localhost:3000/quotes/${foundQuote.id}`, {method: 'DELETE'})
  .then(res => console.log("deleted!"))
}else if (e.target.className === 'btn-success') {
  quoteId = parseInt(e.target.dataset.id);
  // console.log(allQuotes);
  foundQuote = allQuotes.find((e) => e.id === quoteId)
  e.target.innerText = `Likes: ${foundQuote.likes +1}`
  // console.log(foundQuote);
  fetch(`http://localhost:3000/quotes/${foundQuote.id}`, {method: 'PATCH',
    headers: {
      Accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({"likes": foundQuote.likes+1})
    })
    .then(res => res.json())
    .then(data => {console.log(data);
    fetchData()})
  }//end of if
}) //end event addEventListener




})//end of dom DOMContentLoaded
