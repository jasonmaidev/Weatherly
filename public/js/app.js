console.log('client side js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('p1')
const messageTwo = document.getElementById('p2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  if (location.length === 0) {
    alert('Please enter a location')
    messageOne.textContent = ''
  } else {
    fetch('/weather?address=' + location)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setTimeout(() => {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
          }, "2000")
        } else {
          setTimeout(() => {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
          }, "1000")
        }
      })
  }
  search.value = ''
})

