$(function() {
  if ($(window).width() > 960) {
    $("#wrapper").addClass("toggled")
    // $("#wrapper, #sidebar-wrapper").addClass("transition")
  }

  $(".toggle-menu").on("click", function() {
    $("#wrapper").toggleClass("toggled")
  })
});
