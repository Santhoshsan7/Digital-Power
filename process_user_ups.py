from PIL import Image
import os

source_path = r"C:\Users\santh\.gemini\antigravity\brain\0e454a50-49e9-4636-a968-8c4d8e81c7dc\.tempmediaStorage\media_0e454a50-49e9-4636-a968-8c4d8e81c7dc_1771686138795.jpg"
dest_path = r"c:\Users\santh\Documents\Digital Power\public\images\slider\slide3-v2.jpg"

try:
    img = Image.open(source_path)
    width, height = img.size
    
    # Target 16:9 aspect ratio
    target_ratio = 16/9
    new_height = int(width / target_ratio)
    
    # User's image is center-heavy, so center crop is good
    top = (height - new_height) // 2
    bottom = top + new_height
    
    print(f"Original size: {width}x{height}")
    print(f"Target size: {width}x{new_height}")
    
    # Crop: (left, top, right, bottom)
    img_cropped = img.crop((0, max(0, top), width, min(height, bottom)))
    
    # Resize to standard hero size for consistency
    img_final = img_cropped.resize((1920, 1080), Image.Resampling.LANCZOS)
    
    # Save as compressed JPG for performance
    img_final.save(dest_path, "JPEG", quality=90, optimize=True)
    
    print(f"Successfully processed user image. Saved to {dest_path}")

except Exception as e:
    print(f"Error: {e}")
