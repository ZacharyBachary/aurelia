import * as parliamentarch from '../node_modules/parliamentarch/dist/index.js';

async function loadParliamentData() {
    const seatsResponse = await fetch('../information/parliament.json');
    const seats = await seatsResponse.json();

    const partiesResponse = await fetch('../information/parties.json');
    const parties = await partiesResponse.json();

    const attribution = new Map();
    for (const [party, count] of Object.entries(seats)) {
        attribution.set({ color: parties[party] }, count);
    }

    const svg = parliamentarch.getSVGFromAttribution(attribution, { canvasSize: 300, margins: 10 });
    document.getElementById('parliament-container').appendChild(svg);
}

loadParliamentData();