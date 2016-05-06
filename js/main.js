console.log($)


var baseURL = "https://api.github.com/users/"
var profURL = baseURL + 'mwinstonch'
//var token = "access_token=4e138d16656aac0309a31416c71b72f436de61ea"
var fullURL = profURL  + "?" //+ token

var searchBox = document.querySelector(".search")

var promise = function(url) {
	return $.getJSON(url)
}


var repoURL = profURL + '/repos'// + '?' + token
var userRepoPromise = $.getJSON(repoURL)

var container = document.querySelector(".contains-left")

var repoContainer = document.querySelector(".repo")

var profileHTML = function(query) {
	console.log(query)
	var htmlString = ""
	htmlString = '<img class="avatar" src="' + query.avatar_url + '">\
		<h1 class="name">' + query.name + '</h1>\
		<h2 class="login">' + query.login + '</h2>\
		<HR>\
		<span class="list"><i class="material-icons md-18">room</i> ' + query.location + '</span>\
		<span class="list"><i class="material-icons md-18">mail_outline</i> ' + query.email + '</span>\
		<HR>'
	container.innerHTML = htmlString
	return htmlString
}


var repoHTML = function(obj) {
	console.log(obj)
	var repoString = ""
	var repoString = '<div class="repoDiv">\
	    			 <span>' + obj.name + '</span>\
                     <span class="rightRepo">JavaScript <i class="material-icons md-18">grade</i></span></div>'
	repoContainer.innerHTML = repoString
	return repoString
}

var queryOnEnterKey = function(event) {
	if(event.keyCode === 13) {
		var inputEl = event.target
		var query = inputEl.value
		window.location.hash = query
		inputEl.value = ""
	}
}


var changeUser = function(query){
    var profileURL = baseURL + query
    var userPromise = $.getJSON(profileURL)
    userPromise.then(profileHTML)
    var repoURL = profileURL + '/repos'
    var userRepoPromise = $.getJSON(repoURL)
    userRepoPromise.then(reposHTML)
}

var reposHTML = function(jsonData) {
	var repoArray = jsonData
	console.log(jsonData)
	var totalHtmlString = ''
	for(var i = 0; i < repoArray.length; i++){
	    var repo = repoArray[i]
	    console.log(repo)
	    totalHtmlString += repoHTML(repo)
	}
	repoContainer.innerHTML = totalHtmlString
}

var controller = function(){
	console.log(window.location.hash)
	if (window.location.hash === "#home"){
		document.querySelector('.container').innerHTML = "<h1>HOME PAGE</h1>"
	} else {
    var userName = window.location.hash.substring(1)
    changeUser(userName)
	}
}

// runs when user types in input box
searchBox.addEventListener('keydown',queryOnEnterKey)

// runs when there is a new value in window.location.hash
window.addEventListener('hashchange',controller)

// ssearch(window.location.hash.substring(1))

// runs once and only once
promise(fullURL).then(profileHTML)
promise(repoURL).then(reposHTML)
