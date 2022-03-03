let addToy = false;
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  // fetch the data 
  function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(function(data) {
    data.map(t => renderToy(t))
  })
  }
  fetchToys()


  function renderToy(toy) {
    const toyInfo = 
      `<div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes}</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
      </div>`
    
    toyCollection.innerHTML += toyInfo
  }

  toyForm.addEventListener('submit', function() {
    event.preventDefault();
    //grab inputs from form
    const toyName = event.target.name.value
    const toyImage = event.target.image.value
    //now send the data to the database:
    fetch('http://localhost:3000/toys', {
      method: "POST", 
      headers: {
        "Content-Type" : "application/json", 
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0, 
      })
     })
     .then(response => response.json())
     .then(newToy => {
       //fetch updated the database
       //now update the DOM
       //convert newToy from JSON to html in order to add to the DOM
       let newToyHTML = `<div class="card">
       <h2>${newToy.name}</h2>
       <img src=${newToy.image} class="toy-avatar" />
       <p>${newToy.likes} Likes</p>
       <button class="like-btn" id="${newToy.id}">Like ❤️</button>
     </div>`

     toyCollection.innerHTML += newToyHTML
     })
  })

  toyCollection.addEventListener("click", (e) => {
    //adds the new likes to the DOM
    if(e.target.className === "like-btn") {
      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      let moreLikes = currentLikes + 1
      e.target.previousElementSibling.innerText = moreLikes;

      //send PATCH request to serves
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type" : "application/json", 
          "Accept" : "application/json"
        },
        body: JSON.stringify({
          likes: moreLikes
        })
      })
      
    }
  })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
