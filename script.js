$(document).ready();

// Event Handlers: 
$('.elTime').text(`Current date:  ${headerTime()}`); 
bgColorChanger(); 
getLocalValues();


// Main Function:
$(function () {
  $(".saveBtn").on("click", saveBtnClick);
  getCurrentTime();
});

// Helper Functions: 
function headerTime() {
  var hTime = dayjs().format("dddd, MMMM DD, YYYY");
  return hTime;
}

function getCurrentTime() {
  var currentTime = dayjs().format("H:mm:ss");
  return currentTime;
}

function bgColorChanger() { 
  $(".row").each(function () {
    
    var currentTime = dayjs().format("H");
    var timeBlockTime = parseInt($(this).attr("id").split("hour")[1]); 

    if (timeBlockTime < currentTime) {
      $(this).removeClass("present", "future");
      $(this).find(".description").addClass("past");
    } else if (timeBlockTime > currentTime) {
      $(this).removeClass("past", "present");
      $(this).find(".description").addClass("future");
    } else {
      $(this).removeClass("past", "future");
      $(this).find(".description").addClass("present");
    }
  })
}

function saveBtnClick() {
  var userObj = {}; 

  var timeBlockId = $(this).parent().attr("id"); 
  var userInput = $(this).parent().find(".description").val(); 

  console.log('timeBlockId: ' + timeBlockId + ',\n' + 'userInput: ' + userInput)

  var userObjString = localStorage.getItem("userObj");
  var userObj = userObjString ? JSON.parse(userObjString) : {};

  userObj[timeBlockId] = userInput; 

  localStorage.setItem("userObj", JSON.stringify(userObj));

};

function getLocalValues() {
  
  var localArr = JSON.parse(localStorage.getItem("userObj")) || [];
  
  $('[id]').each(function () {
    console.log('1. this: ', this);
   
    var key = this.id;
    var value = localArr[key];
    console.log('2. key: ', key); 
    console.log('3. value: ', value);
    
    $(this).find(".description").append(value || '');

  })
}