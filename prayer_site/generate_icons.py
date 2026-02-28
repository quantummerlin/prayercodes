"""
Generate PWA icons for Prayer Codes app.
Creates PNG icons at various sizes from an SVG source.
Run: python generate_icons.py
"""
import os
import struct
import zlib
import math

# Output directory
ICONS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'icons')
os.makedirs(ICONS_DIR, exist_ok=True)

# Icon sizes needed for PWA
SIZES = [72, 96, 128, 144, 152, 192, 384, 512]
MASKABLE_SIZES = [192, 512]


def create_png(width, height, pixels):
    """Create a PNG file from raw RGBA pixel data."""
    def write_chunk(chunk_type, data):
        chunk = chunk_type + data
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', zlib.crc32(chunk) & 0xffffffff)

    # PNG signature
    sig = b'\x89PNG\r\n\x1a\n'

    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)  # 8-bit RGBA
    ihdr = write_chunk(b'IHDR', ihdr_data)

    # IDAT
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # filter: None
        for x in range(width):
            idx = (y * width + x) * 4
            raw_data += bytes(pixels[idx:idx+4])

    idat_data = zlib.compress(raw_data, 9)
    idat = write_chunk(b'IDAT', idat_data)

    # IEND
    iend = write_chunk(b'IEND', b'')

    return sig + ihdr + idat + iend


def draw_icon(size, maskable=False):
    """Draw the Prayer Codes icon programmatically."""
    pixels = [0] * (size * size * 4)

    cx, cy = size / 2, size / 2
    radius = size / 2

    # Colors
    bg_deep = (5, 2, 16)        # Deep purple background
    gold = (212, 175, 55)       # Gold
    gold_light = (240, 208, 96) # Light gold
    gold_dim = (160, 120, 32)   # Dim gold

    def set_pixel(x, y, r, g, b, a=255):
        if 0 <= x < size and 0 <= y < size:
            idx = (y * size + x) * 4
            # Alpha blend
            existing_a = pixels[idx + 3]
            if existing_a == 0:
                pixels[idx] = r
                pixels[idx + 1] = g
                pixels[idx + 2] = b
                pixels[idx + 3] = a
            else:
                fa = a / 255.0
                ba = existing_a / 255.0
                oa = fa + ba * (1 - fa)
                if oa > 0:
                    pixels[idx] = int((r * fa + pixels[idx] * ba * (1 - fa)) / oa)
                    pixels[idx + 1] = int((g * fa + pixels[idx + 1] * ba * (1 - fa)) / oa)
                    pixels[idx + 2] = int((b * fa + pixels[idx + 2] * ba * (1 - fa)) / oa)
                    pixels[idx + 3] = int(oa * 255)

    def draw_filled_circle(cx, cy, r, color, alpha=255):
        for y in range(max(0, int(cy - r - 1)), min(size, int(cy + r + 2))):
            for x in range(max(0, int(cx - r - 1)), min(size, int(cx + r + 2))):
                dist = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
                if dist <= r:
                    aa = min(255, int(alpha * max(0, min(1, r - dist + 0.5))))
                    set_pixel(x, y, color[0], color[1], color[2], aa)

    def draw_circle_outline(cx, cy, r, color, width=1.5, alpha=255):
        for y in range(max(0, int(cy - r - width - 1)), min(size, int(cy + r + width + 2))):
            for x in range(max(0, int(cx - r - width - 1)), min(size, int(cx + r + width + 2))):
                dist = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
                edge_dist = abs(dist - r)
                if edge_dist <= width:
                    aa = min(255, int(alpha * max(0, min(1, width - edge_dist + 0.5))))
                    set_pixel(x, y, color[0], color[1], color[2], aa)

    def draw_line(x1, y1, x2, y2, color, width=1.5, alpha=255):
        length = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        if length == 0:
            return
        for y in range(max(0, int(min(y1, y2) - width - 1)), min(size, int(max(y1, y2) + width + 2))):
            for x in range(max(0, int(min(x1, x2) - width - 1)), min(size, int(max(x1, x2) + width + 2))):
                # Distance from point to line segment
                t = max(0, min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / (length ** 2)))
                px = x1 + t * (x2 - x1)
                py = y1 + t * (y2 - y1)
                dist = math.sqrt((x - px) ** 2 + (y - py) ** 2)
                if dist <= width:
                    aa = min(255, int(alpha * max(0, min(1, width - dist + 0.5))))
                    set_pixel(x, y, color[0], color[1], color[2], aa)

    # Scale factor
    s = size / 100.0

    # Background - deep purple with radial gradient
    for y in range(size):
        for x in range(size):
            dist = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
            if maskable:
                # Maskable: fill entire square
                t = min(1, dist / radius)
                r = int(bg_deep[0] + (26 - bg_deep[0]) * (1 - t) * 0.3)
                g = int(bg_deep[1] + (10 - bg_deep[1]) * (1 - t) * 0.3)
                b = int(bg_deep[2] + (53 - bg_deep[2]) * (1 - t) * 0.3)
                set_pixel(x, y, r, g, b, 255)
            else:
                # Regular: circular shape
                if dist <= radius:
                    t = dist / radius
                    r = int(bg_deep[0] + (26 - bg_deep[0]) * (1 - t) * 0.3)
                    g = int(bg_deep[1] + (10 - bg_deep[1]) * (1 - t) * 0.3)
                    b = int(bg_deep[2] + (53 - bg_deep[2]) * (1 - t) * 0.3)
                    edge_aa = min(255, int(255 * max(0, min(1, radius - dist + 0.5))))
                    set_pixel(x, y, r, g, b, edge_aa)

    # Outer circle
    draw_circle_outline(cx, cy, 48 * s, gold, width=1.5 * s, alpha=150)

    # Inner glow
    draw_filled_circle(cx, cy * 0.85, 30 * s, gold_light, alpha=20)

    # Praying hands shape (simplified diamond/teardrop)
    # Central body
    for y_off in range(-28, 28):
        py = cy + y_off * s - 3 * s
        # Teardrop width varies
        progress = (y_off + 28) / 56.0
        if progress < 0.5:
            w = progress * 2 * 8
        else:
            w = (1 - (progress - 0.5) * 1.5) * 8
        w = max(0, w) * s
        for x_off in range(int(-w), int(w) + 1):
            px = cx + x_off
            dist = abs(x_off) / max(w, 0.1)
            alpha = int(230 * (1 - dist * 0.5))
            t = dist
            r = int(gold[0] + (gold_light[0] - gold[0]) * (1 - t))
            g = int(gold[1] + (gold_light[1] - gold[1]) * (1 - t))
            b = int(gold[2] + (gold_light[2] - gold[2]) * (1 - t))
            set_pixel(int(px), int(py), r, g, b, alpha)

    # Cross at bottom
    cross_y = cy + 28 * s
    draw_line(cx, cross_y, cx, cross_y + 12 * s, gold, width=1.5 * s, alpha=130)
    draw_line(cx - 5 * s, cross_y + 4 * s, cx + 5 * s, cross_y + 4 * s, gold, width=1.5 * s, alpha=130)

    # Light rays from top
    for angle, length_mult, alpha_val in [
        (0, 1, 100), (-30, 0.8, 80), (30, 0.8, 80),
        (-55, 0.6, 50), (55, 0.6, 50)
    ]:
        rad = math.radians(angle - 90)
        start_r = 12 * s
        end_r = start_r + 6 * s * length_mult
        x1 = cx + math.cos(rad) * start_r
        y1 = cy - 35 * s + math.sin(rad) * start_r
        x2 = cx + math.cos(rad) * end_r
        y2 = cy - 35 * s + math.sin(rad) * end_r
        draw_line(x1, y1, x2, y2, gold_light, width=0.8 * s, alpha=alpha_val)

    return pixels


