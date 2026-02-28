import numpy as np
from PIL import Image, ImageDraw
import os

def create_stars_image(width=1000, height=1000, num_stars=500):
    """Create a starry background image"""
    # Create a black background
    img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Generate random stars
    for _ in range(num_stars):
        # Random position
        x = np.random.randint(0, width)
        y = np.random.randint(0, height)
        
        # Random size (mostly small)
        size = np.random.choice([1, 1, 1, 1, 2, 2, 3], p=[0.4, 0.3, 0.1, 0.1, 0.05, 0.03, 0.02])
        
        # Random brightness
        brightness = np.random.randint(180, 256)
        color = (brightness, brightness, brightness, 255)
        
        # Draw the star
        draw.ellipse((x, y, x + size, y + size), fill=color)
    
    return img

def create_twinkling_image(width=1000, height=1000, num_stars=200):
    """Create a twinkling overlay image"""
    # Create a transparent background
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Generate random twinkling stars
    for _ in range(num_stars):
        # Random position
        x = np.random.randint(0, width)
        y = np.random.randint(0, height)
        
        # Random size (slightly larger for twinkling effect)
        size = np.random.choice([2, 3, 4, 5], p=[0.4, 0.3, 0.2, 0.1])
        
        # Random brightness with transparency
        brightness = np.random.randint(200, 256)
        alpha = np.random.randint(100, 200)
        color = (brightness, brightness, brightness, alpha)
        
        # Draw the twinkling star with a glow
        draw.ellipse((x-1, y-1, x + size+1, y + size+1), 
                     fill=(brightness, brightness, brightness, alpha//3))
        draw.ellipse((x, y, x + size, y + size), fill=color)
    
    return img

if __name__ == "__main__":
    # Create directory if it doesn't exist
    os.makedirs("static/images", exist_ok=True)
    
    # Generate and save the stars background
    stars_img = create_stars_image(1500, 1500, 1000)
    stars_img.save("static/images/stars.png")
    
    # Generate and save the twinkling overlay
    twinkling_img = create_twinkling_image(1500, 1500, 300)
    twinkling_img.save("static/images/twinkling.png")
    
    print("Background images generated successfully!")