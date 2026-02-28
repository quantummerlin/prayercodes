from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import string
import json
import random
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'prayer_codes_secret_key'

# Simple in-memory storage for codes
# In a real implementation, you would use a database
codes_db = {}

# Gematria: A=1, B=2, ..., Z=26, numbers at face value
def gematria(text):
    """Calculate the gematria value of text using A=1, B=2, ..., Z=26, numbers as is."""
    total = 0
    for char in text.upper():
        if char in string.ascii_uppercase:
            total += ord(char) - ord('A') + 1
        elif char.isdigit():
            total += int(char)
    return total

# Generate a prayer code from text
def generate_prayer_code(prayer_text, length=6):
    """Generate a numeric code from prayer text."""
    total = gematria(prayer_text)
    code = str(total % (10 ** length)).zfill(length)
    return code

# Format prayer as poem (each sentence on a new line)
def format_prayer_as_poem(prayer_text):
    """Format prayer text as a poem (each sentence on a new line)."""
    # Split into sentences
    sentences = [s.strip() for s in prayer_text.replace('\n', ' ').split('.') if s.strip()]
    # Join with newlines
    return '.\n'.join(sentences) + ('.' if sentences else '')

# Create the uploads directory if it doesn't exist
def create_upload_directory():
    os.makedirs(os.path.join(app.static_folder, 'audio'), exist_ok=True)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/how-it-works')
def how_it_works():
    return render_template('how_it_works.html')

@app.route('/scripture')
def scripture():
    return render_template('scripture.html')

@app.route('/amplify')
def amplify():
    return render_template('amplify.html')

@app.route('/generate-code', methods=['POST'])
def generate_code():
    """Generate a prayer code from submitted prayer text."""
    prayer_text = request.form.get('prayer', '')
    
    if not prayer_text:
        flash('Please enter your prayer text.')
        return redirect(url_for('index'))
    
    # Generate the code
    code = generate_prayer_code(prayer_text)
    
    # Store the code and prayer (in a real app, this would go to a database)
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    codes_db[code] = {
        'prayer': prayer_text,
        'timestamp': timestamp
    }
    
    # Create share message
    share_message = f"""My Prayer Code: {code}

I created this code with Prayer Codes app. The more we share and pray with these codes, the stronger our connection to Heaven becomes.

Create your own at prayercodes.com and join me in strengthening our prayers through the power of collective faith."""
    
    return jsonify({
        'code': code,
        'share_message': share_message
    })

@app.route('/get-scriptures', methods=['POST'])
def get_scriptures():
    """Get scriptures based on search term."""
    search_term = request.form.get('search', '').lower()
    
    # This would normally query a database of scriptures
    # For now, we'll return a sample result
    scriptures = [
        {
            'text': 'The LORD is my shepherd; I shall not want.',
            'reference': 'Psalm 23:1 (KJV)'
        },
        {
            'text': 'I can do all things through Christ which strengtheneth me.',
            'reference': 'Philippians 4:13 (KJV)'
        }
    ]
    
    return jsonify(scriptures)

if __name__ == '__main__':
    # Create directories
    create_upload_directory()
    app.run(debug=True, host='0.0.0.0', port=5000)