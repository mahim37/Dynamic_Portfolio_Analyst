import pandas as pd
import tensorflow as tf
import keras
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from keras.models import load_model
from datetime import datetime, timedelta
import yfinance as yf
# instantiate flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/')
def home():
    return {"message": "Hello from backend"}


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
    Y_test = scaled_data

    for i in range(60, len(scaled_data)):
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