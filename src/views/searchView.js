import { searchAlbums } from '../service/dataService.js';
import { html } from '../utility/lib.js';

const searchTemplate = (onSearch, matches) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
        ${matches.length > 0 ? html` ${matches.map(matchTemplate)}` 
        : html`<p class="no-result">No result.</p>`}
    </div>
</section>
`;

const matchTemplate = (album) => html`
    <div class="card-box">
    <img src='${album.imgUrl}'>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: ${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
            <a href='/details/${album._id}' id="details">Details</a>
        </div>
    </div>
    </div>
`;

export async function showSearch(ctx) {

    update();

    function update(matches) {
        ctx.render(searchTemplate(onSearch, matches || {}));
    }
    
    async function onSearch(e) {
        e.preventDefault();

        let input = document.getElementById('search-input');
        if(input.value != '') {
            let matches = await searchAlbums(input.value);
            update(matches)
        }
        input.value = '';
    }
}