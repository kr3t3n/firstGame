# This is the backend of the project. and is being hosted on replit at this backend URL [insert your backend URL after entering secrets keys]

import os
import tempfile
from io import BytesIO
from typing import Tuple

import anthropic
import replicate
import requests
from dotenv import load_dotenv
from elevenlabs import generate, play, set_api_key, Voice, VoiceSettings
from flask import Flask, Response, jsonify, request, send_file
from flask_cors import CORS
from openai import OpenAI

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "https://b72472e4-e722-40e9-a26a-79d0eb9794cd-00-1x63bl89nhgy2.janeway.replit.dev"]}})  # This allows all origins by default

# Set up various AI tools
openai = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
anthropic_client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
set_api_key(os.getenv('ELEVENLABS_API_KEY'))


@app.route('/')
def hello():
    print("Received request at root")
    return "Welcome to the server template!"


# Endpoint for generating a response from OpenAI
@app.route('/openai/text', methods=['POST'])
def openai_generate_text():
    data = request.json
    prompt = data.get('prompt', '') if data else ''
    if not prompt or len(prompt) < 1:
        return jsonify({'error': 'Please provide a prompt'}), 400

    try:
        completion = openai.chat.completions.create(
            model="gpt-4-0613",  # Make sure this is a valid model name
            messages=[{
                "role": "system",
                "content": "You are a helpful assistant."
            }, {
                "role": "user",
                "content": f"{prompt}"
            }])
        response = completion.choices[0].message.content.strip()
        print(f"Received request at /openai/text with prompt: {prompt}")
        return jsonify({"response": response})
    except Exception as e:
        print(f"Error in openai_generate_text: {str(e)}")
        return jsonify({"error": str(e)}), 500


# New endpoint for transcribing audio using OpenAI's Whisper
@app.route('/openai/transcribe', methods=['POST'])
def transcribe_audio() -> Tuple[Response, int]:
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename:
        try:
            # Get the file extension (default to .tmp if no extension)
            file_ext = os.path.splitext(file.filename)[1] or '.tmp'

            # Create a temporary file to store the uploaded audio
            with tempfile.NamedTemporaryFile(delete=False,
                                             suffix=file_ext) as temp_file:
                file.save(temp_file.name)
                temp_filename = temp_file.name

            # Transcribe the audio file
            with open(temp_filename, "rb") as audio_file:
                transcript = openai.audio.transcriptions.create(
                    model="whisper-1", file=audio_file)

            # Delete the temporary file
            os.unlink(temp_filename)

            print(f"Received request at /openai/transcribe with file: {file.filename}")
            return jsonify({"transcription": transcript.text}), 200
        except Exception as e:
            print(f"Error in transcribe_audio: {str(e)}")
            return jsonify({"error": str(e)}), 500

    # This should never be reached, but it's here to satisfy the type checker
    return jsonify({"error": "Unknown error"}), 500


# New endpoint for generating images using OpenAI
@app.route('/openai/image', methods=['POST'])
def openai_generate_image():
    data = request.json
    prompt = data.get('prompt', '') if data else ''
    if not prompt or len(prompt) < 1:
        return jsonify({'error': 'Please provide a prompt'}), 400

    try:
        print(f"Attempting to generate image with prompt: {prompt}")
        response = openai.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )

        image_url = response.data[0].url
        print(f"Successfully generated image. URL: {image_url}")
        return jsonify({"image_url": image_url})

    except Exception as e:
        print(f"Error in openai_generate_image: {str(e)}")
        return jsonify({"error": str(e)}), 500


# Endpoint for generating a response from Anthropic
@app.route('/anthropic/text', methods=['POST'])
def anthropic_generate_text():
    data = request.json
    prompt = data.get('prompt', '') if data else ''
    if not prompt or len(prompt) < 1:
        return jsonify({'error': 'Please provide a prompt'}), 400
    try:
        message = anthropic_client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            temperature=0,
            system="You are a helpful assistant.",
            messages=[{
                "role": "user",
                "content": prompt
            }])

        # Extract the text content from the response
        response = message.content[0].text if message.content else ""

        print(f"Received request at /anthropic/text with prompt: {prompt}")
        return jsonify({"response": response})
    except Exception as e:
        print(f"Error in anthropic_generate_text: {str(e)}")
        return jsonify({"error": str(e)}), 500


# Endpoint for generating an image from Flux model
@app.route('/flux/image', methods=['POST'])
def flux_generate_image():
    data = request.json
    prompt = data.get('prompt', '') if data else ''
    if not prompt or len(prompt) < 1:
        return jsonify({'error': 'Please provide a prompt'}), 400
    try:
        print(f"Received prompt: {prompt}")  # Log the received prompt
        image_urls = replicate.run("black-forest-labs/flux-schnell",
                                   input={
                                       "prompt": prompt,
                                       "num_outputs": 1,
                                       "aspect_ratio": "1:1",
                                       "output_format": "webp",
                                       "output_quality": 80
                                   })
        print(f"Received image URLs: {image_urls}")  # Log the received image URLs

        if image_urls and isinstance(image_urls, list) and len(image_urls) > 0:
            image_url = image_urls[0]
            print(f"Received request at /flux/image with prompt: {prompt}")
            return jsonify({"image_url": image_url})
        else:
            return jsonify({"error": "No image URL returned from the model"}), 500
    except Exception as e:
        print(f"Error in flux_generate_image: {str(e)}")  # Log any exceptions
        return jsonify({"error": str(e)}), 500


# Endpoint for generating speech from text using ElevenLabs
@app.route('/elevenlabs/tts', methods=['POST'])
def elevenlabs_tts():
    data = request.json
    prompt = data.get('prompt', '')
    if not prompt:
        return jsonify({'error': 'Please provide a prompt'}), 400

    try:
        audio = generate(
            text=prompt,
            voice=Voice(
                voice_id="21m00Tcm4TlvDq8ikWAM",
                settings=VoiceSettings(stability=0.1, similarity_boost=0.3, style=0.2)
            ),
            model="eleven_monolingual_v1"
        )

        # Create a BytesIO object from the audio content
        audio_io = BytesIO(audio)

        # Send the file back to the client
        return send_file(audio_io,
                         mimetype='audio/mpeg',
                         as_attachment=True,
                         download_name='tts_output.mp3')

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Starts the Python server
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)