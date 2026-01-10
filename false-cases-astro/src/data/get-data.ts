import { dataIndia } from './india'
import { dataMetro } from './metro'
import { type ProperTitleKey, properTitle } from './chart-titles'

// Parse CSV text data to 2D-number array
function parseCSV(csv: string): number[][] {
    const rows = csv.split("\n").slice(1);
    return rows.map((row) => row.split(",").map(Number));
}

// Select required CSV item and return 2D number array
export function getCrimeData(crime: ProperTitleKey, isMetro: boolean): { data: number[][], title: string } {
    const csvdata = isMetro ? dataMetro : dataIndia
    
    return {
        data: parseCSV(csvdata[crime]),
        title: properTitle[crime]
    }
}

// Select required CSV item and return 1D number array for latest year
export function getLatestCrimeData(crime: ProperTitleKey, isMetro: boolean): { data: number[], title: string } {
    const { data, title } = getCrimeData(crime, isMetro);
    const latestData: number[] = data.slice(-1)[0];

    return {
        data: latestData,
        title
    };
}