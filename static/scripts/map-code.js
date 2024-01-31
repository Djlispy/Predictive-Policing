document.addEventListener('DOMContentLoaded', () => {
    const mapTooltip = window.parent.document.getElementById('mapTooltip');

    document.querySelectorAll('#sf-map path').forEach(district => {
        district.addEventListener('mouseover', (event) => {
            const districtName = district.getAttribute('data-name');
            const { clientX, clientY } = event;

            // Change the color of the district on hover
            district.classList.add('hover-color');

            // Send a message to the parent window to show the tooltip
            window.parent.postMessage({ action: 'showTooltip', x: clientX, y: clientY, content: districtName }, '*');
        });

        district.addEventListener('mouseout', () => {
            // Remove the hover color on mouse out
            district.classList.remove('hover-color');

            // Send a message to the parent window to hide the tooltip
            window.parent.postMessage({ action: 'hideTooltip' }, '*');
        });
    });
});
