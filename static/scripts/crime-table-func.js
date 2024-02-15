const numberOfCrimes = 8;
const crimeData = [
  { type: 'Theft', location: '28.126924291725, -82.70029555542', time: 'Morning' },
  { type: 'Assault', location: 'Park Avenue', time: '2:30 PM' },
  { type: 'Vandalism', location: 'Broadway', time: '5:45 PM' },
  { type: 'Burglary', location: 'Oak Street', time: '8:15 PM' },
  { type: 'Vandalism', location: 'Broadway', time: '5:45 PM' },
  { type: 'Burglary', location: 'Oak Street', time: '8:15 PM' },
  { type: 'Vandalism', location: 'Broadway', time: '5:45 PM' },
  { type: 'Burglary', location: 'Oak Street', time: '8:15 PM' },
  { type: 'Robbery', location: 'Maple Avenue', time: '10:30 PM' }
];

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

// Populate table with crime data
for (let i = 0; i < numberOfCrimes; i++) {
  const crime = crimeData[i];
  const row = table.insertRow();
  row.style.borderTop = '0.5px solid white';
  const values = [crime.type, crime.location, crime.time];
  values.forEach(value => {
    const td = document.createElement('td');
    td.textContent = value;
    td.style.padding = '8px';
    row.appendChild(td);
  });
}

// Append the table to the Crime Data div
crimeDataDiv.appendChild(table);

// Update the number of crimes
numberOfCrimesDiv.textContent = `${numberOfCrimes} lastest crimes`;