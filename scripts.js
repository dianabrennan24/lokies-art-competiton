// Sample data for paintings, voting options, and products
const paintingsData = {
    2022: [
        { id: 1, title: 'Painting A', imageUrl: 'path/to/paintingA-2022.jpg' },
        { id: 2, title: 'Painting B', imageUrl: 'path/to/paintingB-2022.jpg' }
    ],
    2023: [
        { id: 3, title: 'Painting C', imageUrl: 'path/to/paintingC-2023.jpg' },
        { id: 4, title: 'Painting D', imageUrl: 'path/to/paintingD-2023.jpg' }
    ],
    2024: [
        { id: 5, title: 'Painting E', imageUrl: 'path/to/paintingE-2024.jpg' },
        { id: 6, title: 'Painting F', imageUrl: 'path/to/paintingF-2024.jpg' }
    ]
};

const productsData = [
    { name: 'Product 1', price: 19.99, image: 'path/to/product1.jpg' },
    { name: 'Product 2', price: 29.99, image: 'path/to/product2.jpg' },
    { name: 'Product 3', price: 39.99, image: 'path/to/product3.jpg' }
];

// Function to populate year select dropdown
function populateYearSelect() {
    const yearSelect = document.getElementById('year-select');
    // Only add options for years where paintings are available
    Object.keys(paintingsData).forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

// Function to populate paintings based on selected year
function populatePaintings(year) {
    const paintingImages = document.getElementById('painting-images');
    paintingImages.innerHTML = ''; // Clear previous paintings

    paintingsData[year].forEach(painting => {
        const div = document.createElement('div');
        div.className = 'painting-item';
        div.innerHTML = `
            <img src="${painting.imageUrl}" alt="${painting.title}">
            <p>${painting.title}</p>
        `;
        paintingImages.appendChild(div);
    });
}

// Function to populate voting form with painting options for the current year
function populateVotingForm(year) {
    const votingForm = document.getElementById('voting-form');
    votingForm.innerHTML = ''; // Clear previous options

    if (year === '2024') { // Only allow voting for paintings from the current year (2024)
        paintingsData[year].forEach(painting => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'vote';
            radio.value = painting.id;
            radio.id = `vote-${painting.id}`;

            const label = document.createElement('label');
            label.htmlFor = `vote-${painting.id}`;
            label.textContent = painting.title;

            votingForm.appendChild(radio);
            votingForm.appendChild(label);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = `Voting is only available for paintings from the current year (2024).`;
        votingForm.appendChild(p);
    }
}

// Function to populate product list
function populateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous products

    productsData.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

// Event listener for year select change
document.getElementById('year-select').addEventListener('change', function(event) {
    const selectedYear = event.target.value;
    populatePaintings(selectedYear);
    populateVotingForm(selectedYear);
});

// Event listener for voting form submission
document.getElementById('voting-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedYear = document.getElementById('year-select').value;
    if (selectedYear === '2024') { // Only allow voting for paintings from the current year (2024)
        const selectedPaintingId = document.querySelector('input[name="vote"]:checked');
        if (selectedPaintingId) {
            const selectedPainting = paintingsData[selectedYear]
                .find(painting => painting.id === parseInt(selectedPaintingId.value));
            alert(`You voted for "${selectedPainting.title}"`);
            // Additional logic can be added here for handling the vote submission
        } else {
            alert('Please select a painting to vote');
        }
    } else {
        alert(`Voting is only available for paintings from the current year (2024).`);
    }
});

// Call functions to populate elements when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateYearSelect();
    // Default to populate with the current year's paintings (2024)
    const initialYear = '2024';
    populatePaintings(initialYear);
    populateVotingForm(initialYear);
    populateProductList();
});
