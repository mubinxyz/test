const { addUnit } = require("./MathUtils");

module.exports.startMessage = () => {
  return `jello, 
i'm sahamju bot, 
give me the name of any saham you want so i can send you it's info.
my capabilities: 
/symbol_list
/best_symbols
/com_symbol


@saham_testbot`;
};

const now = new Date();
module.exports.symbolDetail = (data) => {
  return `
سهم: "${data.symbol}"
حجم معاملات: ${data.volume}

درصد خرید حقیقی: ${data.realBuyPercent}
درصد فروش حقیقی: ${data.realSellPercent}
ورود و خروج پول حقیقی: ${addUnit(data["enter/exit"])}
حجم میانگین ماه: ${data.monthVolumeAvg}

سرانه خرید: ${addUnit(data.buyS)}
سرانه فروش: ${data.sellS}
قدرت خریدار به فروشنده: ${data.power}

درصد معاملات: ${data.percent}
درصد پایانی: ${data.finalPercent}

${now.getHours()} : ${now.getMinutes()}

`;
};

function compGenerator(symbol1, symbol2, key, propertyTitle) {
  if (symbol1[key] !== undefined && symbol2[key] !== undefined) {
    if (symbol1[key] > symbol2[key]) {
      return `${propertyTitle} ${symbol1.symbol} is more than ${symbol2.symbol}`;
    } else {
      return `${propertyTitle} ${symbol2.symbol} is more than ${symbol1.symbol}`;
    }
  } else {
    return `One or both symbols couldn't be found for comparison.`;
  }
}

module.exports.compSymbols = (symbol1, symbol2) => {
  return `
  سهام اول: ${symbol1 ? symbol1.symbol : 'Undefined'}
  حجم معاملات: ${symbol1 ? symbol1.volume : 'Undefined'}
  // Add other properties of symbol1...

  سهام دوم: ${symbol2 ? symbol2.symbol : 'Undefined'}
  حجم معاملات: ${symbol2 ? symbol2.volume : 'Undefined'}
  // Add other properties of symbol2...

  حجم معاملات:  ${compGenerator(symbol1, symbol2, "volume", "حجم معاملات")}
  ${new Date().getHours()} : ${new Date().getMinutes()}
  `;
};