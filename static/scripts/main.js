var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var letter_count = 0;
var el = document.getElementById("loading");
var word = el.innerHTML.trim();
var finished = false;
var incrementer; // Declare the variable

el.innerHTML = "";

for (var i = 0; i < word.length; i++) {
  var span = document.createElement("span");
  span.innerHTML = word.charAt(i);
  el.appendChild(span);
}

setTimeout(write, 30); // Decreased timeout value
incrementer = setTimeout(inc, 200); // Decreased timeout value

function write() {
  for (var i = letter_count; i < word.length; i++) {
    var randomChar = alphabet.charAt(
      Math.floor(Math.random() * alphabet.length)
    );
    el.getElementsByTagName("span")[i].innerHTML = randomChar;
  }
  if (!finished) {
    setTimeout(write, 30); // Decreased timeout value
  }
}

function inc() {
  var spans = el.getElementsByTagName("span");
  spans[letter_count].innerHTML = word[letter_count];
  spans[letter_count].classList.add("glow");
  letter_count++;
  if (letter_count >= word.length) {
    finished = true;
    clearTimeout(incrementer); // Clear the timeout when finished
  } else {
    incrementer = setTimeout(inc, 200); // Decreased timeout value
  }
}

function updateTime() {
  var timeElement = document.getElementById("time");
  var now = new Date();

  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var week_day = daysOfWeek[now.getDay()];
  var monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var months = monthsOfYear[now.getMonth()];
  var days = now.getDate().toString().padStart(2, "0");
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var seconds = now.getSeconds().toString().padStart(2, "0");
  var milliseconds = now
    .getMilliseconds()
    .toString()
    .padStart(3, "0")
    .slice(0, 2);

  var timeString =
    week_day +
    " " +
    months +
    " " +
    days +
    " | " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    ":" +
    milliseconds;

  timeElement.innerHTML = timeString;

  // Update the time every 100 milliseconds
  setTimeout(updateTime, 25);
}

// Initial call to start updating time
updateTime();
