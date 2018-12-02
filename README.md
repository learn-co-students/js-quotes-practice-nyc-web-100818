## Hello, let's build a simple app that allows us to keep track of our favorite quotes and who said it.  

If you don't have json-server installed, run `$ npm i -g json-server`.  
If you already have it installed, run the server by: `$ json-server --watch db.json`.

### Deliverables
* Populate page with quotes with a `GET` request to `http://localhost:3000/quotes`.

* Each quotes should have the following structure:
  ```
    <li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer class="blockquote-footer">Someone famous</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>
  ```
* Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page. (Whether you choose to optimistically render or not is up to you).
- need a SUBMIT event on the form
- must PREVENT DEFAULT on submit events bc forms try to post!

* Clicking the delete button should delete the respective quote from the database and remove it from the page without having to refresh.
- click event on the delete button
- listen for the event on the parent container which is the quotelist and check if classname is btn-danger --> if so, then delete and carry over quote id
- OPTIMISTICALLY RENDER THIS!

* Clicking the like button will increase the number of likes for this particular comment in the database and on the page without having to refresh.
- click event for the like button --> put click event on parent (quoteList) again to event delegate --> means u can place this logic inside same event listener
- give the like button the quote's id to help later on
- OPTIMISTICALLY RENDER THE CHANGE


### BONUS
* Add an edit button to each quote-card that will allow the editing of a quote. _(Hint: there is no 'correct' way to do this. You can try creating a hidden form that will only show up when hitting the edit button.)_
- click event on the edit button but can place in logic with delete and like
- that edit button should hold the quote's id

* Add a sort button on the page that I can toggle on and off that will sort the list of quotes by author name.
- click event for sort button that toggles its text AND renders sorted/unsorted data
- if it's ON --> render quotes filtered by author name
- if it's OFF then just render normally
