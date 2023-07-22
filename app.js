let url = "https://api.github.com/users";

let search = document.getElementById("search");
let searchbtn = document.getElementById("searchbtn");
let profilecontainer = document.getElementById("profile-container");
let loading = document.getElementById("loading");

let main = document.querySelector(".main");
let darkmode = document.getElementById("darkmode");
let lightmode = document.getElementById("lightmode");

darkmode.addEventListener("click", () => {
  main.classList.add("darkmode");
  darkmode.classList.add("no-display");
  lightmode.classList.remove("no-display");
});

lightmode.addEventListener("click", () => {
  main.classList.remove("darkmode");
  darkmode.classList.remove("no-display");
  lightmode.classList.add("no-display");
});

// generate profile of users
let generateprofile = (profile) => {
  return `
    <div class="card">
            <div class="head">
              <div class="left">
                <div class="user-icon">
                  <img src="${profile.avatar_url}" alt="" />
                </div>
                <div class="user-info">
                  <h2>${profile.name}</h2>
                  <p>${profile.login}</p>
                </div>
              </div>
              <div class="link">
                <a href="${profile.html_url}" target="_blank">Check Profile</a>
              </div>
            </div>
            <div class="about">
              <h2>About</h2>
              <p>${profile.bio}</p>
            </div>
            <div class="status">
              <div class="status-item">
                <h2>Followers</h2>
                <p>${profile.followers}</p>
              </div>
              <div class="status-item">
                <h2>Following</h2>
                <p>${profile.following}</p>
              </div>
              <div class="status-item">
                <h2>Repository</h2>
                <p>${profile.public_repos}</p>
              </div>
            </div>
          </div>
    
    `;
};

// fetch users
let fetchuser = async () => {
  let username = search.value;

  loading.innerText = "Loading....";

  try {
    let response = await fetch(`${url}/${username}`);
    let data = await response.json();
    if (data.login) {
      loading.innerText = "";
      profilecontainer.innerHTML = generateprofile(data);
    } else {
      loading.innerText = data.message;
      loading.style.color = "red";
      profilecontainer.innerText = "";
    }
  } catch (error) {
    console.log(error);
    loading.innerText = "";
  }
};

searchbtn.addEventListener("click", fetchuser);
