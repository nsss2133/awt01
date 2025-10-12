$(document).ready(function () {
  // 1. Add a class
  $("#addClassBtn").click(function () {
    $("#text").addClass("highlight");
  });

  // 2. Show position of element
  $("#positionBtn").click(function () {
    let pos = $("#positionText").position();
    alert("Top: " + pos.top + ", Left: " + pos.left);
  });

  // 3. Animate multiple CSS properties
  $("#animateBtn").click(function () {
    $("#animateBox").animate({
      left: "+=100px",
      top: "+=50px",
      width: "150px",
      height: "150px",
      opacity: 0.7
    }, 1000);
  });
});
