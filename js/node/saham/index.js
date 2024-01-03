const { Telegraf } = require("telegraf");

const bot = new Telegraf("6981258920:AAGgH6wMZjjLn5OeZPPW8aoM2qSExNA0GIU");

bot.start(ctx => {
    console.log(ctx);
    ctx.reply("hello there! i'm a test bot .");

});

const getUserRole = (user) => {
    const roles = ['silver', 'gold', 'bronze'];
    const index = Math.floor(Math.random()*roles.length);
    return roles[index]

}

bot.use((ctx, next) => {
    ctx.reply("hi there, this is from bot.use ", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "a button",
                        callback_data: "buttonClick",
                    }
                ]
            ]
        }
    });
    if (ctx.message && ctx.message.from) {
        const role = getUserRole(ctx.message.from);
        ctx.state.role = role;
    }
    next();
});

bot.action("buttonClick", async ctx => {
    const photoPath = "D:\\programming\\test\\js\\node\\saham\\assets\\img\\photo_2023-10-26_12-58-35.jpg";
    await ctx.replyWithPhoto({source: photoPath}, {
        caption: "this is photo!",
    });
});


bot.settings(ctx => {
    ctx.reply("settings");
});

bot.help(ctx => {
    ctx.reply("help");
});

bot.command( "products",  ctx => {
    const role = ctx.state.role;
    ctx.reply(`you bought ${role} subscriptin, `);
});

bot.hashtag( "ads", async ctx => {
    
    await ctx.deleteMessage(ctx.message_id);
    const tempMessage = await ctx.reply(`don't send that agian ${ctx.message.from.first_name}`);
    setTimeout(() => {
        ctx.deleteMessage(tempMessage.message_id);
    }, 3500);
});
bot.hears(/.products./, ctx => {
    ctx.reply("product of making telegram bot");
});

// bot.on( "text", ctx => ctx.reply("hello, you sent a message. "));
bot.on("voice", ctx => ctx.reply("hello, you sent an audio. "));

// bot.mention("@mubinxyz", ctx => ctx.reply("hi there! mubin!"))

bot.on("edited_message", ctx => {
    
    ctx.reply("oh, you just edited a message. ");
});

bot.launch();