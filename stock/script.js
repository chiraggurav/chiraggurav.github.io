async function fetchStockData() {
    const symbol = document.getElementById("stockSymbol").value.toUpperCase();
    if (!symbol) {
        alert("Please enter a stock symbol!");
        return;
    }

    // NSE India API URL (Fetch JSON Data)
    const url = `https://www.nseindia.com/api/quote-equity?symbol=${symbol}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0", // NSE blocks requests without a User-Agent
                "Accept": "application/json",
            }
        });
        const data = await response.json();

        if (!data || !data.priceInfo) {
            alert("Invalid stock symbol or data not available!");
            return;
        }

        const stock = data.priceInfo;
        
        // Get current & previous prices
        const currentPrice = stock.lastPrice;
        const prevClose = stock.previousClose;

        // Calculate % changes
        const weeklyChange = ((currentPrice - prevClose) / prevClose) * 100;
        const monthlyChange = ((currentPrice - stock.weekHighLow.min) / stock.weekHighLow.min) * 100;
        const yearlyChange = ((currentPrice - stock.weekHighLow.max) / stock.weekHighLow.max) * 100;

        // Update table
        document.getElementById("stockData").innerHTML = `
            <tr>
                <td>${symbol}</td>
                <td>${currentPrice.toFixed(2)}</td>
                <td>${weeklyChange.toFixed(2)}%</td>
                <td>${monthlyChange.toFixed(2)}%</td>
                <td>${yearlyChange.toFixed(2)}%</td>
            </tr>
        `;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Failed to retrieve stock data. NSE India may be blocking the request.");
    }
}
