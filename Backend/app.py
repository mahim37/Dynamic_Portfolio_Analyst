import json

import pandas as pd

import keras
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from keras.models import load_model
from datetime import datetime, timedelta
import yfinance as yf
from flask_jsonpify import jsonpify
# instantiate flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/')
def home():
    return {"message": "Hello from backend"}


@app.route('/history/reliance', methods=['GET'])
def history_reliance():
    try:
        df = yf.Ticker("RELIANCE.NS").history(period='3y').reset_index()
        df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
        df.to_csv('stock_history/history_reliance.csv', index=False)

        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)
    except OSError:
        print('No file')


@app.route('/history/hdfc', methods=['GET'])
def history_hdfc():
    try:
        df = yf.Ticker("HDFCBANK.NS").history(period='3y').reset_index()
        df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
        df.to_csv('stock_history/history_hdfc.csv', index=False)
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)
    except OSError:
        print('No file')


@app.route('/history/icici', methods=['GET'])
def history_icici():
    try:
        df = yf.Ticker("ICICIBANK.NS").history(period='3y').reset_index()
        df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
        df.to_csv('stock_history/history_icici.csv', index=False)
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)
    except OSError:
        print('No file')


@app.route('/history/kotak', methods=['GET'])
def history_kotak():
    try:
        df = yf.Ticker("KOTAKBANK.NS").history(period='3y').reset_index()
        df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
        df.to_csv('stock_history/history_kotak.csv', index=False)

        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)
    except OSError:
        print('No file')


@app.route('/history/axis', methods=['GET'])
def history_axis():
    try:
        df = yf.Ticker("AXISBANK.NS").history(period='3y').reset_index()
        df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%Y-%m-%d')
        df.to_csv('stock_history/history_axis.csv', index=False)

        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)
    except OSError:
        print('No file')


@app.route('/sentiment/reliance', methods=['GET'])
def reliance():
    try:
        df = pd.read_csv('sentiment_outputs/reliance_sentiment.csv')
        json_objects = []
        print(df.head())
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route('/sentiment/kotak', methods=['GET'])
def kotak():
    try:
        df = pd.read_csv('sentiment_outputs/kotak_sentiment.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route('/sentiment/icici', methods=['GET'])
def icici():
    try:
        df = pd.read_csv('sentiment_outputs/icici_sentiment.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route('/sentiment/axis', methods=['GET'])
def axis():
    try:
        df = pd.read_csv('sentiment_outputs/axis_sentiment.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route('/sentiment/hdfc', methods=['GET'])
def hdfc():
    try:
        df = pd.read_csv('sentiment_outputs/hdfc_sentiment.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route("/predict/reliance", methods=['GET'])
def predict_reliance():
    try:
        df = pd.read_csv('predicited_data/reliance_lstm.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route("/predict/axis", methods=['GET'])
def predict_axis():
    try:
        df = pd.read_csv('predicited_data/axis_lstm.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route("/predict/hdfc", methods=['GET'])
def predict_hdfc():
    try:
        df = pd.read_csv('predicited_data/hdfc_lstm.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route("/predict/icici", methods=['GET'])
def predict_icici():
    try:
        df = pd.read_csv('predicited_data/icici_lstm.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route("/predict/kotak", methods=['GET'])
def predict_kotak():
    try:
        df = pd.read_csv('predicited_data/kotak_lstm.csv')
        json_objects = []
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)

    except OSError:
        print('No predictions')


@app.route("/predict", methods=['POST', 'GET'])
def predict():
    # file = request.files['file']
    # file.save('uploads/' + file.filename)

    # Load the image to predict
    # img_path = f"./uploads/{file.filename}"
    # img = image.load_img(img_path, target_size=(150, 150))
    stock_symbol = 'RELIANCE.NS'
    end_date = datetime.today()
    start_date = (datetime.today() - timedelta(days=100))
    df = yf.download(tickers=stock_symbol,
                     start=start_date,
                     end=end_date)
    from sklearn.preprocessing import MinMaxScaler
    scaler = MinMaxScaler(feature_range=(0, 1))
    data = df.filter(['Close'])
    dataset = data.values
    scaled_data = scaler.fit_transform(dataset)
    X_test = []
    Y_test = df['Close']
    print(scaled_data.shape)
    for i in range(0, len(scaled_data)):
        X_test.append(scaled_data[i - 60:i, 0])

    # Convert the data to a numpy array
    X_test = np.array(X_test)

    # Reshape the data
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

    loaded_model = load_model('lstm_model.keras')
    # Get the models predicted price values
    predictions = loaded_model.predict(X_test)
    print(predictions.tolist())
    # return {"message": 'He'}

    return predictions.tolist()


if __name__ == '__main__':
    app.run(debug=True)


# define a predict function as an endpoint
# @app.route("/predict", methods=["GET","POST"])
# def predict():
#     data = {"success": False}
#
#     params = flask.request.json
#     if (params == None):
#         params = flask.request.args
#
#     # if parameters are found, return a prediction
#     if (params != None):
#         x=pd.DataFrame.from_dict(params, orient='index').transpose()
#         with graph.as_default():
#             data["prediction"] = str(model.predict(x)[0][0])
#             data["success"] = True
#
#     # return a response in json format
#     return flask.jsonify(data)

# start the flask app, allow remote connections
app.run(host='0.0.0.0')