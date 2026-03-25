import dataIndia from './india'
import dataMetro from './metro'
import properTitle from './chart-titles'

// Parse CSV text data to 2D-number array
const parseCSV = (csv) => {
    const rows = csv.split("\n").slice(1);
    return rows.map((row) => row.split(",").map(Number));
}

// Select required CSV item and return 2D number array
const getCrimeData = ( crime, isMetro ) => {
    const csvdata = isMetro ? dataMetro : dataIndia
    
    return {
        data: parseCSV(csvdata[crime]),
        title: properTitle[crime]
    }
}

export default getCrimeData