# Dynamic_Portfolio_Analyst
The stock market's role in the economy is crucial, often signaling prosperity or recession. Accurately predicting short-term movements in the market is a challenging yet rewarding endeavor for investors. This project showcases a research study aimed at advancing stock portfolio using deep learning networks and sentiment analysis derived from financial, business, and technology news articles.

## Objective
The primary goal of this research is to leverage complex Recurrent Neural Network (RNN) models, specifically Long Short-Term Memory (LSTM), and FinBERT sentiment analysis to analyze stock prices more accurately. By integrating sentiment analysis from news articles into the LSTM model, we seek to enhance the accuracy of short-term market predictions.

## Methodology
The study involves utilizing web scraping techniques to collect financial news articles and historical stock price data. The analysis primarily revolves around employing LSTM models in conjunction with FinBERT sentiment analysis, creating a synergy between deep learning, sentiment analysis, and the financial market.

## Key Findings
Our findings indicate a significant potential for sentiment-driven predictions to improve stock forecasting accuracy. This research sheds light on the influence of qualitative factors, such as market sentiment, on stock movements, while also recognizing the challenges and opportunities inherent in using diverse data sources for market prediction.

## Implementation
The project includes code for implementing the LSTM models, FinBERT sentiment analysis, and a user-friendly web interface presenting combined insights for investors, traders, and financial analysts.

## Usage
To get started with this dynamic portfolio analyst, follow these steps:
1. Clone this repository
```bash
git clone https://github.com/yourusername/dynamic-portfolio-analyst.git
```

2. Running backend server:
```bash
cd Backend/
```
3. Install the required python packages
```bash
pip install -r requirements.txt
```
4. Run the backend server by default on `localhost:5000`
```bash
python3 app.py
```

5. Running frontend server:
  Open new terminal in the project root directory
```bash
  cd Frontend/
 ```
6. Install the dependencies
```bash
 npm install
```
7. Finally, run frontend by default on `localhost:3000`
```bash
npm start
```
   

## Conclusion
This project contributes to the ongoing pursuit of predicting stock market movements through the integration of deep learning and sentiment analysis. It aims to provide valuable insights and tools for market participants while acknowledging the complexities and potential in utilizing diverse data sources for enhanced market prediction.

## Future Work
- Exploring further enhancements in sentiment-driven predictions
- Addressing challenges and expanding the scope of data sources for improved accuracy

Feel free to explore the code, findings, and implementation details within the project.
