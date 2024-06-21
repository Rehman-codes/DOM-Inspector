let isInspectionActive = false;
let Box;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleInspection') {
        toggleInspection();
    }
    sendResponse({ isInspectionActive });
});

function toggleInspection() {
    isInspectionActive = !isInspectionActive;
    if (isInspectionActive) {
        startInspection();
    } else {
        stopInspection();
    }
}

function startInspection() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(node => {
        node.addEventListener('mouseover', beginInspection);
    });
    document.addEventListener('mousemove', moveBox);
    Box.style.display = 'flex';
    Box.style.flexDirection = 'column';
}

function stopInspection() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(node => {
        node.removeEventListener('mouseover', beginInspection);
    });
    document.removeEventListener('mousemove', moveBox);
    Box.style.display = 'none';
}

function beginInspection(event) {
    updateBox(event);
}

function updateBox(event) {
    let nodeName = event.target.nodeName;
    let id = event.target.id;
    let allClasses = Array.from(event.target.classList);

    Box.innerHTML = `
     <div style="border-bottom: 1px solid black; padding: 5px;"><h5 style="color:black;">Node Name:</h5> ${nodeName}</div>
     <div style="border-bottom: 1px solid black; padding: 5px;"><h5 style="color:black;">ID:</h5> ${id || 'N/A'}</div>
     <div style="border-bottom: 1px solid black; padding: 5px;"><h5 style="color:black;">Classes:</h5> ${allClasses.join(', ') || 'N/A'}</div>
    `;
}

function moveBox(event) {
    const x = event.pageX + 10;
    const y = event.pageY - 200;
    Box.style.left = `${x}px`;
    Box.style.top = `${y}px`;
}

function createBox() {
    Box = document.createElement('div');
    Box.id = 'box';
    Box.style.position = 'absolute';
    Box.style.background = 'white';
    Box.style.color = 'black';
    Box.style.border = '1px solid black';
    Box.style.padding = '5px';
    Box.style.display = 'none';
    document.body.appendChild(Box);
}

createBox();
