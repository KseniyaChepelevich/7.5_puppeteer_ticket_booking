const { clickElement } = require("./lib/commands");

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
  });

  afterEach(() => {
    page.close();
});

describe("Ticket booking", () => {
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("http://qamid.tmweb.ru/client/index.php", {
            timeout: 60000
        });
    });
  
    test("should book one seat", async () => {
        await clickElement(page, "nav > a:nth-child(6) > span.page-nav__day-week")

        await clickElement(page, "main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
        
        page.waitForNavigation("http://qamid.tmweb.ru/client/hall.php");
        await page.waitForSelector("h1");

        await clickElement(page, "section  div:nth-child(1) > span.buying-scheme__chair.buying-scheme__chair_vip");
        
        await clickElement(page, "button");
        
        page.waitForNavigation("http://qamid.tmweb.ru/client/payment.php");
        await page.waitForSelector("h1");

        const actual = await page.$eval("main > section > div > p:nth-child(2) > span", text => text.textContent);
        const expected = "1/2";
        expect(actual).toContain(expected);
    }, 60000);

    test("should book two seats", async () => {
        await clickElement(page, "nav > a:nth-child(2) > span.page-nav__day-number"); 

        await clickElement(page, "main > section:nth-child(3) > div:nth-child(2) > ul > li > a"); 

        page.waitForNavigation("http://qamid.tmweb.ru/client/hall.php"); 
        await page.waitForSelector("h1");

        await clickElement(page, "main > section  div:nth-child(5) > span:nth-child(5)"); 
        await clickElement(page, "main > section  div:nth-child(5) > span:nth-child(6)"); 

        await clickElement(page, "button"); 

        page.waitForNavigation("http://qamid.tmweb.ru/client/payment.php");
        await page.waitForSelector("h1");

        const actual = await page.$eval("main > section > div > p:nth-child(2) > span", text => text.textContent);
        const expected = "5/5, 5/6"; expect(actual).toContain(expected);
    }, 60000);

    test("should not book", async () => {
        await clickElement(page, "nav > a:nth-child(3) > span.page-nav__day-week");
        
        await clickElement(page, "main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
        
        page.waitForNavigation("http://qamid.tmweb.ru/client/hall.php");
        await page.waitForSelector("h1");

        await clickElement(page, "main > section  div:nth-child(3) > span:nth-child(4)");
        await clickElement(page, "main > section  div:nth-child(3) > span.buying-scheme__chair.buying-scheme__chair_vip.buying-scheme__chair_taken");
        
        await clickElement(page, "button");
        
        page.waitForNavigation("http://qamid.tmweb.ru/client/payment.php");
        await page.waitForSelector("h1");

        const actual = await page.$eval(
            "main > section > div > p:nth-child(2) > span",
            (text) => text.textContent
        );
        const expected = "3/4";
        expect(actual).toContain(expected);
    }, 60000);
})