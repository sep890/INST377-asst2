

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaurants.push(...data))

function findMatches(wordToMatch, restaurants) {
  return restaurants.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.zip.match(regex) // filter by zip code
  });

}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const restZip = place.zip.replace(regex, `<span class="hl">${this.value}</span>`) // repeat this for other returns
    const restName = place.name.replace(regex, `<span class="hl">${this.value}</span>`)
    const restAdd = place.address_line_1.replace(regex, `<span class="hl">${this.value}</span>`)
    const restCat = place.category.replace(regex, `<span class="hl">${this.value}</span>`)
    const restCity = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const restState = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${restName}</span><br>
        <span class="category">${restCat}</span><br>
        <span class="address1">${restAdd}</span><br>
        <span class="address2">${restCity}, ${restState} ${restZip}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}     

const searchInput = document.querySelector('.textinput');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);