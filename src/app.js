import { getUserData } from "./utility/userUtil.js";
import { page } from "./utility/lib.js";
import { logout } from "./utility/logout.js";

import { showHome } from "./views/homeView.js";
import { showRegister } from "./views/registerView.js";
import { showLogin } from "./views/loginView.js";
import { showCatalog } from "./views/catalogView.js";
import { showDetails } from "./views/detailsView.js";
import { showCreate } from "./views/createView.js";
import { showEdit } from "./views/editView.js";
import { showSearch } from "./views/searchView.js";

import { updateNav } from "./midlewares/updateNav.js";
import { renderer } from "./midlewares/render.js";


page(renderer);
page(updateNav);
page('/', showHome);
page('/index.html', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/logout', logout);
page('/catalog', showCatalog);
page('/details/:id', showDetails);
page('/create', showCreate);
page('/edit/:id', showEdit);
page('/search', showSearch);

page.start();