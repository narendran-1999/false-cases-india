import csv
import json
import re
from pathlib import Path

# =========================
# CONSTANTS
# =========================

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent

INPUT_JSON_PATH = BASE_DIR / "input.json"

CRIME_KEYS = [
    "rape",
    "attempted_rape",
    "sexual_assault",
    "cruelty",
]

JSON_FIELDS = [
    "FRNC",
    "FRF",
    "Mistake/Civil",
    "Quashed-Investigation",
    "Quashed-Trial",
    "Convicted",
]

# Existing dataset naming:
#
# JSON:
# - Quashed-Investigation
# - Quashed-Trial
#
# Existing CSV / Astro:
# - Quashed-Police
# - Quashed-Court

# =========================
# CSV FILES
# =========================

INDIA_CSV_DIR = ROOT_DIR / "data-csv" / "fake-india-csv"
METRO_CSV_DIR = ROOT_DIR / "data-csv" / "fake-metro-csv"

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

ALL_CSV_FILES = (
    list(INDIA_FILES.values())
    + list(METRO_FILES.values())
)

# =========================
# ASTRO FILES
# =========================

ASTRO_DATA_DIR = (
    ROOT_DIR
    / "false-cases-astro"
    / "src"
    / "data"
)

ASTRO_FILES = {
    "constants": ASTRO_DATA_DIR / "constants-and-types.ts",
    "pdf_urls": ASTRO_DATA_DIR / "ncrb-pdf-urls.ts",
    "india": ASTRO_DATA_DIR / "india.ts",
    "metro": ASTRO_DATA_DIR / "metro.ts",
}


# =========================
# JSON
# =========================

