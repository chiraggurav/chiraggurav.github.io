async function fetchStockData() {
    const symbol = document.getElementById("stockSymbol").value.toUpperCase();
    if (!symbol) {
        alert("Please enter a stock symbol!");
        return;
    }

    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.quoteResponse || data.quoteResponse.result.length === 0) {
            alert("Invalid stock symbol!");
            return;
        }

        const stock = data.quoteResponse.result[0];
        
        // Get price changes
        const currentPrice = stock.regularMarketPrice;
        const weeklyChange = ((currentPrice - stock.fiftyTwoWeekLow) / stock.fiftyTwoWeekLow) * 100;
        const monthlyChange = ((currentPrice - stock.fiftyTwoWeekHigh) / stock.fiftyTwoWeekHigh) * 100;
        const yearlyChange = ((currentPrice - stock.regularMarketPreviousClose) / stock.regularMarketPreviousClose) * 100;

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
        alert("Failed to retrieve stock data. Try again!");
    }
}