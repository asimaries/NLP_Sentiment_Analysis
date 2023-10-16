from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Download the VADER lexicon (Sentiment Analysis tool)
nltk.download("vader_lexicon")


sia = SentimentIntensityAnalyzer()


def analyzer(text):
    sentiment_scores = sia.polarity_scores(text)
    compound_score = sentiment_scores["compound"]
    return compound_score


@app.route("/analyze_route", methods=["POST"])
def analyze_route():
    compound_score = analyzer(request.json["text"])

    sentiment = ""
    if compound_score >= 0.05:
        sentiment = "Positive"
    elif compound_score <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return jsonify({"result": sentiment})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
