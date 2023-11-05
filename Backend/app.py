import json

import pandas as pd
import tensorflow as tf
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


@app.route('/find', methods=['GET'])
def find():
    try:
        df = pd.read_csv('reliance_stock_history.csv')
        # df_list = df.values.tolist()
        # df_list = list(df.values.flatten())
        # JSONP_data = jsonpify(df_list)

        # return JSONP_data
        json_objects = []

        # Loop through the DataFrame rows and create a JSON object for each entry
        for index, row in df.iterrows():
            entry_json = row.to_dict()
            json_objects.append(entry_json)
        return jsonify(json_objects)
        data_dict = dict()
        for col in df.columns:
            data_dict[col] = df[col].values.tolist()
        return jsonify(data_dict)
    except OSError:
        print('No file')


@app.route('/lstm', methods=['GET'])
def lstm():
    with open('candlestick.json', 'r') as json_file:
        data = json.load(json_file)
        return jsonify(data)



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