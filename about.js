const container = document.getElementsByClassName("container-fluid")[0]
console.log(container);
const btnC= document. querySelector(".btnC"); 

const ashleighsUsername = "shss933"
const codysUsername = "CodyCreatesCode" 
fetch (`https://api.github.com/users/${ashleighsUsername}`) 
    .then(response => { 
        return response.json()
    }) 
    .then(data => {
        console.log(data);
    const card = document.createElement("div")
    card.classList.add("card") 
    card.style.width="18rem"
     card.innerHTML = `
     <img src="https://avatars.githubusercontent.com/u/127452030?v=4" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button id="btnA">
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </button>
        </div>
     `   
     container.appendChild(card)
     
    } ) 
    .catch(handleError) 

    function handleError(err) {
        console.log(err)
    } 

    fetch (`https://api.github.com/users/${codysUsername}`) 
    .then(response => { 
        return response.json()
    }) 
    .then(data => {
        console.log(data);
    const card = document.createElement("div")
    card.classList.add("card") 
    card.style.width="18rem"
     card.innerHTML = `
     <img src="https://avatars.githubusercontent.com/u/22103697?v=4" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button id="btnA">
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </button>
        </div>
     `   
     container.appendChild(card)
     
    } ) 
    .catch(handleError) 