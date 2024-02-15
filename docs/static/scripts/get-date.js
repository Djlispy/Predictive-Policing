// Get the date input element
const dateInput = document.getElementById("date");

// Set the current date as the default value
dateInput.value = new Date().toISOString().slice(0, 10);

// Calculate the maximum date (7 days from today)
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);

// Set the minimum and maximum attributes
dateInput.min = new Date().toISOString().slice(0, 10);
dateInput.max = maxDate.toISOString().slice(0, 10);



document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const dateInput = document.getElementById('date');
  
    submitBtn.addEventListener('click', function() {
      const selectedDate = dateInput.value;
      console.log('Selected date:', selectedDate);
      // You can add more code here if needed
    });
  });
  