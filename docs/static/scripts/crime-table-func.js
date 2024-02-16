// Update the Crime Data div
const crimeDataDiv = document.getElementById('neighborhood-crime-data');
const numberOfCrimesDiv = document.getElementById('number-of-crimes');

// Create a table
const table = document.createElement('table');
table.style.borderCollapse = 'collapse';

// Create table header
const headerRow = table.insertRow();
const headers = ['Crime Type', 'Location (Coordinates)', 'Time'];
headers.forEach(headerText => {
  const th = document.createElement('th');
  th.textContent = headerText;
  th.style.padding = '8px';
  headerRow.appendChild(th);
});

// Fetch the JSON data from the file
fetch('crime-data.json')
  .then(response => response.json())
  .then(crimeData => {
    // Set the number of crimes
    const numberOfCrimes = crimeData.length;

    // Populate table with crime data
    crimeData.slice(0, numberOfCrimes).forEach(crime => {
      const row = table.insertRow();
      row.style.borderTop = '0.5px solid white';
      const values = [crime.type, crime.location, crime.time];
      values.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        td.style.padding = '8px';
        row.appendChild(td);
      });
    });

    // Append the table to the Crime Data div
    crimeDataDiv.appendChild(table);

    // Update the number of crimes
    numberOfCrimesDiv.textContent = `${numberOfCrimes} latest crimes`;
  })
  .catch(error => {
    console.error('Error fetching crime data:', error);
  });
