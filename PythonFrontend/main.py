from flask import Flask, render_template
import yfinance as yf

app = Flask(__name__)

@app.route('/')
def home():
    ticker_symbol = "AAPL"  # Example: Apple Inc.
    ticker_data = yf.Ticker(ticker_symbol)
    hist = ticker_data.history(period="5d")  # Get last 5 days

    # Convert to HTML table
    table_html = hist.to_html(classes='table table-striped')

    return render_template("index.html", table=table_html, ticker=ticker_symbol)

if __name__ == '__main__':
    app.run(debug=True)
