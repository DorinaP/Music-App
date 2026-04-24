import { dataService } from '../service/dataService.js';
import { createSubmitHandler } from '../utility/submiter.js';
import { html } from '../utility/lib.js';

const createTemplate = (onCreate, errMsg, errors) => html`
    <section class="createPage">
        <form @submit=${onCreate}>
            <fieldset>
                <legend>Add Album</legend>
                ${errMsg ? html`<div class="error">${errMsg}</div>` : null}
                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" class=${"name" + (errors.name ? ' is-invalid' : '')} name="name" type="text" placeholder="Album name">

                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" class=${"imgUrl" + (errors.imgUrl ? ' is-invalid' : '')} name="imgUrl" type="text" placeholder="Image Url">

                    <label for="price" class="vhide">Price</label>
                    <input id="price" class=${"price" + (errors.price ? ' is-invalid' : '')} name="price" type="text" placeholder="Price">

                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" class=${"releaseDate" + (errors.releaseDate ? ' is-invalid' : '')} name="releaseDate" type="text" placeholder="Release date">

                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" class=${"artist" + (errors.artist ? ' is-invalid' : '')} name="artist" type="text" placeholder="Artist">

                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" class=${"genre" + (errors.genre ? ' is-invalid' : '')} name="genre" type="text" placeholder="Genre">

                    <label for="description" class="vhide">Description</label>
                    <textarea class=${"description" + (errors.description ? ' is-invalid' : '')} name="description" placeholder="Description"></textarea>

                    <button class="add-album" type="submit">Add New Album</button>
                </div>
            </fieldset>
        </form>
    </section>
`;

export function showCreate(ctx) {
    update(null, {});

    function update(errMsg, errors) {
        ctx.render(createTemplate(createSubmitHandler(onCreate), errMsg, errors));
    }
    
    async function onCreate(data, formRef) {

        const missing = Object.entries(data).filter(([k, v]) => k !== 'material' && v.trim() === '');

        try {
            if(missing.length > 0) {
                const errors = missing.reduce((a, [k]) => Object.assign(a, {[k]: true}), {});
                
                throw {
                    error: new Error('All fields are required!'),
                    errors
                }
            }

            let album = await dataService.createAlbum(data);
            formRef.reset();
            ctx.page.redirect(`/details/${album._id}`); 

        }catch(err) {
            const message = err.message || err.error.message;
            update(message, err.errors || {});
        }
    }
}