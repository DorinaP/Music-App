import { page, render } from "../utility/lib.js";

const root = document.getElementById('main-content');

export function renderer(ctx, next) {
    ctx.render = (content) => render(content, root);

    next();
}

