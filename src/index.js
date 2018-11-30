document.addEventListener('DOMContentLoaded', () => {
  const controller = new DOMController

  Quote.populateFromAPI()
    .then(() => {
      controller.render()
    })
})