from PIL import Image
import os

# Original source file from artifacts (to ensure we start fresh)
source_path = r"C:\Users\santh\.gemini\antigravity\brain\9b01adff-234d-466c-ba41-aa0ab386f115\media__1771358460616.png"
# New destination filename to definitively break cache
dest_path = r"c:\Users\santh\Documents\Digital Power\public\images\man-in-box-v2.png"

try:
    if not os.path.exists(source_path):
        print(f"Error: Source file not found at {source_path}")
        exit(1)

    img = Image.open(source_path)
    width, height = img.size
    
    # Aggressively crop 15 pixels from the left
    crop_amount = 15
    
    print(f"Original size: {width}x{height}")
    print(f"Cropping {crop_amount} pixels from the left side.")

    # Crop: (left, top, right, bottom)
    img = img.crop((crop_amount, 0, width, height))
    
    img.save(dest_path)
    
    print(f"Saved new image to: {dest_path}")
    print(f"New size: {img.size[0]}x{img.size[1]}")

except Exception as e:
    print(f"Error: {e}")
