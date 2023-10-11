from django.shortcuts import render
from .import settings
from google.cloud import speech_v1p1beta1 as speech
import os



#def home(request):
#    return render(request,'home.html')

#speech_to_text

def home(request):
    if request.method == 'POST':
        # Process the audio file from the form
        audio_file = request.FILES['audio_file']

        # Configure the Google Cloud client
        client = speech.SpeechClient.from_service_account_file(os.path.abspath(settings.GOOGLE_SPEECH_TO_TEXT_KEY_FILE))

        with audio_file.open('rb') as audio:
            content = audio.read()

        audio = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code="en-US",
        )

        response = client.recognize(config=config, audio=audio)
        transcript = response.results[0].alternatives[0].transcript

        return render(request, 'home.html', {'transcript': transcript})
    return render(request, 'home.html')
