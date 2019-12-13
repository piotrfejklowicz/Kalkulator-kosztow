// Main
pobierzKursEuro();

// Functions
function przeliczNaPln(kwota) 
{
    let result = kwota * kursEur;
    document.querySelector('[name="pricePln"]').value = result.toFixed(2);
    obliczWynik();
};
function przeliczNaEur(kwota) 
{
    let result = kwota / kursEur;
    document.querySelector('[name="priceEur"]').value = result.toFixed(2);
    obliczWynik();
};
function pobierzKursEuro() 
{
    const url = "http://api.nbp.pl/api/exchangerates/rates/a/eur/"
    let ajax = new XMLHttpRequest();
    ajax.open("GET", url, true);
    ajax.send(null);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && (ajax.status == 200)) {
            let obj = JSON.parse(ajax.responseText);
            kursEur = obj.rates[0].mid;
            document.querySelector('#kursEuro').textContent = kursEur;
            return kursEur;
        }
    }
}
function calcIsValid(result, priceEur, pricePln)
{
    if (priceEur < 0.01 || pricePln < 0.01)
        return "";
    if (isNaN(priceEur.toString()) || isNaN(pricePln.toString()))
        return "Nieprawidłowa cena pojazdu";
    if (isNaN(result.toString()) || result < 0.01)
        return "Błąd! Sprawdź wprowadzoną cenę pojazdu";
    return true;
}
function numberWithSpaces(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(",");
}
function obliczWynik() 
{
    const priceEur = parseFloat(document.querySelector('[name="priceEur"]').value);
    const pricePln = parseFloat(document.querySelector('[name="pricePln"]').value);
    const transport = parseFloat(document.querySelector('[name="transport"]').value);
    const akcyza = parseFloat(document.querySelector('[name="akcyza"]').value);
    let result = pricePln + transport + (pricePln * akcyza / 100);
    let isValid = calcIsValid(result, priceEur, pricePln);
    if ( isValid != true )
    {
        result = isValid;
    }
    else
    {
        result = result.toFixed(2).toString();
        result = numberWithSpaces(result);
        if ( transport > 0 )
            result += " zł";
        else
            result += " zł + transport <small>(wycena indywidualna)</small>";
    }
        
    document.querySelector('#totalPrice').innerHTML = result;
};