def load_json(path: Path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


# =========================
# VALIDATION
# =========================

def check_all_csv_exist():
    return [
        str(path)
        for path in ALL_CSV_FILES
        if not path.exists()
    ]


def check_all_astro_files_exist():
    return [
        str(path)
        for path in ASTRO_FILES.values()
        if not path.exists()
    ]


def validate_json_structure(data):
    required_top = [
        "year",
        "pdf_link",
        "pages",
        "india_data",
        "metro_data",
    ]

    for key in required_top:
        if key not in data:
            raise RuntimeError(
                f"Missing top-level key: {key}"
            )

    # pages must be a non-empty string
    pages_val = data.get("pages")

    if not isinstance(pages_val, str) or not pages_val.strip():
        raise RuntimeError(
            "Invalid or missing top-level key: pages"
        )

    for scope in ["india_data", "metro_data"]:
        scope_data = data[scope]

        for crime in CRIME_KEYS:
            if crime not in scope_data:
                raise RuntimeError(
                    f"Missing crime key: {scope}.{crime}"
                )

            crime_data = scope_data[crime]

            for field in JSON_FIELDS:
                if field not in crime_data:
                    raise RuntimeError(
                        f"Missing field: {scope}.{crime}.{field}"
                    )


def year_exists_in_csv(path: Path, year: int):
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.reader(f)

        for row in reader:
            if row and row[0] == str(year):
                return True

    return False


def check_year_exists(year: int):
    found = []

    for path in ALL_CSV_FILES:
        if year_exists_in_csv(path, year):
            found.append(str(path))

    return found


def validate_astro_insertions(year: int):
    pdf_content = ASTRO_FILES["pdf_urls"].read_text(encoding="utf-8")

    if re.search(
        rf"year:\s*{year}\b",
        pdf_content,
    ):
        raise RuntimeError(
            f"Year {year} already exists in ncrb-pdf-urls.ts"
        )

    for key in ["india", "metro"]:
        content = ASTRO_FILES[key].read_text(encoding="utf-8")

        for crime in CRIME_KEYS:
            pattern = (
                rf"\b{re.escape(crime)}\b\s*:\s*`"
            )

            if not re.search(pattern, content):
                raise RuntimeError(
                    f"Crime block not found: "
                    f"{crime} in {key}.ts"
                )


# =========================
# ROW BUILDING
# =========================

def build_row(
    year: int,
    crime_data: dict,
):
    row = {
        "year": year
    }

    for field in JSON_FIELDS:
        value = crime_data.get(field)

        if value is None:
            row[field] = ""
        else:
            row[field] = value

    return row


def row_to_csv_line(row):
    values = [
        row["year"],
        row["FRNC"],
        row["FRF"],
        row["Mistake/Civil"],
        row["Quashed-Investigation"],
        row["Quashed-Trial"],
        row["Convicted"],
    ]

    return ",".join(
        "" if value == "" else str(value)
        for value in values
    )


# =========================
# CSV UPDATE
# =========================

def append_row(
    csv_path: Path,
    row: dict,
):
    values = [
        row["year"],
        row["FRNC"],
        row["FRF"],
        row["Mistake/Civil"],
        row["Quashed-Investigation"],
        row["Quashed-Trial"],
        row["Convicted"],
    ]

    with open(
        csv_path,
        "a",
        newline="",
        encoding="utf-8",
    ) as f:
        writer = csv.writer(f)
        writer.writerow(values)


# =========================
# ASTRO UPDATE
# =========================

def append_csv_line_to_ts(
    file_path: Path,
    crime: str,
    csv_line: str,
):
    content = file_path.read_text(encoding="utf-8")

    pattern = (
        rf"(\b{re.escape(crime)}\b\s*:\s*`)"
        rf"(.*?)"
        rf"`"
    )

    match = re.search(
        pattern,
        content,
        flags=re.DOTALL,
    )

    if not match:
        raise RuntimeError(
            f"Crime block not found: {crime}"
        )

    existing_csv = match.group(2).rstrip()

    updated_csv = (
        existing_csv
        + "\n"
        + csv_line
    )

    replacement = f"{crime}: `{updated_csv}`"

    content = re.sub(
        pattern,
        replacement,
        content,
        count=1,
        flags=re.DOTALL,
    )

    file_path.write_text(
        content,
        encoding="utf-8",
    )


def update_latest_year(
    constants_file: Path,
    year: int,
):
    content = constants_file.read_text(encoding="utf-8")

    pattern = r"(LATEST_DATA_YEAR:\s*number\s*=\s*)(\d+)"

    content = re.sub(
        pattern,
        rf"\g<1>{year}",
        content,
        count=1,
    )

    constants_file.write_text(
        content,
        encoding="utf-8",
    )


def append_pdf_url(
    pdf_file: Path,
    year: int,
    pdf_link: str,
    pages: str,
):
    content = pdf_file.read_text(encoding="utf-8")

    pages_escaped = pages.replace('"', '\\"')

    new_entry = f"""
    {{
        year: {year},
        pages: "{pages_escaped}",
        url: "{pdf_link}",
    }},
    """

    marker = "export const pdfUrls: PdfUrl[] = ["

    if marker not in content:
        raise RuntimeError(
            "pdfUrls array not found"
        )

    content = content.replace(
        marker,
        marker + new_entry,
        1,
    )

    pdf_file.write_text(
        content,
        encoding="utf-8",
    )


def append_to_astro_data(
    year: int,
    india_rows: dict,
    metro_rows: dict,
    pdf_link: str,
    pages: str,
):
    for crime, row in india_rows.items():
        append_csv_line_to_ts(
            ASTRO_FILES["india"],
            crime,
            row_to_csv_line(row),
        )

    for crime, row in metro_rows.items():
        append_csv_line_to_ts(
            ASTRO_FILES["metro"],
            crime,
            row_to_csv_line(row),
        )

    update_latest_year(
        ASTRO_FILES["constants"],
        year,
    )

    append_pdf_url(
        ASTRO_FILES["pdf_urls"],
        year,
        pdf_link,
        pages,
    )


# =========================
# MAIN
# =========================

def process():

    missing_csv = check_all_csv_exist()

    if missing_csv:
        print(
            "\nMissing CSV files:\n"
        )

        for path in missing_csv:
            print(path)

        return

    missing_astro = check_all_astro_files_exist()

    if missing_astro:
        print("\nMissing Astro files:\n")

        for path in missing_astro:
            print(path)

        return

    data = load_json(INPUT_JSON_PATH)

    validate_json_structure(data)

    year = data["year"]
    pdf_link = data["pdf_link"]
    pages = data["pages"]

    existing_year = check_year_exists(year)

    if existing_year:
        print(f"\nYear {year} already exists in:\n")

        for path in existing_year:
            print(path)

        return

    validate_astro_insertions(year)

    india_rows = {}
    metro_rows = {}

    for crime in CRIME_KEYS:

        india_row = build_row(
            year,
            data["india_data"][crime],
        )

        metro_row = build_row(
            year,
            data["metro_data"][crime],
        )

        india_rows[crime] = india_row
        metro_rows[crime] = metro_row

    # =====================
    # WRITES START HERE
    # =====================

    for crime in CRIME_KEYS:

        append_row(
            INDIA_FILES[crime],
            india_rows[crime],
        )

        append_row(
            METRO_FILES[crime],
            metro_rows[crime],
        )

    append_to_astro_data(
        year,
        india_rows,
        metro_rows,
        pdf_link,
        pages,
    )

    print(f"\nUpdate completed for {year}")


if __name__ == "__main__":
    process()