const Router = require('koa-router');
const router = new Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// router.post('login', '/login', async (ctx) => {
//     try{
//         const user = await ctx.orm.User.findOne({
//             where: { 
//                 username: ctx.request.body.username
//             }
//         });
//         if (!user) {
//             ctx.throw(400, 'Nombre de usuario incorrecto');
//         }
//         const validPassword = await bcrypt.compare(ctx.request.body.password, user.password);
//         if (!validPassword) {
//             ctx.throw(400, 'Contraseña incorrecta');
//         }
//         ctx.status = 200;
//         ctx.body = {'message': 'Usuario logueado exitosamente', 'id': user.id};
//     } catch (error) {
//         ctx.throw(400, error.message);
//     }
// });

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
            ctx.throw(400, 'Nombre de usuario incorrecto');
        }
        const validPassword = await bcrypt.compare(ctx.request.body.password, user.encrypted_password);
        if (!validPassword) {
            ctx.throw(400, 'Contraseña incorrecta');
        }
        ctx.status = 200;
        ctx.body = {'message': 'Usuario logueado exitosamente', 'id': user.id};
    }
    catch (error) {
        ctx.throw(400, error.message);
    }
});


module.exports = router;