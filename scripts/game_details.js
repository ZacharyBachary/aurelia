async function loadGameDetails() {
    const response = await fetch('../information/game_details.json');
    const data = await response.json();
    return data;
}

export const gameDetails = await loadGameDetails();
