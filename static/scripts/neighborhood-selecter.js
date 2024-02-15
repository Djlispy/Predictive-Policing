// Get the table row element
const neighborhoodSelector = document.getElementById('neighborhood-selecter');
let selectedDistrict = null;

// Add click events to each district element
districtElements.forEach(district => {
  district.addEventListener('click', (event) => {
    // Get the neighborhood name from the clicked element
    const neighborhood = event.target.getAttribute('data-name');

    // Check if the clicked district is the currently selected one
    if (selectedDistrict === district) {
      // If it is, remove the class and reset the selectedDistrict variable
      district.classList.remove('color-click');
      selectedDistrict = null;
    } else {
      // If it's a different district, remove the class from the previously selected one (if any)
      if (selectedDistrict) {
        selectedDistrict.classList.remove('color-click');
      }

      // Add the class to the clicked district and update the selectedDistrict variable
      district.classList.add('color-click');
      selectedDistrict = district;
    }

    // Clear the existing content of the table row
    neighborhoodSelector.textContent = '';

    if (selectedDistrict) {
      // If a district is selected, create a span element for the neighborhood name
      const neighborhoodSpan = document.createElement('span');
      neighborhoodSpan.textContent = neighborhood;
      neighborhoodSpan.style.color = '#5174dc'; // Set desired color

      // Add a glowing text shadow
      neighborhoodSpan.style.textShadow = `0 0 4px #5174dc`; // You can adjust the values

      // Add the "Neighborhood Selected:" text and the neighborhood name span
      neighborhoodSelector.appendChild(document.createTextNode('Neighborhood Selected: '));
      neighborhoodSelector.appendChild(neighborhoodSpan);
    } else {
      // If no district is selected, only add the "Neighborhood Selected:" text
      neighborhoodSelector.appendChild(document.createTextNode('Neighborhood Selected: '));
    }
  });
});
