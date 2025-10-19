# Script to update CSV data files and corresponding JS data files with new year data.
# Prompts user for new data, appends to CSVs, and updates JS files accordingly.
# Also updates NCRB PDF URLs and relevant pages in a JS file.

import os
import csv
import re

DATA_CSV_DIR = "../data-csv"
INDIA_JS_PATH = "../false-cases-react/src/data/india.js"
METRO_JS_PATH = "../false-cases-react/src/data/metro.js"
NCRB_PDF_URLS_PATH = "../false-cases-react/src/data/ncrb-pdf-urls.js"

# Use these mappings for JS file paths
JS_PATHS = {
    "fake-india-csv": INDIA_JS_PATH,
    "fake-metro-csv": METRO_JS_PATH
}

def get_csv_files_grouped():
    grouped = {}
    for subdir in os.listdir(DATA_CSV_DIR):
        subdir_path = os.path.join(DATA_CSV_DIR, subdir)
        if os.path.isdir(subdir_path):
            grouped[subdir] = {}
            for fname in os.listdir(subdir_path):
                if fname.endswith(".csv"):
                    crime_type = fname.replace(".csv", "")
                    # Remove '-metro' suffix for metro files
                    if subdir == "fake-metro-csv" and crime_type.endswith("-metro"):
                        crime_type = crime_type[:-6]
                    grouped[subdir][crime_type] = os.path.join(subdir_path, fname)
    return grouped

def get_last_year_from_csv(csv_path):
    with open(csv_path, newline='') as f:
        reader = csv.reader(f)
        rows = list(reader)
        if len(rows) < 2:
            return None
        last_row = rows[-1]
        try:
            year = int(last_row[0])
            return year
        except Exception:
            return None

def prompt_for_data(headers, next_year, label):
    print(f"\nEnter data for {label} for year {next_year}:")
    row = [str(next_year)]
    for h in headers[1:]:
        val = input(f"  {h}: ")
        row.append(val)
    return row

def add_row_to_csv(csv_path, row):
    with open(csv_path, "a", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(row)

def update_js_crime(js_path, crime, new_row):
    with open(js_path, "r") as f:
        content = f.read()
    # Find the crime string
    pattern = rf'("{crime}":\s*`)([^`]*)`'
    match = re.search(pattern, content)
    if not match:
        print(f"Could not find crime '{crime}' in {js_path}")
        return
    start, csv_str = match.groups()
    # Append new row
    new_csv_str = csv_str.strip() + "\n" + ",".join(new_row)
    new_content = re.sub(pattern, f'\\1{new_csv_str}`', content)
    with open(js_path, "w") as f:
        f.write(new_content)

def update_pdf_urls(js_path, year, url, pages):
    with open(js_path, "r") as f:
        content = f.read()
    # Find the dictionary object
    match = re.search(r"(const\s+\w+\s*=\s*\{)(.*?)(\}\n?\n?export\s+default)", content, re.DOTALL)
    if not match:
        print(f"Could not find object in {js_path}")
        return
    obj_start, obj_content, obj_end = match.groups()
    # Format new entry with numeric key (no quotes)
    entry = f'\n    {year}: {{\n        url: "{url}",\n        pages: "{pages}"\n    }},'
    new_obj_content = obj_content.rstrip()
    # Remove trailing comma if present
    if new_obj_content.endswith(","):
        new_obj_content = new_obj_content.rstrip(",")
    new_obj_content += entry
    new_content = obj_start + new_obj_content + "\n}" + obj_end
    with open(js_path, "w") as f:
        f.write(new_content)

def main():
    csv_grouped = get_csv_files_grouped()
    print("CSV files grouped by subdir and crime:")
    for subdir, crimes in csv_grouped.items():
        print(f" {subdir}:")
        for crime, path in crimes.items():
            print(f"   {crime}: {path}")

    # Get last year from all csvs
    years = []
    headers_map = {}
    for subdir, crimes in csv_grouped.items():
        for crime, f in crimes.items():
            year = get_last_year_from_csv(f)
            if year is None:
                print(f"Could not get last year from {f}")
                return
            years.append(year)
            with open(f, newline='') as cf:
                reader = csv.reader(cf)
                headers = next(reader)
                headers_map[f] = headers
    if len(set(years)) != 1:
        print("Warning: Not all CSVs have the same last year:", years)
    last_year = years[0]
    next_year = last_year + 1

    # Prompt for new data for each csv
    new_rows = {}
    for subdir, crimes in csv_grouped.items():
        for crime, f in crimes.items():
            label = f"{subdir}/{crime}"
            headers = headers_map[f]
            row = prompt_for_data(headers, next_year, label)
            add_row_to_csv(f, row)
            new_rows[(subdir, crime)] = row

    # Update india.js and metro.js
    print("\nUpdating JS data files...")
    for subdir in csv_grouped:
        js_path = JS_PATHS.get(subdir)
        if not js_path:
            print(f"No JS file mapping for subdir '{subdir}'")
            continue
        for crime in csv_grouped[subdir]:
            update_js_crime(js_path, crime, new_rows[(subdir, crime)])

    # Prompt for PDF url and pages
    print("\nEnter NCRB PDF source info for year", next_year)
    pdf_url = input("  PDF URL: ")
    pdf_pages = input("  Relevant pages (e.g. '120,123-130'): ")
    update_pdf_urls(NCRB_PDF_URLS_PATH, next_year, pdf_url, pdf_pages)
    print("\nUpdate complete.")

if __name__ == "__main__":
    main()