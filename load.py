from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import datetime as dt
import pytz
import requests

# Specify the custom .env filename
# This loads the API key from the .env.local file into the environment.
load_dotenv('.env.local')

# Retrieve the OpenWeatherMap API key from environment variables
api_key = os.getenv("OPENWEATHERMAP_API_KEY")

# If the API key is not found, raise an error and exit.
if not api_key:
    raise ValueError("API key not found. Check your .env.local file and variable name.")

# Initialize the Flask web application
app = Flask(__name__)
CORS(app)

# Function to convert temperature from Kelvin to Fahrenheit and Celsius
def kelvin_to_fahrenheit_celsius(kelvin):
    fahrenheit = (kelvin - 273.15) * 9/5 + 32
    celsius = kelvin - 273.15
    return fahrenheit, celsius

#Function to convert pressure from hPa to inHg
def hPa_to_inHg(hPa):
    inHg = hPa * 0.02953
    return inHg

def mph_to_kph(mph):
    kph = mph * 1.60934
    return kph
# Define the route for fetching weather data
@app.route('/weather', methods=['GET'])
def get_weather():
    # Get the 'city' parameter from the query string of the URL
    city = request.args.get('city')
    
    # If no 'city' parameter is provided, return a 400 error and a message
    if not city:
        return jsonify({'error': 'City parameter is required'}), 400

    # Construct the URL for the OpenWeatherMap API request
    url = f"https://api.openweathermap.org/data/2.5/weather?appid={api_key}&q={city}"
    
    # Make a GET request to the OpenWeatherMap API
    response = requests.get(url)
    
    # If the response status is not 200 (OK), return an error message with the response code
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch weather data'}), response.status_code

    # Convert the response to a JSON format (Python dictionary)
    data = response.json()

    try:
        # Extract temperature (in Kelvin) from the response data and convert it
        temp_kelvin = data['main']['temp']
        temp_fahrenheit, temp_celsius = kelvin_to_fahrenheit_celsius(temp_kelvin)
        
        # Extract the "feels like" temperature (in Kelvin) and convert it
        feels_like_kelvin = data['main']['feels_like']
        feels_like_fahrenheit, feels_like_celsius = kelvin_to_fahrenheit_celsius(feels_like_kelvin)
        
        #Extract the high/low temperature for the day
        temp_max_kelvin = data['main']['temp_max']
        temp_min_kelvin = data['main']['temp_min']
        temp_max_fahrenheit, temp_max_celsius = kelvin_to_fahrenheit_celsius(temp_max_kelvin)
        temp_min_fahrenheit, temp_min_celsius = kelvin_to_fahrenheit_celsius(temp_min_kelvin)

        # Extract other weather details (humidity, description)
        humidity = data['main']['humidity']
        description = data['weather'][0]['description']
        
        # Extract sunrise time and convert the timestamp to a readable format
        sunrise_timestamp = data['sys']['sunrise']
        sunset_timestamp = data['sys']['sunset']
        
        #Extract wind speed and pressure
        wind_speed = data['wind']['speed']
        wind_metric = mph_to_kph(wind_speed)
        pressure = data['main']['pressure']
        pressure_inHg = hPa_to_inHg(pressure)

        #Extract the weather state
        weather_state = data['weather'][0]['main']

        # Return the weather data in JSON format
        return jsonify({
            'city': city,
            'temperature_fahrenheit': temp_fahrenheit,
            'temperature_celsius': temp_celsius,
            'feels_like_fahrenheit': feels_like_fahrenheit,
            'feels_like_celsius': feels_like_celsius,
            'temp_max_fahrenheit': temp_max_fahrenheit,
            'temp_max_celsius': temp_max_celsius,
            'temp_min_fahrenheit': temp_min_fahrenheit,
            'temp_min_celsius': temp_min_celsius,
            'humidity': humidity,
            'description': description,
            'sunrise_time': sunrise_timestamp,
            'wind_speed': wind_speed,
            'pressure_inHg': pressure_inHg,
            'sunset_time': sunset_timestamp,
            'weather_state': weather_state,
            'pressure_metric': pressure,
            'wind_metric': wind_metric
        })

    # If the expected data structure is not found (key error), return a 500 error
    except KeyError:
        return jsonify({'error': 'Malformed API response'}), 500

# Run the Flask application in debug mode
if __name__ == '__main__':
    app.run(debug=True)