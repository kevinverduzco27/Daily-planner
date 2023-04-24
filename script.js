var saveButtons = document.querySelectorAll(".saveBtn");
var today = dayjs();
var currentHour = dayjs().hour()
console.log(currentHour)

$("#currentDay").text(today.format("dddd, MMMM, D"));

saveButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    // Get the text content and the id of the corresponding textarea element
    var textContent = button.parentNode.querySelector(".description").value;
    var id = button.parentNode.getAttribute("id");

    // Save the text content to local storage with the id as the key
    localStorage.setItem(id, textContent);
  });
});

// Retrieve the saved content
for (var i = 9; i <= 17; i++) {
  var id = "hour-" + i;
  var savedContent = localStorage.getItem(id);
  if (savedContent !== null) {
    document.getElementById(id).querySelector(".description").value = savedContent;
  }
};
// turned into a function so that it can be set to an interval 
function updateHourClasses() {

  // loop through each hour block and update class
  $(".time-block").each(function() {
    const blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

// update classes every second hopefully
setInterval(updateHourClasses, 1000);