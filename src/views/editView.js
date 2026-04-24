import { dataService } from '../service/dataService.js';
import { createSubmitHandler } from '../utility/submiter.js';
import { html, until } from '../utility/lib.js';


const editTemplate = (detailsPromise) => html`

    ${until(detailsPromise, html`<p>Loading &hellip;</p>`)}

`;

const formTemplate = (curAlbum, onEdit, errMsg, errors) => html`
<section class="editPage">
    <form @submit=${onEdit}>
        <fieldset>
            <legend>Edit Album</legend>
            ${errMsg ? html`<div class="error">${errMsg}</div>` : null}
            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" class=${"name" + (errors.name ? ' is-invalid' : '')} name="name" type="text" value="${curAlbum.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" class=${"imgUrl" + (errors.imgUrl ? ' is-invalid' : '')} name="imgUrl" type="text" value="${curAlbum.imgUrl}">

                <label for="price" class="vhide">Price</label>
                <input id="price" class=${"price" + (errors.price ? ' is-invalid' : '')} name="price" type="text" value="${curAlbum.price}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" class=${"releaseDate" + (errors.releaseDate ? ' is-invalid' : '')} name="releaseDate" type="text" value="${curAlbum.releaseDate}">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" class=${"artist" + (errors.artist ? ' is-invalid' : '')} name="artist" type="text" value="${curAlbum.artist}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" class=${"genre" + (errors.genre ? ' is-invalid' : '')} name="genre" type="text" value="${curAlbum.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea class=${"description" + (errors.description ? ' is-invalid' : '')} name="description" rows="10" cols="10" .value="${curAlbum.description}"></textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>
`;

export async function showEdit(ctx) {
    let albumId = ctx.params.id;
    let detailsPromise = dataService.albumDetails(albumId);

    update(detailsPromise, null, {});

    function update(detailsPromise, errMsg, errors) {
        ctx.render(editTemplate(loadTeam(detailsPromise, errMsg, errors)));   
    }

    async function loadTeam(detailsPromise, errMsg, errors) {
        const curAlbum = await detailsPromise;
        return formTemplate(curAlbum, createSubmitHandler(onEdit), errMsg, errors);
    }
    
    async function onEdit(data, formRef) {

        const missing = Object.entries(data).filter(([k, v]) => k !== 'material' && v.trim() === '');

        try {
            if(missing.length > 0) {
                const errors = missing.reduce((a, [k]) => Object.assign(a, {[k]: true}), {});
                throw {
                    error: new Error('All fields are required!'),
                    errors
                }
            }

            let album = await dataService.updateAlbum(albumId, data);
            formRef.reset();
            ctx.page.redirect(`/details/${album._id}`); 

        }catch(err) {
            const message = err.message || err.error.message;
            update(data, message, err.errors || {});
        }
    }
}