def main():
    print("Generating Prayer Codes PWA icons...")

    for sz in SIZES:
        print(f"  Creating icon-{sz}x{sz}.png")
        pixels = draw_icon(sz, maskable=False)
        png_data = create_png(sz, sz, pixels)
        with open(os.path.join(ICONS_DIR, f'icon-{sz}x{sz}.png'), 'wb') as f:
            f.write(png_data)

    for sz in MASKABLE_SIZES:
        print(f"  Creating icon-maskable-{sz}x{sz}.png")
        pixels = draw_icon(sz, maskable=True)
        png_data = create_png(sz, sz, pixels)
        with open(os.path.join(ICONS_DIR, f'icon-maskable-{sz}x{sz}.png'), 'wb') as f:
            f.write(png_data)

    # Also create apple-touch-icon (180x180)
    print("  Creating apple-touch-icon.png (180x180)")
    pixels = draw_icon(180, maskable=True)
    png_data = create_png(180, 180, pixels)
    with open(os.path.join(ICONS_DIR, 'apple-touch-icon.png'), 'wb') as f:
        f.write(png_data)

    # Create favicon (32x32)
    print("  Creating favicon-32x32.png")
    pixels = draw_icon(32, maskable=False)
    png_data = create_png(32, 32, pixels)
    with open(os.path.join(ICONS_DIR, 'favicon-32x32.png'), 'wb') as f:
        f.write(png_data)

    # Create favicon (16x16)
    print("  Creating favicon-16x16.png")
    pixels = draw_icon(16, maskable=False)
    png_data = create_png(16, 16, pixels)
    with open(os.path.join(ICONS_DIR, 'favicon-16x16.png'), 'wb') as f:
        f.write(png_data)

    print("Done! Icons generated in:", ICONS_DIR)


if __name__ == '__main__':
    main()
