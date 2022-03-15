const apiUrl = "https://api.github.com/users/";
const sBtn   = document.querySelector("#search-btn");
const sText   = document.querySelector("#search-text");
const mainContent = document.querySelector(".content")


getUser("ahmedtahoon1")

async function getUser(userName) {

    const user = await fetch(apiUrl + userName);

    const userData = await user.json();

    createUserCard(userData);

    getRepos(userName);
}

async function getRepos(userName) {

    const userRepo = await fetch(apiUrl + userName + "/repos");

    const userRepoData = await userRepo.json();

    addRepos(userRepoData);
}

function createUserCard(userInfo) {
    const userCard= 
    `<div class ="avatar">
        <a href="${userInfo.html_url != undefined ? userInfo.html_url:"#"}" target="_blank">
        <img src="${userInfo.avatar_url != undefined ? userInfo.avatar_url : "1.jpg"}" alt="${userInfo.name != undefined ?userInfo.name:"NO User"}">
        </a>
        </div>
        <div class="info">
            <h3 class="name">${userInfo.login != undefined ?userInfo.login:"NO User"}</h3>
            <p class="userdesc">${userInfo.bio != undefined ?userInfo.bio:"NO BIO"}</p>
            <ul class="details">
                <li class="followers">${userInfo.followers != undefined ?userInfo.followers:"0"}<strong> Follwers</strong></li>
                <li class="following">${userInfo.following != undefined ?userInfo.following:"0"}<strong> Follwing</strong></li>
                <li class="repo-n">${userInfo.public_repos != undefined ?userInfo.public_repos:"0"}<strong> Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>`;

    mainContent.innerHTML=userCard;
}

function addRepos(repos) {
    const reposElement = document.getElementById("repos");
    //لإظهار الريبو بالترتيب الذي أريد
    repos.sort((a,b)=> b.stargazers_count -a.stargazers_count).slice(0,10).forEach(repo => {
        const repoParent = document.createElement("div");
        repoParent.classList.add("repo");
        const repoElement = document.createElement("a");
        repoElement.href = repo.html_url;
        repoElement.target="_blank";
        repoElement.innerHTML = repo.name;
    
        const repoStars = document.createElement("span");
        repoStars.classList.add("repo-stars");
        repoStars.innerHTML = repo.stargazers_count + "  Star/s";

        repoParent.appendChild(repoElement);
        repoParent.appendChild(repoStars);

        reposElement.appendChild(repoParent);
    });

}


sBtn.addEventListener("click",()=>{
    const user = sText.value;
    console.log(user);
    if(user){
        if(user == undefined){
            getUser("ahmedtahoon1");
        }
        else{
            getUser(user);
        }     
    }else{
        getUser("ahmedtahoon1")
    }
});


