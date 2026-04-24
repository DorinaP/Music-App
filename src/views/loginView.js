import { userService } from '../service/userService.js';
import { createSubmitHandler } from '../utility/submiter.js';
import { html } from '../utility/lib.js';


const loginTemplate = (onLogin, errMsg, errors) => html`
    <section id="loginPage">
        <form @submit=${onLogin}>
            <fieldset>
                <legend>Login</legend>
                ${errMsg ? html ` <div class="error">${errMsg}</div>` : null}
                <label for="email" class="vhide">Email</label>
                <input id="email" class=${"email" + (errors.email ? ' is-invalid' : '')} name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class=${"password" + (errors.password ? ' is-invalid' : '')} name="password" type="password" placeholder="Password">

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export function showLogin(ctx) {
    update(null, {});

    function update(errMsg, errors) {
        ctx.render(loginTemplate(createSubmitHandler(onLogin), errMsg, errors));
    }

    async function onLogin(data, formRef) {
        let { email, password } = data;
        
        try {
            if(!email || !password) {
                throw {
                    error: new Error('All fields are required!'),
                    errors: {
                        email: email == '',
                        password: password == '',
                    }
                }
            }

            await userService.login({email, password}); 
            formRef.reset();
            ctx.updateNav();
            ctx.page.redirect('/'); 

        }catch(err) {
            let message = err.message || err.error.message;
            update(message, err.errors || {});
        }
    }
}