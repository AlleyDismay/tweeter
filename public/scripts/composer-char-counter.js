$(document).ready(
  
  $("textarea").on('keyup', function () {

    const counter = $(this).parent().next().children().last();

    counter.html(140 - $(this).val().length);

    if ($(this).val().length > 140) {
      counter.css("color", "red");
      counter.prev().attr("disabled", "");
    }
    else {
      counter.css("color", "black");
      counter.prev().removeAttr("disabled");
    }
  })
);