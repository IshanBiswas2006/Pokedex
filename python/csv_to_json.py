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

CSV_DIR = os.path.join(
    DATA_DIR,
    "csv"
)

JSON_DIR = os.path.join(
    DATA_DIR,
    "json"
)


# ============================================================
# FILE PATHS
# ============================================================

CSV_FILE = os.path.join(
    CSV_DIR,
    "pokemon_data.csv"
)

JSON_FILE = os.path.join(
    JSON_DIR,
    "pokemon_data.json"
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
# CHECK CSV
# ============================================================

if not os.path.exists(CSV_FILE):

    print()
    print("CSV file not found:")
    print(CSV_FILE)

    print()
    print("Expected location:")
    print(
        "assets/Data/csv/pokemon_data.csv"
    )

    raise SystemExit


# ============================================================
# READ CSV
# ============================================================

print()
print("Reading CSV...")

df = pd.read_csv(
    CSV_FILE,
    dtype=str
)


# ============================================================
# REMOVE NaN
# ============================================================

df = df.fillna("")


# ============================================================
# CONVERT DATAFRAME TO RECORDS
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