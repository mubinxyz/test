const { Telegraf } = require("telegraf");
const config = require("config");
const { startMessage, symbolDetail, compSymbols } = require("./messageHandler");
const symbolList = require("./data.json");

const { symbolButtonList } = require("./transformer");

const botToken = config.get("botToken");
const bot = new Telegraf(botToken);

// commands
bot.start((ctx) => ctx.reply(startMessage()));

bot.command("symbol_list", (ctx) => {
  ctx.reply(
    "list of sahams are in buttons, you can choose to see the details. ",
    {
      reply_markup: {
        keyboard: symbolButtonList(symbolList),
      },
    }
  );
});

//
bot.on("text", (ctx) => {
  const text = ctx.message.text;

  if (text.includes(":")) {
    const symbol1 = text.split(":")[0];
    const symbol2 = symbolList[text.split(":")[1]];

    if (symbol1 && symbol2) {
      ctx.reply(compSymbols(symbol1, symbol2));
    } else {
      ctx.reply("One or both symbols couldn't be found.");
    }
  } else if (text.length <= 8 && symbolList[text]) {
    const symbol = symbolList[text];
    ctx.reply(symbolDetail(symbol), {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "saham chart",
              callback_data: "chart_" + text,
            },
            {
              text: "is this saham good?",
              callback_data: "question_" + text,
            },
          ],
        ],
      },
    });
  } else {
    ctx.reply("saham couldn't be found. ");
  }
});

bot.action(/^chart_/, (ctx) => {
  const text = ctx.match.input.split("_")[1];
  ctx.replyWithPhoto(
    { source: "./chart.jpg" },
    { caption: "the chart of the saham. " }
  );
});

bot.launch();
