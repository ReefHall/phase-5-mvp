from flask import Flask, request, make_response, jsonify, session

app = Flask(__name__)

@app.get('/greeting')
def test():
    word = 'surprise'
    return {'text': word}




if __name__ == '__main__':
    app.run(port=5555, debug=True)