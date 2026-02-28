#!/usr/bin/env python3
"""Generate all static assets for Prayer Codes"""

import numpy as np
from PIL import Image, ImageDraw
from scipy.io.wavfile import write as wav_write
import subprocess, os

OUT = os.path.dirname(os.path.abspath(__file__))

# ── 1. Stars background (tileable 1500x1500) ──
def make_stars():
    w, h = 1500, 1500
    img = Image.new('RGB', (w, h), (5, 2, 16))
    draw = ImageDraw.Draw(img)
    rng = np.random.default_rng(42)
    for _ in range(800):
        x, y = rng.integers(0, w), rng.integers(0, h)
        s = int(rng.choice([1,1,1,1,2,2,3]))
        b = int(rng.integers(160, 256))
        # slight purple/gold tint on some stars
        r_off = int(rng.integers(0, 30))
        b_off = int(rng.integers(0, 20))
        draw.ellipse((x, y, x+s, y+s), fill=(b+r_off, b-10, b+b_off))
    path = os.path.join(OUT, 'images', 'stars.png')
    img.save(path, optimize=True)
    print(f"  ✓ stars.png ({os.path.getsize(path)//1024}KB)")

# ── 2. Twinkling overlay (transparent, tileable) ──
def make_twinkling():
    w, h = 1500, 1500
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    rng = np.random.default_rng(73)
    for _ in range(250):
        x, y = rng.integers(0, w), rng.integers(0, h)
        s = int(rng.choice([2, 3, 4, 5]))
        b = int(rng.integers(200, 256))
        a = int(rng.integers(80, 180))
        # glow halo
        draw.ellipse((x-2, y-2, x+s+2, y+s+2), fill=(b, b, b, a//4))
        draw.ellipse((x, y, x+s, y+s), fill=(b, b, b, a))
    path = os.path.join(OUT, 'images', 'twinkling.png')
    img.save(path, optimize=True)
    print(f"  ✓ twinkling.png ({os.path.getsize(path)//1024}KB)")

# ── 3. Creation Frequency Audio (37-73 Hz, 3 minutes) ──
def make_frequency():
    sr = 44100
    dur = 180  # 3 minutes
    t = np.linspace(0, dur, sr * dur, endpoint=False)

    # Core frequencies
    f37 = np.sin(2 * np.pi * 37 * t)
    f73 = np.sin(2 * np.pi * 73 * t)

    # Harmonics for richness
    f55  = np.sin(2 * np.pi * 55 * t) * 0.25
    f111 = np.sin(2 * np.pi * 111 * t) * 0.15
    f146 = np.sin(2 * np.pi * 146 * t) * 0.08

    # Slow amplitude modulation (breathing feel)
    mod1 = 0.7 + 0.3 * np.sin(2 * np.pi * 0.08 * t)
    mod2 = 0.7 + 0.3 * np.sin(2 * np.pi * 0.05 * t)

    # Combine
    sig = (f37 * mod1 * 0.45) + (f73 * mod2 * 0.45) + f55 + f111 + f146

    # Fade in/out (5 seconds each)
    fade_len = sr * 5
    fade_in = np.linspace(0, 1, fade_len)
    fade_out = np.linspace(1, 0, fade_len)
    sig[:fade_len] *= fade_in
    sig[-fade_len:] *= fade_out

    # Normalize
    sig = sig / np.max(np.abs(sig)) * 0.85
    audio16 = (sig * 32767).astype(np.int16)

    wav_path = os.path.join(OUT, 'audio', 'creation-frequency.wav')
    wav_write(wav_path, sr, audio16)

    # Convert to MP3 using ffmpeg
    mp3_path = os.path.join(OUT, 'audio', 'creation-frequency.mp3')
    try:
        subprocess.run([
            'ffmpeg', '-y', '-i', wav_path,
            '-codec:a', 'libmp3lame', '-b:a', '128k',
            mp3_path
        ], capture_output=True, check=True)
        os.remove(wav_path)
        print(f"  ✓ creation-frequency.mp3 ({os.path.getsize(mp3_path)//1024}KB)")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print(f"  ✓ creation-frequency.wav ({os.path.getsize(wav_path)//1024}KB) [ffmpeg not found, keeping wav]")

if __name__ == '__main__':
    print("Generating Prayer Codes assets...")
    make_stars()
    make_twinkling()
    make_frequency()
    print("Done!")