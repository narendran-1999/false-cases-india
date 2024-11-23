//inline csv handling
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table-container table tbody');

    // Inline CSV data for each category
    const csvData = {
        "rape": `Year,Reported,FRNC,FRF,Mistake/Civil,Convicted
2016,38947,66,2839,249,4739
2017,32559,20,2556,746,5822
2018,33356,31,2875,767,4708
2019,32033,39,3652,622,4640
2020,28046,48,3375,571,3814
2021,31677,14,4009,819,3368
2022,31516,8,4340,1130,5067`,

        "attempted_rape": `Year,Reported,FRNC,FRF,Mistake/Civil,Convicted
2016,5729,18,503,29,215
2017,4154,3,463,153,279
2018,4097,6,493,147,266
2019,3944,3,718,96,317
2020,3741,6,631,90,221
2021,3800,0,730,196,158
2022,3288,0,760,175,192`,

        "sexual_assault": `Year,Reported,FRNC,FRF,Mistake/Civil,Convicted
2016,84746,198,4645,1088,7001
2017,86001,112,4748,1918,8955
2018,89097,143,5257,2450,9352
2019,88367,173,6288,2378,8811
2020,85392,253,5821,2317,5629
2021,89200,221,6764,3625,6502
2022,83344,157,6821,2674,8056`,

        "cruelty": `Year,Reported,FRNC,FRF,Mistake/Civil,Convicted
2016,110378,135,6745,2958,5433
2017,104551,56,4931,5385,6777
2018,103272,170,4950,5743,4982
2019,125298,63,7606,6939,5945
2020,111549,122,5520,4832,3425
2021,136234,44,6938,7037,4315
2022,140019,56,7076,8093,8307`
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
                <td>${cols[2]}</td> <!-- Non-Cognizable -->
                <td>${cols[3]}</td> <!-- FRF -->
                <td>${cols[4]}</td> <!-- Mistake/Civil -->
                <td>${cols[5]}</td> <!-- Convicted -->
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

// QR Code & Copy link functionality
document.addEventListener('DOMContentLoaded', () => {
    const pageUrl = window.location.href.split('#')[0];

    // Generate QR code
    QRCode.toCanvas(document.getElementById('qrcode'), pageUrl, { width: 130 });

    // Copy link functionality
    document.getElementById('copyLink').addEventListener('click', () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            alert('Link copied to clipboard!');
        }).catch(console.error);
    });
});
