'use strict';

require('dotenv').config();
const Router = require('koa-router');
const roulette = require('./games/roulette.js');

const router = new Router();

router
    .get('/', async ctx => {
        await ctx.render('index');
    })
    .get('/roulette', async ctx => {
        await ctx.render('roulette_game');
    })
    .post('/spin', async ctx => {
        ctx.response.body = await roulette.spin(ctx.request.body.bets);
    });


exports.routes = router.routes();
