from flask import Flask, request, make_response, jsonify, session
from bs4 import BeautifulSoup
import pywhatkit
import datetime
import wikipedia
import requests
import pyowm
import pyjokes
import os
from twilio.rest import Client
from dotenv import load_dotenv
load_dotenv()
print(os.environ['ACCOUNT_SID'])





app = Flask(__name__)

@app.get('/greeting')
def test():
    word = 'surprise'
    return {'text': word}

@app.post('/play-song')
def test2():
    song = request.json['song']
    pywhatkit.playonyt(song)

    return{'play': 'playing now, enjoy'}

@app.get('/date')
def test3():
    current_datetime = datetime.datetime.now()
    # print(current_datetime)
    string_date = current_datetime.strftime('%A, %B %d, %Y')
    print(string_date)

    return {'date': string_date}

@app.get('/time')
def test4():
    current_time = datetime.datetime.now()
    string_time = current_time.strftime('%I:%M%p')
    print(string_time)

    return {'time':string_time}


@app.post('/who-is')
def test5():
    # # try:
    #     # person = request.json['who']
    #     # print(person)
    #     wiki = wikipediaapi.Wikipedia('en')
    #     page = wiki.page('Michael Jordan')
    #     summary = page.summary[0:20]
    #     print(summary)
    #     info = wikipedia.summary(summary, sentences = 2)
    #     print(info)
    #     return {'test': info}

    # # except:
    # #     return {'person': 'Try being more specific'}

    person = request.json['who']
    print(person)
    info = wikipedia.summary(f"{person} (Biography)", sentences = 2)
    print(info)
    newInfo = info.replace("–", "to")
    print(newInfo)
    #import pdb; pdb.set_trace()
    return {'person': newInfo}



        

        


# @app.get('/test')
# def test6():
#     URL = 'https://www.google.com/search?q=' + "Ellen's age"

#     headers = {
#         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'

#     }

#     page = requests.get(URL, headers=headers)
#     soup = BeautifulSoup(page.content, 'html.parser')
#     result = soup.find(class_= 'Z0LcW t2b5Cf').get_text()
#     print(result)

#     return {'test': "test"}

@app.post('/weather')
def test6():
    owm = pyowm.OWM('e9bbab5187fb558b52731b99981f4c6d')
    mgr = owm.weather_manager()
    city = request.json['city']
    location = mgr.weather_at_place(city)
    weather = location.weather
    tempObj = weather.temperature('fahrenheit')
    temp_high = int(tempObj['temp_max'])
    temp_min = int(tempObj['temp_min'])
    temp = int(tempObj['temp'])
    print(tempObj)
    print(temp)

    return {'temp': temp,
            'temp_high': temp_high,
            'temp_min': temp_min}

@app.get('/jokes')
def test7():
    joke = pyjokes.get_joke()

    return {'joke': joke}

@app.get('/sleep')
def test8():
     os.system("pmset sleepnow")
     return {'test': 'test'}


@app.post('/text')
def test9():
    print(request.json)
    message = request.json['message']
    number = request.json['digits']
    toNumber = f'+1{number}'
    account_sid = os.environ['ACCOUNT_SID']
    auth_token =  os.environ['AUTH_TOKEN']
    client = Client(account_sid, auth_token)
    message = client.messages.create(
         body= message,
         from_='+18668755347',
         to= toNumber
     )

    print(message.sid)

    return {'test': 'test'}



if __name__ == '__main__':
    app.run(port=5555, debug=True)