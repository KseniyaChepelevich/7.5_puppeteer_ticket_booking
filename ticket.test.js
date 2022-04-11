const {
    clickElement,
    clickDayWeek
} = require("./lib/commands");

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
    beforeAll(async () => {
        page = await browser.newPage();
        await page.goto("http://qamid.tmweb.ru/client/index.php", {
            timeout: 60000
        });
        await clickElement(page, "body > nav > a:nth-child(2) > span.page-nav__day-number");

        await clickElement(page, "main > section:nth-child(3) > div:nth-child(2) > ul > li > a");


        await page.waitForSelector("h1");

        await clickElement(page, "section div:nth-child(8) > span:nth-child(6)");


        await clickElement(page, "button");


        await page.waitForSelector("h1");

        await clickElement(page, "button");


        await page.waitForSelector("h1");
    }, 60000);

    test("should book one seat", async () => {
        await clickElement(page, "nav > a:nth-child(5) > span.page-nav__day-week")

        await clickElement(page, "main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");

        await page.waitForSelector("h1");

        await clickElement(page, "section  div:nth-child(1) > span.buying-scheme__chair.buying-scheme__chair_vip");

        await clickElement(page, "button");

        await page.waitForSelector("h1");

        const actual = await page.$eval("main > section > div > p:nth-child(2) > span", text => text.textContent);
        const expected = "1/2";

        const actualPrise = await page.$eval("main > section > div > p:nth-child(6) > span", text => text.textContent);
        const expectedPrise = "350";

        expect(actual).toContain(expected);
        expect(actualPrise).toContain(expectedPrise);
    }, 60000);

    test("should book two seats", async () => {
        await clickElement(page, "nav > a:nth-child(6)");

        await clickElement(page, "main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");

        await page.waitForSelector("h1");

        await clickElement(page, "main > section  div:nth-child(5) > span:nth-child(5)");
        await clickElement(page, "main > section  div:nth-child(5) > span:nth-child(6)");

        await clickElement(page, "button");

        await page.waitForSelector("h1");

        const actual = await page.$eval("main > section > div > p:nth-child(2) > span", text => text.textContent);
        const expected = "5/5, 5/6";

        const actualPrise = await page.$eval("main > section > div > p:nth-child(6) > span", text => text.textContent);
        const expectedPrise = "200";

        expect(actual).toContain(expected);
        expect(actualPrise).toContain(expectedPrise);
    }, 60000);

    test.skip("should not book", async () => {
        await clickElement(page, "body > nav > a:nth-child(2) > span.page-nav__day-number");

        await clickElement(page, "main > section:nth-child(3) > div:nth-child(2) > ul > li > a");

        await page.waitForSelector("h1");

        await clickElement(page, "section div:nth-child(8) > span:nth-child(6)");

        const actual = await page.$eval(
            "h2",
            (text) => text.textContent
        );
        const expected = "Фильм 3";
        expect(actual).toContain(expected);
    }, 60000);
})