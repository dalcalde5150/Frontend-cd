module.exports = async (ctx, next) => {
    if (!ctx.session.sessionid) {
      ctx.throw('No hay sesión activa', 401);
    }

    try {
        const session = await ctx.orm.Session.findOne({
            where: {
                id: ctx.session.sessionid
            }
        });
        if (!session) {
            ctx.throw('Sesión no existe', 404);
        }
        await next();
    } catch (error) {
        ctx.throw(error.message);
    } 
};