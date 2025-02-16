async function fetchStockData() {
    const symbol = document.getElementById("stockSymbol").value.toUpperCase();
    const apiKey = "UGM8QMD8ND2JTBNE";  // Replace with your API key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}.BSE&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data["Time Series (Daily)"]) {
            alert("Invalid stock symbol!");
            return;
        }

        const timeSeries = data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries);
        const latestData = timeSeries[dates[0]];

        document.getElementById("stockData").innerHTML = `
            <tr>
                <td>${symbol}</td>
                <td>${latestData["1. open"]}</td>
                <td>${latestData["4. close"]}</td>
            </tr>
        `;
    } catch (error) {
        console.error("Error fetching stock data:", error);
    }
}
