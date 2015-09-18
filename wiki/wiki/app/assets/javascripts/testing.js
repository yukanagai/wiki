$(function() {

  $("#signature").click(function(){
    console.log("bouncing");
    $(this).effect( "bounce", {times:3}, 300 );
  });

})
