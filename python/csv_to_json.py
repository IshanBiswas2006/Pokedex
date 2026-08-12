import os
import json

import pandas as pd


# ============================================================
# PROJECT PATHS
# ============================================================

PYTHON_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

PROJECT_DIR = os.path.dirname(
    PYTHON_DIR
)

ASSETS_DIR = os.path.join(
    PROJECT_DIR,
    "assets"
)


# ============================================================
# DATA PATHS
# ============================================================

DATA_DIR = os.path.join(
    ASSETS_DIR,
    "Data"
)

JSON_DIR = os.path.join(
    DATA_DIR,
    "json"
)


# ============================================================
# CREATE JSON FOLDER
# ============================================================

os.makedirs(
    JSON_DIR,
    exist_ok=True
)


# ============================================================
# HEADER
# ============================================================

print()
print("========================================")
print("       POKÉMON CSV → JSON")
print("========================================")


# ============================================================
# USER INPUT
# ============================================================

print()
print("Enter the CSV file path.")
print("Example:")
print(r"D:\Study Materials\Pokemon\assets\Data\csv\pokemon_data.csv")

print()

CSV_FILE = input(
    "CSV file path: "
).strip().strip('"')


# ============================================================
# CHECK CSV
# ============================================================

if not os.path.isfile(CSV_FILE):

    print()
    print("CSV file not found:")
    print(CSV_FILE)

    raise SystemExit


# ============================================================
# JSON FILE NAME
# ============================================================

csv_name = os.path.splitext(
    os.path.basename(CSV_FILE)
)[0]

JSON_FILE = os.path.join(
    JSON_DIR,
    csv_name + ".json"
)


# ============================================================
# READ CSV
# ============================================================

print()
print("Reading CSV...")

try:

    df = pd.read_csv(
        CSV_FILE,
        dtype=str
    )

except Exception as error:

    print()
    print("Could not read CSV:")
    print(error)

    raise SystemExit


# ============================================================
# REMOVE NaN
# ============================================================

df = df.fillna("")


# ============================================================
# CONVERT TO RECORDS
# ============================================================

records = df.to_dict(
    orient="records"
)


# ============================================================
# SAVE JSON
# ============================================================

with open(
    JSON_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        records,
        file,
        indent=4,
        ensure_ascii=False
    )


# ============================================================
# RESULT
# ============================================================

print()
print("========================================")
print("          CONVERSION COMPLETE")
print("========================================")

print()
print(
    f"Total records: {len(records)}"
)

print()
print("CSV:")
print(CSV_FILE)

print()
print("JSON:")
print(JSON_FILE)

print()
print("========================================")
print("              DONE")
print("========================================")