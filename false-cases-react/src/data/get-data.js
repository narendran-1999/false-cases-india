import dataIndia from './india'
import dataMetro from './metro'
import properTitle from './chart-titles'

// Parse CSV text data to 2D-number array
const parseCSV = (csv) => {
    const rows = csv.split("\n").slice(1);
    return rows.map((row) => row.split(",").map(Number));
}

// Select required CSV item and return 2D number array
const getCrimeData = ( crime, isMetro = false ) => {
    data = isMetro ? dataMetro : dataIndia
    title_suffix = isMetro ? " (Metro)" : " (All India)"

    return {
        data: parseCSV(data[crime]),
        title: properTitle[crime] + title_suffix
    }
}

export default getCrimeData