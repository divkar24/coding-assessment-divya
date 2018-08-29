jQuery("#creditsbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(
"<p>" + "</p>" + "<div>" + "<p>"+"&nbsp;"+"&nbsp;"+"&nbsp;"+"&nbsp;"+
"&nbsp;"+"&nbsp;"+"&nbsp;"+"&nbsp;"+"game created by divya kartik" + "</p>"+ "</div>"
);
});

jQuery("#helpbtn").on("click", function() {
jQuery("#content").empty();
jQuery("#content").append(
"<p>" + "</p>" +
 "<ul>"+
  "<li>" +
    "use the ARROW KEYS or WASD to move around" +
  "</li>" +
  "<li>" +
    "hold the key down to keep moving" +
  "</li>" +
  "<li>" +
    "the GREEN mushrooms INCREASE your score by 5" +
  "</li>" +
  "<li>" +
    "the RED mushrooms DECREASE your score by 5" +
  "</li>" + "<li>" +
    "the FLOWERS square root your score" +
  "</li>" +
"</ul>"
);
});
