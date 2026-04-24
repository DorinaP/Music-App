import { userService } from '../service/userService.js';
import { createSubmitHandler } from '../utility/submiter.js';
import { html } from '../utility/lib.js';


const registerTemplate = (onRegister, errMsg, errors) => html`
    <section id="registerPage">
        <form @submit=${onRegister}>
            <fieldset>
                <legend>Register</legend>
                ${errMsg ? html` <div class="error">${errMsg}</div> `: null}
                <label for="email" class="vhide">Email</label>
                <input id="email" class=${"email" + (errors.email ? ' is-invalid' : '')} name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class=${"email" + (errors.password ? ' is-invalid' : '')} name="password" type="password" placeholder="Password">

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class=${"conf-pass" + (errors.repass ? ' is-invalid' : '')} name="repass" type="password" placeholder="Confirm Password">

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export function showRegister(ctx) {
    update(null, {});

    function update(errMsg, errors) {
        ctx.render(registerTemplate(createSubmitHandler(onRegister), errMsg, errors));
    }
    
    async function onRegister(data, formRef) {
        let { email, password, repass } = data;

       try{

            if(email == '' || password == '' || repass == '') {
                throw {
                    error: new Error('All fields are required!'),
                    errors: {
                        email: email == '',
                        password: password == '',
                        repass: repass == ''
                    }
                }
            };

            if(password != repass) {
                throw {
                    error: new Error('Passwords do not match!'),
                    errors: {
                        password: true,
                        repass: true
                    }
                }
            };

            await userService.register({email, password});
            formRef.reset();
            ctx.updateNav();
            ctx.page.redirect('/');

        }catch(err) {
            let message = err.message || err.error.message;
            update(message, err.errors || {});
        }

    }
}

