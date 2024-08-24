const apiEndpoint = 'https://digimon-api.vercel.app/api/digimon';

async function fetchDigimons() {
    try {
        const response = await fetch(apiEndpoint);
        const digimons = await response.json();
        renderDigimons(digimons);
    } catch (error) {
        console.error('Failed to fetch Digimons:', error);
    }
}

function renderDigimons(digimons) {
    const templateSource = document.getElementById('digimonCard').innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template(digimons);
    document.getElementById('content').innerHTML = html;
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const additionalInfo = card.querySelector('.additional-info');
            if (additionalInfo) {
                additionalInfo.style.display = additionalInfo.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
}

function searchDigimon() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(digimons => {
            const filteredDigimons = digimons.filter(digimon => 
                digimon.name.toLowerCase().includes(searchTerm)
            );
            renderDigimons(filteredDigimons);
        })
        .catch(error => console.error('Search failed:', error));
}

function resetSearch() {
    document.getElementById('search-input').value = ''; 
    fetchDigimons();
}

document.addEventListener('DOMContentLoaded', fetchDigimons);
document.getElementById('search-button').addEventListener('click', searchDigimon);
document.getElementById('search-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchDigimon();
    }
});

document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault(); 
    resetSearch(); 
});

document.getElementById('yearText').innerHTML = new Date().getFullYear();