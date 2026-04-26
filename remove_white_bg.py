from PIL import Image
import os

# List of images to process - NEW BATTERIES FOR SIDEBAR
images = [
    "okaya-atsw-1175-front.png",
    "eastman-150ah-front.jpg",
    "massimo-150ah-front.jpg",
    "exide-sf-sonic-88ah-front.jpg"
]

base_dir = r"c:\Users\santh\Documents\Digital Power\public\images\products"

def remove_white_bg(img):
    img = img.convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # BFS Flood Fill
    # Target color: White or near white
    # Replacement: Transparent
    
    visited = set()
    queue = []
    
    # Start from ALL edges to catch disconnected white areas near border
    for x in range(width):
        for y in [0, height-1]:
            r, g, b, a = pixels[x, y]
            if r > 200 and g > 200 and b > 200: # Lower threshold for starting points
                queue.append((x, y))
                visited.add((x, y))

    for y in range(height):
        for x in [0, width-1]:
             if (x, y) not in visited:
                r, g, b, a = pixels[x, y]
                if r > 200 and g > 200 and b > 200:
                    queue.append((x, y))
                    visited.add((x, y))
            
    # Process
    # Increase tolerance for neighbors to eat shadows
    # but be careful not to eat the object.
    # Shadow is usually greyish: 220, 220, 220.
    # Object (battery) is Orange/Red/Black/White.
    # White battery might be issue.
    
    while queue:
        x, y = queue.pop(0)
        
        # Set to transparent
        pixels[x, y] = (255, 255, 255, 0)
        
        for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            nx, ny = x + dx, y + dy
            
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                nr, ng, nb, na = pixels[nx, ny]
                
                # Check if neighbor is near white/grey (Shadow)
                # If pixel is > 210 in all channels, typically background/shadow
                if nr > 210 and ng > 210 and nb > 210:
                     queue.append((nx, ny))
                     visited.add((nx, ny))
    
    return img

for img_name in images:
    source_path = os.path.join(base_dir, img_name)
    if not os.path.exists(source_path):
        print(f"Skipping {img_name} - Not found")
        continue
        
    try:
        img = Image.open(source_path)
        print(f"Processing {img_name}...")
        
        # Remove white background
        new_img = remove_white_bg(img)
        
        # Save as new file to avoid overwriting accidentally, but user wants it fixed in place?
        # Better to save as new name and updated code.
        name_part, ext = os.path.splitext(img_name)
        new_name = f"{name_part}-transparent.png"
        dest_path = os.path.join(base_dir, new_name)
        
        new_img.save(dest_path, "PNG")
        print(f"Saved to {new_name}")
        
    except Exception as e:
        print(f"Error processing {img_name}: {e}")
