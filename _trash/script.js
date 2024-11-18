const tableData = {
    'rape': [
        ['2016', '500', '20', '10', '100'],
        ['2017', '550', '25', '15', '110'],
        ['2018', '600', '30', '20', '120'],
        ['2019', '650', '35', '25', '130'],
        ['2020', '700', '40', '30', '140'],
        ['2021', '750', '45', '35', '150'],
        ['2022', '800', '50', '40', '160']
    ],
    'attempted-rape': [
        ['2016', '200', '10', '5', '50'],
        ['2017', '210', '15', '8', '55'],
        ['2018', '220', '12', '7', '60'],
        ['2019', '230', '18', '10', '65'],
        ['2020', '240', '20', '12', '70'],
        ['2021', '250', '22', '15', '75'],
        ['2022', '260', '25', '18', '80']
    ],
    'sexual-harassment': [
        ['2016', '800', '40', '20', '200'],
        ['2017', '850', '50', '25', '220'],
        ['2018', '900', '45', '22', '240'],
        ['2019', '950', '55', '30', '260'],
        ['2020', '1000', '60', '35', '280'],
        ['2021', '1050', '70', '40', '300'],
        ['2022', '1100', '80', '50', '320']
    ],
    'cruelty': [
        ['2016', '1500', '100', '60', '400'],
        ['2017', '1600', '110', '65', '450'],
        ['2018', '1700', '120', '70', '500'],
        ['2019', '1800', '130', '80', '550'],
        ['2020', '1900', '140', '90', '600'],
        ['2021', '2000', '150', '100', '650'],
        ['2022', '2100', '160', '110', '700']
    ],
    'sexual-insult': [
        ['2016', '600', '30', '15', '150'],
        ['2017', '620', '35', '20', '160'],
        ['2018', '640', '40', '22', '170'],
        ['2019', '660', '45', '25', '180'],
        ['2020', '680', '50', '30', '190'],
        ['2021', '700', '55', '35', '200'],
        ['2022', '720', '60', '40', '210']
    ]
};

function createTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Year', 'Reported', 'Final Report False', 'Mistake of Fact or of Law or Civil Dispute', 'Convicted']
        .forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    return table;
}

function showTab(tabId) {
    const content = document.getElementById('dataTablesContent');
    content.innerHTML = '';
    content.appendChild(createTable(tableData[tabId]));
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => showTab(btn.dataset.tab));
    });
    
    // Show initial tab
    showTab('rape');
});