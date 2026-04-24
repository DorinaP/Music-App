import { userUtil } from "../utility/userUtil.js";

export function updateNav(ctx, next) {
    updateNavView();
    ctx.updateNav = updateNavView;
    next();
}

export function updateNavView() {
    let userData = userUtil.getUserData();

    if(userData != null) {
        [...document.querySelectorAll('#guest')].forEach(x => x.style.display = 'none');
        [...document.querySelectorAll('#user')].forEach(x => x.style.display = 'inline');
    }else {
        [...document.querySelectorAll('#guest')].forEach(x => x.style.display = 'inline');
        [...document.querySelectorAll('#user')].forEach(x => x.style.display = 'none');
    }
}