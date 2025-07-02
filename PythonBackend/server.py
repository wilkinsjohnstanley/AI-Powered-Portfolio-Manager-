from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS 
app = Flask(__name__)
CORS(app) #Allow requests fro the frontend
@app.route("/price/<ticker>")
def get_price(ticker):
    try:
        period = request.args.get("period", "1d")
        interval_map = {
            "1d": "5m",
            "5d": "15m",
            "1mo": "1h",
            "6mo": "1d",
            "1y": "1d",
            "5y": "1wk",
            "max": "1mo"
        }
        interval = interval_map.get(period, "1d")

        # ✅ Get actual price data
        data = yf.Ticker(ticker).history(period=period, interval=interval)

        if data.empty:
            return jsonify({"error": f"No data found for '{ticker}'"}), 404

        prices = data["Close"].tolist()
        timestamps = data.index.strftime('%Y-%m-%d %H:%M').tolist()

        ohlc = []
        for idx, row in data.iterrows():
            ohlc.append({
                "x": idx.strftime("%Y-%m-%d %H:%M"),
                "o": round(row["Open"], 2),
                "h": round(row["High"], 2),
                "l": round(row["Low"], 2),
                "c": round(row["Close"], 2),
            })

        return jsonify({
            "ticker": ticker,
            "prices": prices,
            "timestamps": timestamps,
            "latest": prices[-1],
            "ohlc": ohlc
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000)