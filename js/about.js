const container = document.getElementsByClassName("profile")[0];
console.log(container);
const btnC = document.querySelector(".btnC");

const ashleighsUsername = "shss933";
const codysUsername = "CodyCreatesCode";
fetch(`https://api.github.com/users/${ashleighsUsername}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const card = document.createElement("div");
    card.innerHTML = `
       <div class="card m-5" style="border-radius: 15px;">
    <div class="card-body p-4">
      <div class="d-flex text-black">
        <div class="flex-shrink-0">
          <img src="https://avatars.githubusercontent.com/u/127452030?v=4"
            alt="Generic placeholder image" class="img-fluid"
            style="width: 180px; border-radius: 10px;">
        </div>
        <div class="flex-grow-1 ms-3">
          <h5 class="mb-1">${data.login}</h5>
          <p class="mb-2 pb-1" style="color: #2b2a2a;">${data.bio}</p>
          <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
            style="background-color: #efefef;">
            <div>
              <p class="small text-muted mb-1">Articles</p>
              <p class="mb-0">41</p>
            </div>
            <div class="px-3">
              <p class="small text-muted mb-1">Followers</p>
              <p class="mb-0">976</p>
            </div>
            <div>
              <p class="small text-muted mb-1">Rating</p>
              <p class="mb-0">8.5</p>
            </div>
          </div>
          <div class="d-flex pt-1">
            <button type="button" class="btn btn-outline-primary me-1 flex-grow-1">Chat</button>
            <button type="button" class="btn btn-primary flex-grow-1">Follow</button>
          </div>
        </div>
      </div>
    </div>
  </div>
     `;
    container.appendChild(card);
  })
  .catch(handleError);

function handleError(err) {
  console.log(err);
}

fetch(`https://api.github.com/users/${codysUsername}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card m-5" style="border-radius: 15px;">
    <div class="card-body p-4">
      <div class="d-flex text-black">
        <div class="flex-shrink-0">
          <img src="https://avatars.githubusercontent.com/u/22103697?v=4"
            alt="Generic placeholder image" class="img-fluid"
            style="width: 180px; border-radius: 10px;">
        </div>
        <div class="flex-grow-1 ms-3">
          <h5 class="mb-1">${data.login}</h5>
          <p class="mb-2 pb-1" style="color: #2b2a2a;">${data.bio}</p>
          <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
            style="background-color: #efefef;">
            <div>
              <p class="small text-muted mb-1">Articles</p>
              <p class="mb-0">41</p>
            </div>
            <div class="px-3">
              <p class="small text-muted mb-1">Followers</p>
              <p class="mb-0">976</p>
            </div>
            <div>
              <p class="small text-muted mb-1">Rating</p>
              <p class="mb-0">8.5</p>
            </div>
          </div>
          <div class="d-flex pt-1">
            <button type="button" class="btn btn-outline-primary me-1 flex-grow-1">Chat</button>
            <button type="button" class="btn btn-primary flex-grow-1">Follow</button>
          </div>
        </div>
      </div>
    </div>
  </div>
     `;
    container.appendChild(card);
  })
  .catch(handleError);
