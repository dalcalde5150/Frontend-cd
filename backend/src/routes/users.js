const Router = require('koa-router');
const router = new Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post('register', '/register', async (ctx) => {
    const salt = await bcrypt.genSalt(10);
    const user = await ctx.orm.User.create({
        username: ctx.request.body.username,
        encrypted_password: await bcrypt.hash(ctx.request.body.password, salt),
        email: ctx.request.body.email
    });
    ctx.status = 201;
    ctx.body = {'message': 'Usuario creado exitosamente', 'id': user.id};
});

router.post('login', '/login', async (ctx) => {
    try{
        const user = await ctx.orm.User.findOne({
            where: { 
                username: ctx.request.body.username
            }
        });
        if (!user) {
            ctx.throw('Nombre de usuario no existe', 404);
        }
        const validPassword = await bcrypt.compare(ctx.request.body.password, user.encrypted_password);
        if (!validPassword) {
            ctx.throw('Contraseña incorrecta', 401);
        }

        const new_session = await ctx.orm.Session.create({
            user_id: user.id
        });

        //ctx.session.sessionid = new_session.id;
        ctx.cookies.set('sessionid', new_session.id, { httpOnly: true, secure: true, sameSite: "none", secureProxy: true });

        ctx.status = 201;
        ctx.body = {'message': 'Usuario logueado exitosamente', 'id': user.id};
    }
    catch (error) {
        ctx.throw(400, error.message);
    }
});

router.delete('logout', '/logout', async (ctx) => {
    try{
        await ctx.orm.Session.destroy({
            where: {
                id: ctx.session.sessionid
            }
        });

        ctx.session.sessionid = null;

        ctx.status = 200;
        ctx.body = {'message': 'Usuario deslogueado exitosamente'};
    }
    catch (error) {
        ctx.throw(400, error.message);
    }
});


module.exports = router;