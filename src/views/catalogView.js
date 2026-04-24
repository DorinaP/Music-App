import { dataService } from '../service/dataService.js';
import { html, until } from '../utility/lib.js';

const catalogTemplate = (allAlbums) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>
        ${allAlbums ? html`${allAlbums.map(itemTemplate)}` 
        : html`<p>No Albums in Catalog!</p>`}
    </section>
`;

const itemTemplate = (album) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
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

export async function showCatalog(ctx) {
    let allAlbums = await dataService.getAllAlbums();
    ctx.render(catalogTemplate(allAlbums));
}