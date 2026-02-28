#!/bin/bash

# Generate background images
echo "Generating background images..."
python generate_backgrounds.py

# Generate creation frequency audio
echo "Generating creation frequency audio..."
python generate_frequency.py

# Run the Flask application
echo "Starting Prayer Codes application..."
python app.py