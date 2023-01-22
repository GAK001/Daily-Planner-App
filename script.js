var currentDay = document.getElementById("currentDay");
var clearBtn = document.getElementById("clearBtn");

// Display current day
currentDay.textContent = moment().format("dddd, MMMM Do");

var hourArr = [
  "9AM",
  "10AM",
  "11AM",
  "12PM",
  "13PM",
  "14PM",
  "15PM",
  "16PM",
  "17PM",
];

// For loop to create rows for each hour
for (var i = 0; i < hourArr.length; i++) {
  var timeRow = document.createElement("div");
  timeRow.className = "row time-block";
  timeRow.setAttribute("data-time", hourArr[i]);
  $(".container").append(timeRow);

  // Div for the hour
  var hourDiv = document.createElement("div");
  hourDiv.className = "col-1 hour";
  hourDiv.textContent = hourArr[i];
  $(timeRow).append(hourDiv);

  // Div for the text area
  var textDiv = document.createElement("textarea");
  textDiv.className = "col-10 description";
  $(timeRow).append(textDiv);

  // Div for the save button
  var saveDiv = document.createElement("button");
  saveDiv.className = "col-1 saveBtn";
  $(timeRow).append(saveDiv);

  // Save icon for the save button
  var saveIcon = document.createElement("i");
  saveIcon.className = "fas fa-save";
  $(saveDiv).append(saveIcon);
}

// Change the color of the text area based on the time of day
function colorChange() {
  var currentTime = moment().format("HH");

  $(".time-block").each(function () {
    var blockTime = parseInt($(this).attr("data-time"));

    if (blockTime < currentTime) {
      $(this).addClass("past");
    } else if (blockTime === currentTime) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

colorChange();

// Save the text area input to local storage
function saveText() {
  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("data-time");

    localStorage.setItem(time, text);
  });
}

saveText();

// Text area input from local storage
function getSavedText() {
  $(".time-block").each(function () {
    var time = $(this).attr("data-time");
    $(this).children(".description").val(localStorage.getItem(time));
  });
}

getSavedText();

// Clear the text area input from local storage
function clearText() {
  clearBtn.addEventListener("click", function () {
    localStorage.clear();
    $(".description").val("");
  });
}

clearText();

// Update the color of the text
setInterval(colorChange, 900000);
