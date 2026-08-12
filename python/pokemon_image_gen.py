import os
import requests


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
# MEDIA PATH
# ============================================================

MEDIA_DIR = os.path.join(
    ASSETS_DIR,
    "media"
)

IMAGE_DIR = os.path.join(
    MEDIA_DIR,
    "pokemon_images"
)


# ============================================================
# CREATE IMAGE FOLDER
# ============================================================

os.makedirs(
    IMAGE_DIR,
    exist_ok=True
)


# ============================================================
# HEADER
# ============================================================

print()
print("========================================")
print("       POKÉMON IMAGE GENERATOR")
print("========================================")

print()
print("Image location:")
print(IMAGE_DIR)

print()


# ============================================================
# GENERATE 1025 POKÉMON IMAGES
# ============================================================

for pokemon_id in range(1, 1026):

    # --------------------------------------------------------
    # POKÉAPI OFFICIAL ARTWORK
    # --------------------------------------------------------

    url = (
        "https://raw.githubusercontent.com/"
        "PokeAPI/sprites/master/sprites/pokemon/"
        "other/official-artwork/"
        f"{pokemon_id}.png"
    )


    # --------------------------------------------------------
    # FILE NAME
    # --------------------------------------------------------

    filename = f"{pokemon_id:04d}.png"

    output_file = os.path.join(
        IMAGE_DIR,
        filename
    )


    # --------------------------------------------------------
    # SKIP EXISTING IMAGE
    # --------------------------------------------------------

    if os.path.exists(output_file):

        print(
            f"Already exists: {filename}"
        )

        continue


    # --------------------------------------------------------
    # DOWNLOAD
    # --------------------------------------------------------

    try:

        response = requests.get(
            url,
            timeout=30
        )

        response.raise_for_status()


        # ----------------------------------------------------
        # SAVE IMAGE
        # ----------------------------------------------------

        with open(
            output_file,
            "wb"
        ) as file:

            file.write(
                response.content
            )


        print(
            f"Created: {filename}"
        )


    except requests.RequestException as error:

        print(
            f"Failed: {filename}"
        )

        print(
            f"Error: {error}"
        )


# ============================================================
# FINISHED
# ============================================================

print()
print("========================================")
print("     IMAGE GENERATION COMPLETE")
print("========================================")

print()
print("Images location:")
print(IMAGE_DIR)

print()
print("Expected files:")
print("0001.png → 1025.png")

print()
print("Your chart folder was NOT modified:")
print(
    os.path.join(
        MEDIA_DIR,
        "pokemon_charts"
    )
)

print()
print("========================================")
print("                DONE")
print("========================================")