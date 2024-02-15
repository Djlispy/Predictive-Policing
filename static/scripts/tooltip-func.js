// Get the tooltip element
const mapTooltip = document.getElementById('mapTooltip');  

// Get all elements with class "district"
const districtElements = document.querySelectorAll('.neighborhood');   


// Add event listeners to each district
districtElements.forEach(district => {
    district.addEventListener('mousemove', updateTooltip);
    district.addEventListener('mouseover', highlightDistrict);
    district.addEventListener('mouseout', resetDistrictColor);

});


function updateTooltip(event) {
    const neighborhood = event.target.getAttribute('data-name');
    mapTooltip.innerHTML = neighborhood;
    
const mouseX = event.clientX;
const mouseY = event.clientY;
    
const tooltipCenterX = mouseX - mapTooltip.clientWidth / 2;
const tooltipCenterY = Math.max(
    1,
    Math.min(
        mouseY - mapTooltip.clientHeight - 20 + window.scrollY,
        window.innerHeight - mapTooltip.clientHeight + window.scrollY
    )
);
    
mapTooltip.style.display = 'block';
mapTooltip.style.padding = '1%';
mapTooltip.style.left = `${tooltipCenterX + 10 + window.scrollX}px`;
mapTooltip.style.top = `${tooltipCenterY - 10}px`;
}


    // Function to highlight district on mouseover
    function highlightDistrict(event) {
        const district = event.target;
        district.classList.add('hovered');
    }

    // Function to reset district color on mouseout
    function resetDistrictColor(event) {
        const district = event.target;
        district.classList.remove('hovered');
    }


districtElements.forEach(district => {
    district.addEventListener('mouseout', () => {
        // Hide the tooltip when the mouse leaves a district
        mapTooltip.style.display = 'none';
    });
});