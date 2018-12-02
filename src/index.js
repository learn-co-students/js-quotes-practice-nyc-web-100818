document.addEventListener('DOMContentLoaded', () => {
  // DOM
  let quoteList = document.getElementById('quote-list')
  const newQuoteForm = document.getElementById('new-quote-form')
  newQuoteForm.hidden = false
  const quoteTextBox = document.getElementById('new-quote')
  const authorInputBox = document.getElementById('author')
  const formsDiv = document.getElementById('forms-div')
  let editForm = document.getElementById('edit-quote-form')
  let editQuoteField = document.getElementById('edited-quote')
  let editAuthorField = document.getElementById('author-edited')
  const filterButton = document.getElementById('filter-by-author')
  // VARIABLES
  const quotesURL = 'http://localhost:3000/quotes'
  // FETCHES AND EVENT LISTENERS
  fetch(quotesURL) // { method: 'GET' } is DEFAULT
    .then(r => r.json())
    .then(arrayOfQuoteObjects => {
      arrayOfQuoteObjects.forEach((quoteObject) => {
        quoteList.innerHTML += `<li id="quote-${quoteObject.id}" class='quote-card'>
                                  <blockquote class="blockquote">
                                    <p class="mb-0">${quoteObject.quote}</p>
                                    <footer class="blockquote-footer">${quoteObject.author}</footer>
                                    <br>
                                    <button id=${quoteObject.id} class='btn-success'>Likes: ${quoteObject.likes}<span>0</span></button>
                                    <button id="${quoteObject.id}" class='btn-danger'>Delete</button>
                                    <button id="${quoteObject.id}" class='edit'>Edit</button>
                                  </blockquote>
                                </li>`
      })
    })

    newQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let quoteText = quoteTextBox.value
      let authorText = authorInputBox.value
      fetch(quotesURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          "quote": quoteText,
          "likes": 0,
          "author": authorText
        })
      })
      .then(r => r.json())
      .then(newQuoteObject => {
        quoteList.innerHTML += `<li id="quote-${newQuoteObject.id}" class='quote-card'>
                                  <blockquote class="blockquote">
                                    <p class="mb-0">${newQuoteObject.quote}</p>
                                    <footer class="blockquote-footer">${newQuoteObject.author}</footer>
                                    <br>
                                    <button id="${newQuoteObject.id}" class='btn-success'>Likes: ${newQuoteObject.likes}<span>0</span></button>
                                    <button id="${newQuoteObject.id}" class='btn-danger'>Delete</button>
                                    <button id="${newQuoteObject.id}" class='edit'>Edit</button>
                                  </blockquote>
                                </li>`
      })
    })

    // DELETE & LIKE LOGIC
    quoteList.addEventListener('click', (e) => {
      // specify the delete button
      if (e.target.className === 'btn-danger') { // DELETE
        let quoteToDeleteID = e.target.id // use this to find the quote on page and delete it
        // OPTIMISTCALLY RENDER THE DELETE
        let deleteMe = document.getElementById(`quote-${quoteToDeleteID}`)
        deleteMe.remove() // off of page without refresh --> NOW hit the server and use the id we have in order to fetch to specific quote's show page
        fetch(`http://localhost:3000/quotes/${quoteToDeleteID}`, { method: 'DELETE' })
      } else if (e.target.className === 'btn-success') { // LIKE
        let likedQuoteID = e.target.id
        // OPTIMISTICALLY RENDER LIKE INCREASE
        // FIND ELEMENT ON PAGE
        let likedQuote = document.getElementById(`quote-${likedQuoteID}`)
        let likesText = likedQuote.querySelector('.btn-success').innerText
        let likesCtr = parseInt(likesText.split(' ')[1])
        let incrementedLikes = likesCtr + 1 // send in the patch
        // now update the dom with this incrementedLikes variable
        let tagToEdit = likedQuote.querySelector('.btn-success')
        tagToEdit.innerHTML = `Likes: ${incrementedLikes}<span>0</span>`
        // now hit the server
        fetch(`http://localhost:3000/quotes/${likedQuoteID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            "likes": incrementedLikes
          })
        })
      } else if (e.target.className === 'edit') { // EDIT
        let quoteToEditID = e.target.id
        editForm.dataset.id = e.target.id
        // now change edit form's hidden value to false and hide the new quote form
        newQuoteForm.hidden = true
        editForm.hidden = false
        // send the previous values of quote and author to populate editForm fields
        // we have the fields above
        // find the quote on the page to get the data to populate form fields
        let foundQuote = document.getElementById(`quote-${quoteToEditID}`)
        editQuoteField.value = foundQuote.querySelector('p').innerText
        editAuthorField.value = foundQuote.querySelector('.blockquote-footer').innerText
      }
    })

    editForm.addEventListener('submit', (e) => {
      e.preventDefault()
      let editMeID = e.target.dataset.id
      let quoteForPatch = editQuoteField.value
      let authorForPatch = editAuthorField.value
      fetch(`http://localhost:3000/quotes/${editMeID}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json', Accept: 'application/json'
        },
        body: JSON.stringify({
          "quote": quoteForPatch,
          "author": authorForPatch
        })
      })
      .then(r => r.json())
      .then(updatedObject => {
        let targetQuote = document.getElementById(`quote-${editMeID}`)
        targetQuote.querySelector('p').innerText = quoteForPatch
        targetQuote.querySelector('.blockquote-footer').innerText = authorForPatch
      })
      e.target.reset()
    })

    filterButton.addEventListener('click', (e) => {
      if (e.target.innerText === 'ON') {
        e.target.innerText = 'OFF'
        quoteList.innerHTML = ''
        // render normally
        fetch(quotesURL) // { method: 'GET' } is DEFAULT
          .then(r => r.json())
          .then(arrayOfQuoteObjects => {
            arrayOfQuoteObjects.forEach((quoteObject) => {
              quoteList.innerHTML += `<li id="quote-${quoteObject.id}" class='quote-card'>
                                        <blockquote class="blockquote">
                                          <p class="mb-0">${quoteObject.quote}</p>
                                          <footer class="blockquote-footer">${quoteObject.author}</footer>
                                          <br>
                                          <button id=${quoteObject.id} class='btn-success'>Likes: ${quoteObject.likes}<span>0</span></button>
                                          <button id="${quoteObject.id}" class='btn-danger'>Delete</button>
                                          <button id="${quoteObject.id}" class='edit'>Edit</button>
                                        </blockquote>
                                      </li>`
            })
          })

      } else if (e.target.innerText === 'OFF') {
        e.target.innerText = 'ON'
        // filter is ON so render alphabetical list
        fetch(quotesURL) // { method: 'GET' } is DEFAULT
          .then(r => r.json())
          .then(arrayOfQuoteObjects => {
            let dataStore = arrayOfQuoteObjects
            let alphabetizedByAuth = dataStore.sort(function(a,b) {
              return a.author.localeCompare(b.author);
            })
            let jsonAsHTML = alphabetizedByAuth.map((quote) => {
              return `<li id="quote-${quote.id}" class='quote-card'>
                                        <blockquote class="blockquote">
                                          <p class="mb-0">${quote.quote}</p>
                                          <footer class="blockquote-footer">${quote.author}</footer>
                                          <br>
                                          <button id=${quote.id} class='btn-success'>Likes: ${quote.likes}<span>0</span></button>
                                          <button id="${quote.id}" class='btn-danger'>Delete</button>
                                          <button id="${quote.id}" class='edit'>Edit</button>
                                        </blockquote>
                                      </li>`
            })
            quoteList.innerHTML = jsonAsHTML.join('')
          }) // end then
      } // end if statement
    })







}) // DOMContentLoaded
