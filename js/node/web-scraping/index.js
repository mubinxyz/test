const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({
      // headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(
      "https://www.amazon.com/s?i=specialty-aps&bbn=16225007011&rh=n%3A16225007011%2Cn%3A172456&ref=nav_em__nav_desktop_sa_intl_computer_accessories_and_peripherals_0_2_6_2",
      { waitUntil: "networkidle0" }
    );

    await page.screenshot({ path: "example.png", fullPage: true });

    const productsHandle = await page.$$(
      "span[data-component-type='s-search-results'] > .s-result-list > div"
    );

    let items = [];
    // loop thru all handles
    for (const productHandle of productsHandle) {
      let title = "Null";
      let price = "Null";
      let image = "Null";

      try {
        title = await productHandle.evaluate(
          (el) => el.querySelector("h2 > a > span").textContent,
          productHandle
        );

        price = await productHandle.evaluate(
          (el) => el.querySelector(".a-price > .a-offscreen").textContent,
          productHandle
        );

        image = await productHandle.evaluate(
          (el) => el.querySelector(".s-image").getAttribute("src"),
          productHandle
        );

        // console.log(title + "\n" + price + "\n" + image + "\n");
        if (title !== "Null") {
          items.push({ title, price, image });
        }
      } catch (err) {}
    }
    console.log(items);
    console.log(items.length);

    await browser.close();
  } catch (error) {
    // Handle any errors or exceptions
    console.error(error);
  }
})();
