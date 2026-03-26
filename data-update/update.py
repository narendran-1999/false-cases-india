import json
import csv
from pathlib import Path

# =========================
# === CONSTANTS
# =========================

# Base paths
BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent

# Input
INPUT_JSON_PATH = BASE_DIR / "input.json"

# CSV directories
INDIA_CSV_DIR = ROOT_DIR / "data-csv" / "fake-india-csv"
METRO_CSV_DIR = ROOT_DIR / "data-csv" / "fake-metro-csv"

# Crime keys
CRIME_KEYS = ["rape", "attempted_rape", "sexual_assault", "cruelty"]

# Fields order (IMPORTANT: used for CSV + TS)
FIELDS = [
    "FRNC",
    "FRF",
    "Mistake/Civil",
    "Quashed-Investigation",
    "Quashed-Trial",
    "Convicted",
]

# File mappings
INDIA_FILES = {
    "rape": INDIA_CSV_DIR / "rape.csv",
    "attempted_rape": INDIA_CSV_DIR / "attempted_rape.csv",
    "sexual_assault": INDIA_CSV_DIR / "sexual_assault.csv",
    "cruelty": INDIA_CSV_DIR / "cruelty.csv",
}

METRO_FILES = {
    "rape": METRO_CSV_DIR / "rape-metro.csv",
    "attempted_rape": METRO_CSV_DIR / "attempted_rape-metro.csv",
    "sexual_assault": METRO_CSV_DIR / "sexual_assault-metro.csv",
    "cruelty": METRO_CSV_DIR / "cruelty-metro.csv",
}

ALL_CSV_FILES = list(INDIA_FILES.values()) + list(METRO_FILES.values())


# =========================
# === ASTRO PATHS (PLACEHOLDER)
# =========================

ASTRO_DATA_DIR = ROOT_DIR / "false-cases-astro" / "src" / "data"

ASTRO_FILES = {
    "constants": ASTRO_DATA_DIR / "constants-and-types.ts",
    "pdf_urls": ASTRO_DATA_DIR / "ncrb-pdf-urls.ts",
    "india": ASTRO_DATA_DIR / "india.ts",
    "metro": ASTRO_DATA_DIR / "metro.ts",
}


# =========================
# === LOAD JSON
# =========================

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


# =========================
# === VALIDATION
# =========================

def check_all_csv_exist():
    missing = [str(p) for p in ALL_CSV_FILES if not p.exists()]
    if missing:
        return False, missing
    return True, []


def year_exists_in_csv(path, year):
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            if row and row[0] == str(year):
                return True
    return False


def check_year_exists(year):
    found_in = []

    for path in ALL_CSV_FILES:
        if year_exists_in_csv(path, year):
            found_in.append(str(path))

    return found_in


# =========================
# === BUILD ROW
# =========================

def build_row(year, crime_data):
    row = {"year": year}

    for field in FIELDS:
        value = crime_data.get(field)
        row[field] = value if value is not None else ""

    return row


# =========================
# === CSV WRITE
# =========================

def append_row(path, row):
    with open(path, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)

        values = [row["year"]] + [row[field] for field in FIELDS]
        writer.writerow(values)


# =========================
# === ASTRO HELPERS (PLACEHOLDERS)
# =========================

def row_to_csv_line(row):
    values = [row["year"]] + [row[field] for field in FIELDS]
    return ",".join("" if v == "" else str(v) for v in values)


def append_csv_line_to_ts(file_path, crime, csv_line):
    """
    TODO:
    - Read TS file
    - Locate block: crime: `...`
    - Append csv_line before closing backtick
    - Preserve formatting
    """
    pass


def update_latest_year(constants_file, year):
    """
    TODO:
    - Find latest year constant
    - Replace with new year
    """
    pass


def append_pdf_url(pdf_file, year, pdf_link):
    """
    TODO:
    - Insert new entry: year: "pdf_link"
    - Ensure no duplicate
    """
    pass


def append_to_astro_data(year, india_rows, metro_rows, pdf_link):
    india_file = ASTRO_FILES["india"]
    metro_file = ASTRO_FILES["metro"]

    # Append India data
    for crime, row in india_rows.items():
        csv_line = row_to_csv_line(row)
        append_csv_line_to_ts(india_file, crime, csv_line)

    # Append Metro data
    for crime, row in metro_rows.items():
        csv_line = row_to_csv_line(row)
        append_csv_line_to_ts(metro_file, crime, csv_line)

    # Update latest year
    update_latest_year(ASTRO_FILES["constants"], year)

    # Append PDF link
    append_pdf_url(ASTRO_FILES["pdf_urls"], year, pdf_link)


# =========================
# === MAIN PROCESS
# =========================

def process():
    # 1. Check CSV existence
    ok, missing = check_all_csv_exist()
    if not ok:
        print("Missing CSV files:")
        for m in missing:
            print(m)
        return

    # 2. Load JSON
    data = load_json(INPUT_JSON_PATH)

    year = data["year"]
    pdf_link = data["pdf_link"]

    # 3. Check duplicate year
    found = check_year_exists(year)
    if found:
        print("Year already exists in:")
        for f in found:
            print(f)
        return

    # 4. Build + append rows
    india_rows = {}
    metro_rows = {}

    for crime in CRIME_KEYS:
        india_row = build_row(year, data["india_data"][crime])
        metro_row = build_row(year, data["metro_data"][crime])

        india_rows[crime] = india_row
        metro_rows[crime] = metro_row

        append_row(INDIA_FILES[crime], india_row)
        append_row(METRO_FILES[crime], metro_row)

    # 5. Astro update (placeholder)
    append_to_astro_data(year, india_rows, metro_rows, pdf_link)


# =========================
# === ENTRY POINT
# =========================

if __name__ == "__main__":
    process()