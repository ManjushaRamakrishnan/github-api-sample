this.accessToken = "9e3f9ef87bee6bdbcf7a729d928a338d6759652d"; //Personal Access Token generated from GitHub
this.elementId = null;
/**
 * Name:getPublicRepoCount
 * function to get and print the list of public repositories of a given user calling GitHub API
 */
function getPublicRepoCount() {
  /**
   * Name: printPublicRepoCount
   * function to print the list of public repositories from the GitHub API response
   */
  function printPublicRepoCount() {
    var responseObj = JSON.parse(this.responseText);
    var repoListDiv = document.getElementById("repoListSection");
    //remove any existing children of div
    while (repoListDiv.firstChild) {
      repoListDiv.removeChild(repoListDiv.firstChild);
    }
    if( this.status === 200 || this.status === 400 ) {
      for( var i = 0; i < responseObj.length; i++ ) {
        var div = document.createElement("div");
        div.setAttribute("class", "user-repo");
        var para = document.createElement("p");
        var node = document.createTextNode(responseObj[i].name);
        para.appendChild(node);
        var button = document.createElement("button");
        button.setAttribute("id", responseObj[i].name);
        button.setAttribute("onclick", "displayIssueForm(this)");
        button.innerHTML = "New Issue";
        div.appendChild(para);
        div.appendChild(button);
        repoListDiv.appendChild(div);
      }
    } else {
      var para = document.createElement("p");
      var node = document.createTextNode("API error - " + responseObj.message);
      para.appendChild(node);
      repoListDiv.appendChild(para);
    }  
    document.getElementById("repoList").style.display = "block";
  }

  //blackmiaool

  //GitHub API request object creation
  var userName = document.getElementById("username").value;
  if( !userName ) {
    alert("Please enter a valid username.")
  } else {
    this.userName = userName;
    var request = new XMLHttpRequest();
    request.onload = printPublicRepoCount;
    request.open('get', 'https://api.github.com/users/'+userName+'/repos', true);
    request.send();
  }  
}

/**
 * Name: createNewIssue
 * function to create a new issue against the selected user repository using GitHub API call
 */
function createNewIssue() {
  /**
   * Name: printIssueData
   * Function to print the success message with issue number on successful creation of the issue
   */
  function printIssueData() {
    var responseObj = JSON.parse(this.responseText);
    var repoListDiv = document.getElementById("repoListSection");
    var para = document.createElement("p");
    var node = document.createTextNode("Issue #" + responseObj.number + " created");
    para.appendChild(node);
    var repoListDiv = document.getElementById("repoListSection");
    repoListDiv.appendChild(para);
    hideIssueForm();
  }
  var issueData = JSON.stringify({
    title : document.getElementById('issueTitle').value,
    body : document.getElementById('issueDescription').value
  });

  var request = new XMLHttpRequest();
  request.open("POST", "https://api.github.com/repos/"+this.userName+"/"+this.elementId+"/issues?access_token="+this.accessToken, true);
  request.onload = printIssueData;
  request.setRequestHeader("Content-type", "application/json");
  request.send(issueData);
}

function displayIssueForm(element) {
  this.elementId = element.id;
  document.getElementById("issueCreationForm").style.display = "block";
}

function hideIssueForm(element) {
  this.elementId = null;
  document.getElementById("issueCreationForm").style.display = "none";
}