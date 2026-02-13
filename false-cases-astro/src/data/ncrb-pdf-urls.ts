export const backupDriveUrl: string = "https://drive.google.com/drive/u/0/folders/13cH1bziT64KVwRh7Ak6ewhD36Ta3YpIc";

const baseUrl: string = "https://www.ncrb.gov.in/uploads/";

const pagePattern: string[] = [
    "148-149, 153, 174-175, 179",
    "215, 217, 227-228, 267, 269, 279-280",
    "219, 221, 231-232, 271, 273, 283-284",
    "231, 233, 243-244, 285, 287, 297-298"
];

type PdfUrl = {
    year: number;
    pages: string;
    url: string;
};

export const pdfUrls: PdfUrl[] = [
    {
        year: 2016,
        pages: pagePattern[0],
        url: baseUrl + "nationalcrimerecordsbureau/custom/1653886924_Crime%20in%20India%20-%202016%20Complete%20PDF%20291117.pdf",
    },
    {
        year: 2017,
        pages: pagePattern[1],
        url: baseUrl + "nationalcrimerecordsbureau/post/16959893381653885627CrimeinIndia2017-Volume100.pdf",
    },
    {
        year: 2018,
        pages: pagePattern[1],
        url: baseUrl + "nationalcrimerecordsbureau/custom/1653734481_Crime%20in%20India%202018%20-%20Volume%201_3_0_0.pdf",
    },
    {
        year: 2019,
        pages: pagePattern[1],
        url: baseUrl + "nationalcrimerecordsbureau/custom/1653730573_CII%202019%20Volume%201.pdf",
    },
    {
        year: 2020,
        pages: pagePattern[2],
        url: baseUrl + "nationalcrimerecordsbureau/post/16959885631653645869CII2020Volume1.pdf",
    },
    {
        year: 2021,
        pages: pagePattern[3],
        url: baseUrl + "nationalcrimerecordsbureau/custom/1696831798CII2021Volume1.pdf",
    },
    {
        year: 2022,
        pages: pagePattern[3],
        url: baseUrl + "nationalcrimerecordsbureau/custom/1701607577CrimeinIndia2022Book1.pdf",
    },
    {
        year: 2023,
        pages: pagePattern[3],
        url: baseUrl + "files/1CrimeinIndia2023PartI.pdf",
    },
];