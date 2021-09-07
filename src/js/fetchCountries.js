export default fetchCountries;

async function fetchCountries(name) {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`
  );
  return await response.json();
}
