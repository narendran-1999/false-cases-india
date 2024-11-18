document.querySelectorAll('.image-gallery .image-item img').forEach(img => {
    img.addEventListener('click', function () {
        const imageUrl = img.getAttribute('data-bs-image');
        const lightboxImage = document.getElementById('lightboxImage');
        lightboxImage.setAttribute('src', imageUrl);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table-container table tbody');

    // Function to load data for the active tab
    function loadTableData(dataCSV) {
        const csvFileName = `data-csv/${dataCSV}.csv`;

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Fetch and parse the CSV
        fetch(csvFileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch CSV file: ${csvFileName}`);
                }
                return response.text();
            })
            .then(csvData => {
                const rows = csvData.trim().split('\n').slice(1); // Skip the header row
                rows.forEach(row => {
                    const cols = row.split(','); // Split the row into columns
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${cols[0]}</td> <!-- Year -->
                        <td>${cols[1]}</td> <!-- Reported -->
                        <td>${cols[2]}</td> <!-- Final Report False -->
                        <td>${cols[3]}</td> <!-- Mistake of Fact or Law -->
                        <td>${cols[4]}</td> <!-- Convicted -->
                    `;
                    tableBody.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Error loading CSV:', error);
                tableBody.innerHTML = `<tr><td colspan="5">Error loading data. Please try again later.</td></tr>`;
            });
    }

    // Load the default (active) tab's data on page load
    const defaultTab = document.querySelector('.nav-link.active');
    if (defaultTab) {
        loadTableData(defaultTab.getAttribute('data-csv'));
    }

    // Event listener for tab changes
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector('.nav-link.active').classList.remove('active');
            event.target.classList.add('active');
            const dataCSV = event.target.getAttribute('data-csv');
            loadTableData(dataCSV);
        });
    });
});
