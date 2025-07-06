import yfinance as yf
import streamlit as st
import pandas as pd
#import pages
from pages import login, portfolio, ticket
st.sidebar.title("Navigation")
# page = st.sidebar.radio("Go to", ["Login", "Portfolio", "Ticket"])
# if page =="Login":
#     login.show()
# elif page == "Portfolio":
#     portfolio.show()
# elif page == "Ticket":
#     ticket.show()

import requests
#Call backend API
response = requests.get("http://localhost:8001/users")
#Check response
if response.status_code==200:
    users = response.json()
    st.write("The users are:", users)
else:
    st.error("Failed to fetch users.")
st.title("📈Stocks")
#User input
ticker = st.text_input("Enter Ticker Symbol (e.g., AAPL, MSFT, TSLA)", "AAPL")
start_date = st.date_input("Start Date", pd.to_datetime("2025-05-29"))
end_date = st.date_input("End Date", pd.to_datetime("today"))
#Download stock data
if ticker:
    date = yf.download(ticker, start=start_date, end=end_date)
    
    if not date.empty:
        st.subheader(f"{ticker.upper()} Closing Price")
        st.line_chart(date["Close"])
        
        st.subheader("Raw Data")
        st.dataframe(date.tail())
    else:
        st.warning("No data found for that ticker and date range.")
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
