const Router = require('koa-router');
const router = new Router();

router.post('login', '/login', async (ctx) => {
    // try{
    //     const user = await ctx.orm.User.findOne({
    //         where: { 
    //             username: ctx.request.body.username
    //         }
    //     });
    //     if (!user) {
    //         ctx.throw(400, 'Nombre de usuario incorrecto');
    //     }
    //     const validPassword = await bcrypt.compare(ctx.request.body.password, user.password);
    //     if (!validPassword) {
    //         ctx.throw(400, 'Contraseña incorrecta');
    //     }
    //     ctx.status = 200;
    //     ctx.body = {'message': 'Usuario logueado exitosamente', 'id': user.id};
    // } catch (error) {
    //     ctx.throw(400, error.message);
    // }
});

router.post('register', '/register', async (ctx) => {
    
});

module.exports = router;