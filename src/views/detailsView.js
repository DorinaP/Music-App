import { dataService } from '../service/dataService.js';
import { html, until } from '../utility/lib.js';
import { userUtil } from '../utility/userUtil.js';


const detailsTemplate = (curAlbum, onDelete, isOwner, userData) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src='${curAlbum.imgUrl}'>
            </div>
            <div class="albumInfo">
                <div class="albumText">
                    <h1>Name: ${curAlbum.name}</h1>
                    <h3>Artist: ${curAlbum.artist}</h3>
                    <h4>Genre: ${curAlbum.genre}</h4>
                    <h4>Price: ${curAlbum.price}</h4>
                    <h4>Date: ${curAlbum.releaseDate}</h4>
                    <p>Description: ${curAlbum.description}</p>
                </div>

            ${(userData && isOwner) ? html`
                <div class="actionBtn">
                    <a href="/edit/${curAlbum._id}" class="edit">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                </div>`
            : null}   
            </div>
        </div>
    </section>
`;

export async function showDetails(ctx) {
    
    let userData = userUtil.getUserData();
    let albumId = ctx.params.id;
    let curAlbum = await dataService.albumDetails(albumId);
    let isOwner = userData?.id == curAlbum._ownerId;

    update();
    
    async function update() {
        ctx.render(detailsTemplate(curAlbum, onDelete, isOwner, userData));

    }

    async function onDelete(e) {
        e.preventDefault();
        const choice = confirm('Are you sure you want to delete this item?');
        if(choice) {
            await dataService.deleteAlbum(albumId);
            ctx.page.redirect('/catalog');
        }
    }
}

