# NCRB Data Update Procedure

This project tracks NCRB crime statistics and updates both:

1. Raw CSV datasets (`data-csv/`)
2. Astro website data (`false-cases-astro/src/data/`)

The update process is performed using:

```bash
python update.py
```

---

# Step 1: Obtain NCRB Report

Download the latest NCRB "Crime in India" report.

Identify the values for:

* Rape
* Attempted Rape
* Sexual Assault / Harassment
* Cruelty by Husband or His Relatives

For both:

* India
* Metropolitan Cities

Record the following values:

* FRNC
* FRF
* Mistake/Civil
* Quashed-Investigation
* Quashed-Trial
* Convicted

Also collect:

* Year
* PDF URL

---

# Step 2: Populate input.json

Copy `update-template.json` to `input.json`.

Fill all available values.

Example:

```json
{
  "year": 2024,
  "pdf_link": "https://example.com/crime-in-india-2024.pdf",

  "india_data": {
    "rape": {
      "FRNC": 1,
      "FRF": 2,
      "Mistake/Civil": 3,
      "Quashed-Investigation": 4,
      "Quashed-Trial": 5,
      "Convicted": 6
    }
  },

  "metro_data": {
    "rape": {
      "FRNC": 1,
      "FRF": 2,
      "Mistake/Civil": 3,
      "Quashed-Investigation": 4,
      "Quashed-Trial": 5,
      "Convicted": 6
    }
  }
}
```

Missing values should be entered as:

```json
null
```

Example:

```json
{
  "FRNC": null
}
```

These become empty CSV cells.

---

# Step 3: Run Update

## Option A — Run Locally

From the `data-update` directory:

```bash
python update.py
```

## Option B — Run via GitHub Workflow

If the repository contains the `update-ncrb.yml` workflow:

1. Open the repository on GitHub.
2. Go to:

```text
Actions
→ Update NCRB Data
```

3. Click:

```text
Run workflow
```

4. Select the branch.
5. Click:

```text
Run workflow
```

The workflow will:

```text
Read input.json
→ validate files
→ update all CSV files
→ update Astro data files
→ commit changes automatically
```

After completion, verify that the workflow succeeded and that the new commit was created. GitHub manual workflows use the `workflow_dispatch` trigger and appear as a "Run workflow" button in the Actions tab.

---

# Validation Performed

The script checks:

## 1. CSV Existence

All 8 CSV files must exist.

If any are missing:

* Update is aborted
* Missing file paths are displayed

## 2. Duplicate Year Detection

The script scans all 8 CSV files.

If the year already exists in any file:

* Update is aborted
* Matching file paths are displayed

No files are modified.

---

# Files Updated

If validation succeeds, the script updates:

## CSV Files

India:

* rape.csv
* attempted_rape.csv
* sexual_assault.csv
* cruelty.csv

Metro:

* rape-metro.csv
* attempted_rape-metro.csv
* sexual_assault-metro.csv
* cruelty-metro.csv

One row is appended to each file.

---

## Astro Files

### constants-and-types.ts

Updates:

```ts
LATEST_DATA_YEAR
```

### india.ts

Appends one new CSV line to:

* rape
* attempted_rape
* sexual_assault
* cruelty


### metro.ts

Appends one new CSV line to:

* rape
* attempted_rape
* sexual_assault
* cruelty


### ncrb-pdf-urls.ts

Adds a new PDF entry for the year.

New entries are inserted at the beginning of the list so the newest report remains first.


# Field Mapping

The JSON schema uses:

```text
Quashed-Investigation
Quashed-Trial
```

The existing datasets use:

```text
Quashed-Police
Quashed-Court
```

The update script automatically maps:

```text
Quashed-Investigation → Quashed-Police
Quashed-Trial         → Quashed-Court
```

No manual conversion is required.

---

# Post-Update Verification

After a successful update:

1. Verify all 8 CSV files contain the new year.
2. Verify `LATEST_DATA_YEAR` was updated.
3. Verify `india.ts` contains the new year in all 4 crime datasets.
4. Verify `metro.ts` contains the new year in all 4 crime datasets.
5. Verify `ncrb-pdf-urls.ts` contains the new PDF entry.
6. Run Astro locally and confirm data renders correctly.

```bash
cd ../false-cases-astro
npm install
npm run dev
```

Open the local site and verify charts, tables, and PDF links.
