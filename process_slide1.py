from PIL import Image
import os

source_path = r"C:\Users\santh\.gemini\antigravity\brain\0e454a50-49e9-4636-a968-8c4d8e81c7dc\media__1771677375973.jpg"
dest_path = r"c:\Users\santh\Documents\Digital Power\public\images\slider\slide1-v2.jpg"

try:
    img = Image.open(source_path)
    width, height = img.size
    
    # Target 16:9
    target_ratio = 16/9
    new_height = int(width / target_ratio)
    
    # Center crop
    top = (height - new_height) // 2
    bottom = top + new_height
    
    img_cropped = img.crop((0, max(0, top), width, min(height, bottom)))
    img_final = img_cropped.resize((1920, 1080), Image.Resampling.LANCZOS)
    img_final.save(dest_path, "JPEG", quality=90, optimize=True)
    
    print(f"Successfully processed Slide 1 image. Saved to {dest_path}")

except Exception as e:
    print(f"Error: {e}")
