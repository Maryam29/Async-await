// axios Promise based HTTP client for the browser and node.js
// 23 USD -> CAD, 23 USD is worth 28 CAD. CAD can spend these in the following countries.

const axios = require('axios');

const getExchangeRate = (from, to) =>{
	return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response)=>{
		return response.data.rates[to];
	});
}
getCountries = (currencyCode) => {
	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
		return response.data.map((country) => {
			return country.name 
		});
	})
}
const convertCurrency = (from, to, amount) => {
	var currency_countries;
	return getCountries(to).then((countries) => {
		currency_countries = JSON.stringify(countries); //console.log(countries);
		return getExchangeRate('USD','EUR').then((rate) => {
			const exchangedAmount = amount * rate
			return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can spend these in the following countries ${currency_countries}`;
	 
})
})
}

const convertCurrencyAlt = async(from, to, amount) => {
	var currency_countries = await getCountries(to);
	var rate = await getExchangeRate('USD','EUR');
	const exchangedAmount = amount * rate;
	return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can spend these in the following countries ${currency_countries}`;
	 
}

convertCurrencyAlt('USD','EUR',23).then((res) => {
	console.log(res);
}).catch((e) => console.log(e))
// getExchangeRate('USD','EUR').then((rate) => {
	// console.log(rate);
// });
// getCountries('EUR').then((countries) => {
	// console.log(countries);
// });
