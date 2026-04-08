import * as parliamentarch from './parliamentarch/index.js';

async function loadSenateData() {
    const seatsResponse = await fetch('../information/senate.json');
    const seats = await seatsResponse.json();

    const partiesResponse = await fetch('../information/parties.json');
    const parties = await partiesResponse.json();

    const attribution = new Map();
    for (const [party, count] of Object.entries(seats)) {
        attribution.set({ color: parties[party] }, count);
    }

    const svg = parliamentarch.getSVGFromAttribution(attribution, { canvasSize: 300, margins: 10 });
    const height = parseFloat(svg.getAttribute('height') || '0');
    const scale = 1;
    svg.style.display = 'inline-block';
    svg.style.transformOrigin = 'top left';
    svg.style.transform = `translateY(${height / scale}px) scale(${scale}, -${scale})`;
    svg.querySelectorAll('text').forEach(text => {
        text.style.transformBox = 'fill-box';
        text.style.transformOrigin = 'center center';
        text.style.transform = 'scaleY(-1)';
    });
    document.getElementById('senate-container').appendChild(svg);
}

loadSenateData();