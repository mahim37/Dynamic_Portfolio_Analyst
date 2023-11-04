import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout
from sklearn.metrics import mean_squared_error
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

# Load your stock price and financial news data
# (Replace with loading your actual data)
stock_data = pd.read_csv('stock_price_data.csv')
news_data = pd.read_csv('financial_news_data.csv')

# Combine news sentiment with stock data
# (Assuming you have already performed sentiment analysis with FinBERT and have a 'sentiment' column)
combined_data = pd.concat([stock_data, news_data['sentiment']], axis=1)

# Create a rolling window of 10 days for feature creation
n = len(combined_data)
window_size = 10

X = []
y = []

for i in range(window_size, n):
    X.append(combined_data['Close'][i - window_size:i].values)
    y.append(combined_data['Close'][i])

X = np.array(X)
y = np.array(y)

# Normalize the data
scaler = MinMaxScaler()
X = scaler.fit_transform(X)
y = scaler.fit_transform(y.reshape(-1, 1))

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)

# Define and train the MLP model
mlp_model = Sequential()
mlp_model.add(Dense(50, activation='relu', input_shape=(window_size, 1)))
mlp_model.add(Dropout(0.1))
mlp_model.add(Dense(30, activation='relu'))
mlp_model.add(Dropout(0.05))
mlp_model.add(Dense(20, activation='relu'))
mlp_model.add(Dropout(0.01))
mlp_model.add(Dense(1))
mlp_model.compile(loss='mean_squared_error', optimizer='adam')
mlp_model.fit(X_train, y_train, epochs=100, batch_size=32)

# Define and train the LSTM model
lstm_model = Sequential()
lstm_model.add(LSTM(50, activation='tanh', input_shape=(window_size, 1), return_sequences=True))
lstm_model.add(Dropout(0.1))
lstm_model.add(LSTM(30, activation='tanh', return_sequences=True))
lstm_model.add(Dropout(0.05))
lstm_model.add(LSTM(20, activation='tanh', return_sequences=True))
lstm_model.add(Dropout(0.01))
lstm_model.add(LSTM(1, activation='tanh'))
lstm_model.compile(loss='mean_squared_error', optimizer='adam')
lstm_model.fit(X_train, y_train, epochs=100, batch_size=32)

# Define and train the FinBERT model (combination of stock data and news sentiment)
tokenizer = AutoTokenizer.from_pretrained('yiyanghkust/finbert')
model = AutoModelForSequenceClassification.from_pretrained('yiyanghkust/finbert')
nlp = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

# Create a combined dataset with both stock and sentiment data
combined_features = []
for i in range(window_size, n):
    sentiment = combined_data['sentiment'][i]
    combined_features.append(np.append(X[i - window_size:i], sentiment))

combined_features = np.array(combined_features)

# Split the combined data into training and testing sets
X_train_combined, X_test_combined, y_train_combined, y_test_combined = train_test_split(
    combined_features, y, test_size=0.15, random_state=42
)

# Define and train the FinBERT model
finbert_model = Sequential()
finbert_model.add(LSTM(70, activation='tanh', input_shape=(window_size + 1, 1), return_sequences=True))
finbert_model.add(Dropout(0.1))
finbert_model.add(LSTM(30, activation='tanh', return_sequences=True))
finbert_model.add(Dropout(0.05))
finbert_model.add(LSTM(10, activation='tanh', return_sequences=True))
finbert_model.add(Dropout(0.01))
finbert_model.add(LSTM(1, activation='tanh'))
finbert_model.compile(loss='mean_squared_error', optimizer='adam')
finbert_model.fit(X_train_combined, y_train_combined, epochs=100, batch_size=32)

# Evaluate the models on the test data
mlp_predictions = mlp_model.predict(X_test)
mlp_rmse = np.sqrt(mean_squared_error(y_test, mlp_predictions))

lstm_predictions = lstm_model.predict(X_test)
lstm_rmse = np.sqrt(mean_squared_error(y_test, lstm_predictions))

finbert_predictions = finbert_model.predict(X_test_combined)
finbert_rmse = np.sqrt(mean_squared_error(y_test_combined, finbert_predictions))

print(f'MLP RMSE: {mlp_rmse}')
print(f'LSTM RMSE: {lstm_rmse}')
print(f'FinBERT RMSE: {finbert_rmse}')
