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

function renderTweet(tweet) {

  const htm = $(".old-tweet").html().replace("<img class=\"avatar\" alt=\"User's Avatar\" src=\"/images/profile-hex.png", `<img class=\"avatar\" alt=\"User's Avatar\" src=\"${tweet["user"]["avatars"]}`).replace("Display Name", tweet["user"]["name"]).replace("Handle", tweet["user"]["handle"]).replace("Text", escape(tweet["content"]["text"])).replace("Post Time", tweet["created_at"]);
  const ahtm = "<article>"+htm+"</article>";
  $(".old-tweets").prepend(ahtm);
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