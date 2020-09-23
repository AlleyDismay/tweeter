/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  formSubmission();
  loadTweets();
  $(".old-tweet").css("display", "none");
  $("img").on('click', () => $("header > img").css("transform", `matrix(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`));
});

//
// Overrides default form functionality so it doesn't go to a new page when you submit it.
//
// Note: Arrow functions don't have its own bindings to "this" or "super", and should not be used as methods.x

function formSubmission() {
  $("form").on('click', () => {
    event.preventDefault();
    $.ajax({
      url: "tweets",
      method: "POST",
      data: $("form").serialize(),
    });
    $.ajax({
      url: 'http://localhost:8080/tweets',
      dataType: "json"
    }).done((tweets) => renderTweet(tweets.pop()));
  });
}

function loadTweets() {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    dataType: "json"
  }).done((tweets) => renderTweets(tweets))
}

//
// This takes a Tweet object and returns the HTML to be presented.
//

function renderTweet({user, content, created_at}) {

  const htm = $(".old-tweet").html()
    .replace("=\"/images/profile-hex.png",
             `=\"${user["avatars"]}`)
    .replace("Display Name", user["name"])
    .replace("Handle", user["handle"])
    .replace("Text", escape(content["text"]))
    .replace("Post Time", created_at);
    
  const articleOldHtm = "<article class='old-tweet'>"+htm+"</article>";
  console.log("old article", articleOldHtm);
  
  const articleNewHtm = articleOldHtm.replace("old", "new");
  console.log("new article", articleNewHtm);

  // const sectionHtm = "<section class='old-tweets'>"+articleOldHtm+"</section>"
  // TODO: Investigate why console.logs change when prepend-ing different variables.

  $(".old-tweets").prepend(articleNewHtm)
}

function renderTweets(tweets) {
  for (tweet of tweets) {
    renderTweet(tweet);
  };
}

function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}