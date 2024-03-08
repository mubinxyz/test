const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp1",
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(
      "https://www.backmarket.com/en-us/l/computers-laptops/41f464b5-9356-48d3-86c3-a2bf52ced60e",
      { waitUntil: "load" }
    );

    await page.screenshot({ path: "example2.png", fullPage: true });

    const productsHandle = await page.$$("div > div.relative > div > a");

    let pageNum = 1;
    let isThereNextPageBtn = true;
    console.log(isThereNextPageBtn);
    while (isThereNextPageBtn) {
      // logic
      items = [];
      for (const productHandle of productsHandle) {
        let title = "Null";
        // let price = "Null";
        // let image = "Null";

        try {
          title = await productHandle.evaluate(
            (el) => el.querySelector("div > h2").textContent,
            productHandle
          );

          // price = await productHandle.evaluate(
          //   (el) => el.querySelector(".a-price > .a-offscreen").textContent,
          //   productHandle
          // );

          // image = await productHandle.evaluate(
          //   (el) => el.querySelector(".s-image").getAttribute("src"),
          //   productHandle
          // );

          // console.log(title + "\n" + price + "\n" + image + "\n");
          if (title !== "Null") {
            items.push({ title });
          }
        } catch (err) {}
      }
      console.log(items);
      console.log(items.length);

      let items = [];
      // loop thru all handles

      isThereNextPageBtn =
        (await page.$(
          `nav[data-test='pagination'] > a[aria-label='Navigate to page ${
            pageNum + 1
          }']`
        )) !== null;

      pageNum++;

      console.log(items);
      console.log(items.length);

      pageNum++;
    }

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
