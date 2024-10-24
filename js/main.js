async function getCryptoPrice(crypto) {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd")
    const data = await resposnse.json();
    return data[crypto] ? data[crypto].usd : null;
}

document.getElementById("addCryptoForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const cryptoName = document.getElementById("cryptoName").value;
    const amount = document.getElementById("amount").value;

    const table = document.getElementById("portfolioTable").getElementByTagname("tbody")[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = cryptoName;
    cell2.innerHTML = amount;
    cell3.innerHTML = 'Loading...';
    cell4.innerHTML = 'Loading...';
    cell5.innerHTML = '<button class="delete-btn">Delete</button>';

    const price = await getCryptoPrice(cryptoName);
    if (price) {
        cell3.innerHTML = "$${price}";
        cell4.innerHTML = "$${(price * amount).toFixed(2)}";
    } else {
        cell3.innerHTML = 'Not available';
        cell4.innerHTML = 'Not available';
    }

    document.getElementById("cryptoName").value = '';
    document.getElementById("amount").value = '';

    cell5.querySelector('.delete-btn').addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex - 1);
    });
});