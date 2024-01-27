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

function submitCoordinates() {
  // Get the longitude and latitude values from the textareas
  var longitude = parseFloat(document.getElementById("longitudeInput").value);
  var latitude = parseFloat(document.getElementById("latitudeInput").value);

  // Create a LatLng object
  var location = { lat: latitude, lng: longitude };

  // Initialize the map in satellite view
  initMap(location, "satellite");
}

function initMap(location, mapType) {
  // Create a map centered at the specified location
  var map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 11, // You can adjust the zoom level
    mapTypeId: mapType,
  });

  // Create a marker at the specified location
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Entered Location",
  });
}

const paths = document.querySelectorAll("#interactive-svg path");

paths.forEach((path) => {
  path.addEventListener("mouseenter", () => {
    path.setAttribute("original-fill", path.getAttribute("fill"));
    path.setAttribute("fill", "lightblue");
  });

  path.addEventListener("mouseleave", () => {
    const originalFill = path.getAttribute("original-fill");
    path.setAttribute("fill", originalFill);
  });
});
