document.addEventListener('DOMContentLoaded', () => {
  const mapTooltip = document.getElementById('mapTooltip');
  
  // Add hover effects to elements with the class 'district'
  document.querySelectorAll('.district').forEach(element => {
      element.addEventListener('mouseover', () => {
          element.classList.add('hover-color');
          element.classList.add('mapTooltipClass');
      });

      element.addEventListener('mouseout', () => {
          element.classList.remove('hover-color');
      });
  });

  document.querySelectorAll('#sf-map path').forEach(district => {
      district.addEventListener('mouseover', (event) => {
          const districtName = district.getAttribute('data-name');
          const { clientX, clientY } = event;
          const leftPosition = clientX - 60; 


          // Display tooltip above the cursor
          mapTooltip.style.top = `${clientY}px`;
          mapTooltip.style.left = `${leftPosition}px`;
          mapTooltip.innerHTML = districtName;
          mapTooltip.style.display = 'block';
          mapTooltip.classList.add('maptooltip-above');
      });

      district.addEventListener('mouseout', () => {
          // Hide tooltip on mouse out
          mapTooltip.style.display = 'none';
          mapTooltip.classList.remove('maptooltip-above');
      });
  });
});
