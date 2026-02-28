import numpy as np
from scipy.io.wavfile import write
import os

def generate_creation_frequency(duration=180, sample_rate=44100):
    """
    Generate a 37-73 Hz creation frequency audio file
    
    Args:
        duration: Duration in seconds
        sample_rate: Audio sample rate
    """
    # Create time array
    t = np.linspace(0, duration, int(sample_rate * duration), False)
    
    # Generate base frequencies
    f_37 = np.sin(37 * 2 * np.pi * t)
    f_73 = np.sin(73 * 2 * np.pi * t)
    
    # Add harmonics and modulation for richness
    f_55 = np.sin(55 * 2 * np.pi * t) * 0.3  # Harmonic between 37 and 73
    f_111 = np.sin(111 * 2 * np.pi * t) * 0.2  # Harmonic of 37 and 73
    
    # Modulate amplitude slowly
    mod_37 = 0.7 + 0.3 * np.sin(0.1 * 2 * np.pi * t)
    mod_73 = 0.7 + 0.3 * np.sin(0.07 * 2 * np.pi * t)
    
    # Combine frequencies with modulation
    signal = (f_37 * mod_37 * 0.5) + (f_73 * mod_73 * 0.5) + f_55 + f_111
    
    # Normalize to prevent clipping
    signal = signal / np.max(np.abs(signal))
    
    # Convert to 16-bit PCM
    audio = (signal * 32767).astype(np.int16)
    
    return audio, sample_rate

if __name__ == "__main__":
    # Create directory if it doesn't exist
    os.makedirs("static/audio", exist_ok=True)
    
    # Generate the creation frequency audio
    print("Generating creation frequency audio...")
    audio, sample_rate = generate_creation_frequency(duration=180)
    
    # Save as WAV file
    write("static/audio/creation-frequency.wav", sample_rate, audio)
    
    print("Creation frequency audio generated successfully!")
    print("File saved as static/audio/creation-frequency.wav")