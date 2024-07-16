const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let painting = false;
let fillColor = '#000000';
let lineWidth = 5;
let isEraser = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#fff' : fillColor; 

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('drawing');
}

function saveDrawing() {
    localStorage.setItem('drawing', canvas.toDataURL());
}

function loadDrawing() {
    const dataURL = localStorage.getItem('drawing');
    if (dataURL) {
        const img = new Image();
        img.src = dataURL;
        img.onload = () => ctx.drawImage(img, 0, 0);
    }
}

document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('pencil').addEventListener('click', () => {
    isEraser = false;
});
document.getElementById('eraser').addEventListener('click', () => {
    isEraser = true;
});
document.getElementById('colorPicker').addEventListener('input', (e) => fillColor = e.target.value);
document.getElementById('lineWidth').addEventListener('input', (e) => {
    lineWidth = e.target.value;
});
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

window.addEventListener('load', loadDrawing);
