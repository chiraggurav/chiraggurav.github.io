const apiKey = "UGM8QMD8ND2JTBNE"; // Replace with your API Key

async function fetchStockData() {
    const symbol = document.getElementById("stockSymbol").value.toUpperCase();
    if (!symbol) {
        alert("Please enter a stock symbol!");
        return;
    }

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data["Time Series (Daily)"]) {
            alert("Invalid stock symbol or API limit exceeded!");
            return;
        }

        // Extract time series data
        const timeSeries = data["Time Series (Daily)"];
        const dates = Object.keys(timeSeries);
        const latestData = timeSeries[dates[0]];
        const prevWeekData = timeSeries[dates[5]];  // 5 days back (excluding weekends)
        const prevMonthData = timeSeries[dates[20]]; // ~1 month back
        const prevYearData = timeSeries[dates[250]]; // ~1 year back

        // Get price changes
        const currentPrice = parseFloat(latestData["4. close"]);
        const weeklyChange = prevWeekData ? ((currentPrice - parseFloat(prevWeekData["4. close"])) / parseFloat(prevWeekData["4. close"])) * 100 : "N/A";
        const monthlyChange = prevMonthData ? ((currentPrice - parseFloat(prevMonthData["4. close"])) / parseFloat(prevMonthData["4. close"])) * 100 : "N/A";
        const yearlyChange = prevYearData ? ((currentPrice - parseFloat(prevYearData["4. close"])) / parseFloat(prevYearData["4. close"])) * 100 : "N/A";

        // Update table
        document.getElementById("stockData").innerHTML = `
            <tr>
                <td>${symbol}</td>
                <td>${currentPrice.toFixed(2)}</td>
                <td>${weeklyChange !== "N/A" ? weeklyChange.toFixed(2) + "%" : "N/A"}</td>
                <td>${monthlyChange !== "N/A" ? monthlyChange.toFixed(2) + "%" : "N/A"}</td>
                <td>${yearlyChange !== "N/A" ? yearlyChange.toFixed(2) + "%" : "N/A"}</td>
            </tr>
        `;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Failed to retrieve stock data.");
    }
}
