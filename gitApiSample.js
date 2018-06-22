  function printRepoCount() {
    var responseObj = JSON.parse(this.responseText);
    var repoListDiv = document.getElementById("repoListSection");
    for( var i = 0; i < responseObj.length; i++ ) {
        console.log( responseObj[i].name );
        var para = document.createElement("p");
        var node = document.createTextNode(responseObj[i].name);
        para.appendChild(node);
        repoListDiv.appendChild(para);
    }
    //console.log(responseObj.name + " has " + responseObj.public_repos + " public repositories!");
  }

  function sendRepoRequest() {
    var request = new XMLHttpRequest();
    request.onload = printRepoCount;
    request.open('get', 'https://api.github.com/users/funchal/repos', true);
    request.send();
  }

  //https://api.github.com/users/funchal