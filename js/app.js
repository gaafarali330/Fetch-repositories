let input = document.getElementById('input');
let getBtn = document.getElementById('get-btn');
let repoData = document.getElementById('repo-data');
let numbersOfRepo = document.querySelector('.numbersOfRepo')


getBtn.onclick = function() {
    getAllRepos()
}

function getAllRepos() {
    let inputValue = input.value;
    let url = `https://api.github.com/users/${inputValue}/repos`;
    // check if there is an input from the user
    if (inputValue == '' || inputValue == ' ') {
        console.log('stop');
    } else {
        console.log('stop');
        // now make our http request to get data from github
        fetch(url)
            .then((repositories) => repositories.json())
            .then((repositoriesdata) => {
                // make the div empty
                repoData.innerHTML = '';
                // in the case of the username is not found
                if (repositoriesdata.length == undefined) {
                    numbersOfRepo.innerHTML = `there are no repos, please check the user name`;
                } else {
                    // show the number of exsiting repos
                    numbersOfRepo.innerHTML = `${repositoriesdata.length} was found`;
                    // loop over all repos
                    repositoriesdata.forEach(repo => {
                        // create the outer div 
                        let repoDiv = document.createElement('div');
                        repoDiv.classList += 'one-repo';
                        let repoTitle = document.createTextNode(`${repo.name}`);
                        let repoheading = document.createElement('h2')
                        repoheading.appendChild(repoTitle);
                        let repoDesciption = document.createElement('p')
                        let repoDesciptionData = repo.description;
                        if (repoDesciptionData == null) {
                            repoDesciptionData = 'there is no descriptiopn'
                        }
                        // repo description
                        let repoDesciptionext = document.createTextNode(`${repoDesciptionData}`);
                        // repo url element
                        let repoUrl = document.createElement('a');
                        let repoUrlText = document.createTextNode('link')
                        repoUrl.appendChild(repoUrlText)
                            // repo url value from api
                        repoUrl.href = repo.html_url;
                        repoDesciption.appendChild(repoDesciptionext)
                        repoDiv.appendChild(repoheading);
                        repoDiv.appendChild(repoDesciption);
                        repoDiv.appendChild(repoUrl)
                        repoData.appendChild(repoDiv);
                    });
                }
            })
    }
}

//