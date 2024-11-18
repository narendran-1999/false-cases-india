document.querySelectorAll('.image-gallery .image-item img').forEach(img => {
    img.addEventListener('click', function () {
        const imageUrl = img.getAttribute('data-bs-image');
        const lightboxImage = document.getElementById('lightboxImage');
        lightboxImage.setAttribute('src', imageUrl);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table-container table tbody');

    // Inline CSV data for each category
    const csvData = {
        "rape": `Year,Reported,FRF,Mistake/Civil,Convicted
2016,38947,2839,249,4739
2017,32559,2556,746,5822
2018,33356,2875,767,4708
2019,32033,3652,622,4640
2020,28046,3375,571,3814
2021,31677,4009,819,3368
2022,31516,4340,1130,5067`,

        "attempted_rape": `Year,Reported,FRF,Mistake/Civil,Convicted
2016,5729,503,29,215
2017,4154,463,153,279
2018,4097,493,147,266
2019,3944,718,96,317
2020,3741,631,90,221
2021,3800,730,196,158
2022,3288,760,175,192`,

        "sexual_assault": `Year,Reported,FRF,Mistake/Civil,Convicted
2016,84746,4645,1088,7001
2017,86001,4748,1918,8955
2018,89097,5257,2450,9352
2019,88367,6288,2378,8811
2020,85392,5821,2317,5629
2021,89200,6764,3625,6502
2022,83344,6821,2674,8056`,

        "cruelty": `Year,Reported,FRF,Mistake/Civil,Convicted
2016,110378,6745,2958,5433
2017,104551,4931,5385,6777
2018,103272,4950,5743,4982
2019,125298,7606,6939,5945
2020,111549,5520,4832,3425
2021,136234,6938,7037,4315
2022,140019,7076,8093,8307`,

        "sexual_insult": `Year,Reported,FRF,Mistake/Civil,Convicted
2016,7305,400,110,735
2017,7451,306,128,688
2018,6992,339,237,515
2019,6939,425,178,498
2020,7065,314,134,286
2021,7788,361,170,253
2022,8972,449,368,524`
    };

    // Function to load table data from inline CSV data
    function loadTableData(dataCSV) {
        const csv = csvData[dataCSV];
        if (!csv) {
            console.error('No data found for:', dataCSV);
            return;
        }

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Parse the CSV data
        const rows = csv.split('\n').slice(1); // Skip the header row
        rows.forEach(row => {
            const cols = row.split(','); // Split the row into columns
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cols[0]}</td> <!-- Year -->
                <td>${cols[1]}</td> <!-- Reported -->
                <td>${cols[2]}</td> <!-- FRF -->
                <td>${cols[3]}</td> <!-- Mistake/Civil -->
                <td>${cols[4]}</td> <!-- Convicted -->
            `;
            tableBody.appendChild(tr);
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
            const dataCSV = event.target.getAttribute('data-csv');
            loadTableData(dataCSV);
        });
    });
});
