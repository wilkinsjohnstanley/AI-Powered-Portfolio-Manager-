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
    
st.markdown("---")
st.subheader("💬 Chatbot Assistant")

# Chat history state
if "messages" not in st.session_state:
st.session_state.messages = []

# Display past messages
for msg in st.session_state.messages:
st.chat_message(msg["role"]).write(msg["content"])

# User input
user_input = st.chat_input("Ask me about the stock data!")

if user_input:
# Store user message
st.session_state.messages.append({"role": "user", "content": user_input})

# Basic response logic (or call OpenAI here)
if "high" in user_input.lower():
    last_high = data["High"].iloc[-1]
    response = f"The most recent high price for {ticker.upper()} was ${last_high:.2f}."
elif "volume" in user_input.lower():
    last_volume = data["Volume"].iloc[-1]
    response = f"The latest trading volume was {last_volume:,} shares."
else:
    response = "Sorry, I can only answer questions about price or volume right now."

# Store and display assistant message
st.session_state.messages.append({"role": "assistant", "content": response})
st.chat_message("assistant").write(response)



if __name__ == '__main__':
    app.run(debug=True)
