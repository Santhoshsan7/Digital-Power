from PIL import Image
import os

source_path = r"C:\Users\santh\.gemini\antigravity\brain\0e454a50-49e9-4636-a968-8c4d8e81c7dc\solar_hero_wide_2026_png_1771683669041.png"
dest_path = r"c:\Users\santh\Documents\Digital Power\public\images\slider\solar-hero-2026-v2.jpg"

try:
    img = Image.open(source_path)
    width, height = img.size
    
    # Target 16:9 aspect ratio
    target_ratio = 16/9
    new_height = int(width / target_ratio)
    
    # We want to center the crop vertically but maybe slightly higher to ensure text is clear
    # Text is centered in original, so center crop is safe
    top = (height - new_height) // 2
    bottom = top + new_height
    
    print(f"Original size: {width}x{height}")
    print(f"Target size: {width}x{new_height}")
    
    # Crop: (left, top, right, bottom)
    img_cropped = img.crop((0, top, width, bottom))
    
    # Resize to 1920x1080 for standard HD hero size
    img_final = img_cropped.resize((1920, 1080), Image.Resampling.LANCZOS)
    
    # Save as compressed JPG
    img_final.save(dest_path, "JPEG", quality=85, optimize=True)
    
    print(f"Successfully processed image. Saved to {dest_path}")

except Exception as e:
    print(f"Error: {e}")
