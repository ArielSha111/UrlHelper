updateEnvironmentFlag(); // Call initially to set the flag on page load


function updateEnvironmentFlag() {
    var flagText = '';
    var flagColor = '';
    var borderColor = '#333'; // Border color

    if (window.location.href.includes('.qa.') ||
        window.location.href.toLowerCase().includes('.qa.') ||
        window.location.href.toLowerCase().includes('-qa.') ||
        window.location.href.toLowerCase().includes('-qa.') ||
        window.location.href.toLowerCase().includes(' qa.') ||
        window.location.href.toLowerCase().includes(' qa.')) {
        flagText = 'QA';
        flagColor = '#81cd82';
    }
    else if (window.location.href.includes('.sandbox.') ||
        window.location.href.toLowerCase().includes('.sb.') ||
        window.location.href.toLowerCase().includes('-sandbox.') ||
        window.location.href.toLowerCase().includes('-sb.') ||
        window.location.href.toLowerCase().includes(' sandbox.') ||
        window.location.href.toLowerCase().includes(' sb.')) {
        flagText = 'SANDBOX';
        flagColor = '#dabc61';
    }
    else if (window.location.href.toLowerCase().includes('prod.') ||
        window.location.href.toLowerCase().includes('production.') ||
        window.location.href.toLowerCase().includes('swagger') ||
        window.location.href.toLowerCase().includes('swagger')) {
        flagText = 'PROD';
        flagColor = '#d86868';
    }

    var flagElement = document.getElementById('environmentFlag');
    if (!flagElement) {
        flagElement = document.createElement('div');
        flagElement.id = 'environmentFlag';
        flagElement.style.position = 'fixed';
        flagElement.style.top = '10px';
        flagElement.style.left = '10px';
        flagElement.style.width = '80px';
        flagElement.style.height = '25px';
        flagElement.style.backgroundColor = flagColor;
        flagElement.style.opacity = '0.8';
        flagElement.style.zIndex = '9999';
        flagElement.style.pointerEvents = 'none';
        flagElement.style.textAlign = 'center'; // Horizontal centering
        flagElement.style.lineHeight = '25px'; // Vertical centering
        flagElement.style.color = 'black';
        flagElement.style.fontWeight = 'bold';
        flagElement.style.fontSize = '14px';
        flagElement.style.border = '1px solid ' + borderColor; // Border style
        flagElement.innerText = flagText;
        document.body.appendChild(flagElement);
    } else {
        flagElement.innerText = flagText;
        flagElement.style.backgroundColor = flagColor;
    }
}
