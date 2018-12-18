// // It might be a good idea to add event listener to make sure this file 
// // only runs after the DOM has finshed loading. 
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c help im trapped in a loaded browzur', 'color: yellow')

    const url = 'http://localhost:3000/quotes'
    let allQuotes = []
    const quoteList = document.getElementById('quote-list')
    const quoteForm = document.querySelector('#new-quote-form')
    const editBtn = document.querySelector('.editBtn')
    
    fetch(url)
        .then(res => res.json())
        .then(json => {
            allQuotes = json
            renderAll(allQuotes)
        })


    function renderQuote(quote) {

        quoteList.innerHTML += `
        <li data-id='${quote.id}' class='quote-card'>
            <blockquote class="blockquote">
            <p class="mb-0 quoteEdit">${quote.quote}</p>
            <footer class="blockquote-footer authorEdit">${quote.author}</footer>
            <br>
            <form style="display:none;" class="hidden-edit-form">
                <input type="text" id="edited-quote" value="${quote.quote}"></input>
                <input type="text" id="edited-author" value="${quote.author}"></input>
                <button id="edit-submit">Submit</button>
            </form>
            <button class='btn-success quoteBtn' data-action='like'>Likes: <span data-id='${quote.id}'>${quote.likes}</span></button>   ||   
            <button class='btn-danger quoteBtn' data-delete-id="${quote.id}" data-action='delete'>Delete</button>  ||   
            <button class='quoteBtn editBtn' data-edit-id="${quote.id}" data-action='edit'>Edit</button>
            </blockquote>
        </li>
    `
    }

    function renderAll(data) {
        data.map(renderQuote).join('')
    }

    quoteForm.addEventListener('submit', createQuote)

    function createQuote(e) {
        e.preventDefault()
        let newQuote = e.target.querySelector('#author').value
        let newAuthor = e.target.querySelector('#new-quote').value

        const data = {
            "quote": newQuote,
            "author": newAuthor,
            "likes": 0
        }

       
        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(newData => {
                allQuotes.push(newData)
                renderQuote(newData)
                quoteForm.reset()
            })
    }


    // // ? check if ids match target/quote.id ?
    quoteList.addEventListener('click', e => {
        
       
        let targetQuoteLi = e.target.parentElement.parentElement
        let targetData = e.target.dataset
                // const foundQuote = allQuotes.find(quote => quote.id == targetQuoteLi.id)
                // console.log(foundQuote)

        if (targetData.action === 'delete') {
            let deleteId = targetData.deleteId
            targetQuoteLi.remove()
            allQuotes = allQuotes.filter(q => q.id != deleteId)

            fetch(`${url}/${deleteId}`, {
                method: 'DELETE'
            })
//optimistic
        } else if (targetData.action === 'like') {
            
            let likeSpan = e.target.querySelector('span')
            let likeId = likeSpan.dataset.id
            
            const updatedLikes = parseInt(likeSpan.textContent) + 1
            
            fetch(url + `/${likeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "likes": updatedLikes
                })

            }).then(likeSpan.textContent = updatedLikes)
            
        }
        // else if(targetData.action === 'edit'){
        //     const editForm = document.querySelector('.hidden-edit-form')

        //     editForm.dataset.id = e.target.dataset.id
        //     const editQuoteInput = document.querySelector('#edited-quote')
        //     const editAuthorInput = document.querySelector('#edited-author')
        //     document.querySelector(".hidden-edit-form").style.display=""
        //     const foundQuote = allQuotes.find(q => q.id === parseInt(e.target.dataset.id))

        //     editQuoteInput.value = foundQuote.quote
        //     editAuthorInput.value = foundQuote.author
            
        // }
        })
    
        // quoteList.addEventListener('submit', e => {
        //     e.preventDefault()
        //     const editQuote = e.target.querySelector('#edited-quote').value
        //     const editAuthor = e.target.querySelector('#edited-author').value

        //     fetch(url + `/${e.target.dataset.id}`, {
        //         method: 'PATCH',
        //         headers: {
        //             "Content-Type": "application/json", //type of data being sent
        //             "Accept": "application/json" //type of data I (the client) want back
        //         },
        //         body: JSON.stringify({
        //             "quote": editQuote,
        //             "author": editAuthor,
                    
        //             })
        //     })
        //     .then(r => r.json())
        //     .then(updatedQuote => {
        //         const updatedQIdx = allQuotes.findIndex(q => q.id == updatedQuote.id)
        //         allQuotes[updatedQIdx] = updatedQuote
        //         renderAll(allQuotes)
        //     })
        // })

    

})