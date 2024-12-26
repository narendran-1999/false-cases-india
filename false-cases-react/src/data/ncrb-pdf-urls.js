const baseUrl = "https://www.ncrb.gov.in/uploads/nationalcrimerecordsbureau/"
const pdfExtension = ".pdf"

const pagePattern = [
    "148-149, 153, 174-175, 179",
    "215, 217, 227-228, 267, 269, 279-280",
    "219, 221, 231-232, 271, 273, 283-284",
    "231, 233, 243-244, 285, 287, 297-298"
]

const pdfUrls = {
    2016: {
        url: baseUrl + "custom/1653886924_Crime%20in%20India%20-%202016%20Complete%20PDF%20291117" + pdfExtension,
        pages: pagePattern[0]
    },

    2017: {
        url: baseUrl + "post/16959893381653885627CrimeinIndia2017-Volume100" + pdfExtension,
        pages: pagePattern[1]
    },

    2018: {
        url: baseUrl + "custom/1653734481_Crime%20in%20India%202018%20-%20Volume%201_3_0_0" + pdfExtension,
        pages: pagePattern[1]
    },

    2019: {
        url: baseUrl + "custom/1653730573_CII%202019%20Volume%201" + pdfExtension,
        pages: pagePattern[1]
    },

    2020: {
        url: baseUrl + "post/16959885631653645869CII2020Volume1" + pdfExtension,
        pages: pagePattern[2]
    },

    2021: {
        url: baseUrl + "custom/1696831798CII2021Volume1" + pdfExtension,
        pages: pagePattern[3]
    },

    2022: {
        url: baseUrl + "custom/1701607577CrimeinIndia2022Book1" + pdfExtension,
        pages: pagePattern[3]
    }
}

export default pdfUrls