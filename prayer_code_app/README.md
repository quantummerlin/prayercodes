# Prayer Codes Web Application

A web application for creating structured prayers based on biblical scripture, generating prayer codes using English gematria, and amplifying prayers with the 37-73 Hz creation frequency.

## Features

- **Structured Prayer Builder**: Create prayers following biblical structures
- **Prayer Code Generation**: Convert prayers to numerical codes using English gematria
- **Scripture Integration**: Access biblical verses to incorporate into prayers
- **Creation Frequency**: Amplify prayers with the 37-73 Hz creation frequency
- **Mobile-Responsive Design**: Optimized for all devices

## Installation

1. Clone the repository
2. Install the requirements:
   ```
   pip install -r requirements.txt
   ```
3. Generate background images and audio files:
   ```
   python generate_backgrounds.py
   python generate_frequency.py
   ```
4. Run the application:
   ```
   python app.py
   ```

## Usage

1. Visit the homepage and select a prayer category
2. Follow the structured prayer builder to create your prayer
3. Generate your unique Prayer Code
4. Amplify your prayer by listening to the creation frequency and sharing your code

## Technical Details

- **Framework**: Flask
- **Frontend**: HTML, CSS, JavaScript
- **Prayer Code Generation**: English gematria (A=1, B=2, ..., Z=26)
- **Audio Generation**: 37-73 Hz frequency using NumPy and SciPy

## License

All rights reserved.