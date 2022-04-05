let page;

describe("Ticket booking", () => {
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("http://qamid.tmweb.ru/client/index.php", {
            timeout: 20000
        });
    });

    afterEach(() => {
        page.close();
    });

    test("should book one seat", async () => {
        const firstDate = await page.$("nav > a:nth-child(6) > span.page-nav__day-week");
        await firstDate.click();

        const firstMovie = await page.$("main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
        await firstMovie.click();

        page.waitForNavigation("http://qamid.tmweb.ru/client/hall.php");
        await page.waitForSelector("h1");

        const freeChair = await page.$("section  div:nth-child(1) > span.buying-scheme__chair.buying-scheme__chair_vip");
        await freeChair.click();

        const acceptionButton = await page.$(".acceptin-button");
        await acceptionButton.click();

        page.waitForNavigation("http://qamid.tmweb.ru/client/payment.php");
        await page.waitForSelector("h1");

        const actual = await page.$eval("main > section > div > p:nth-child(2) > span", text => text.textContent);
        const expected = "1/2";
        expect(actual).toContain(expected);
    }, 60000);

    test("should book two seats", async () => {
        const firstDate = await page.$("nav > a:nth-child(2) > span.page-nav__day-number"); await firstDate.click();

        const secondMovie = await page.$("main > section:nth-child(3) > div:nth-child(2) > ul > li > a"); await secondMovie.click();

        page.waitForNavigation("http://qamid.tmweb.ru/client/hall.php"); await page.waitForSelector("h1");

        const freeChair1 = await page.$("main > section  div:nth-child(5) > span:nth-child(5)"); await freeChair1.click();
        const freeChair2 = await page.$("main > section  div:nth-child(5) > span:nth-child(6)"); await freeChair2.click();

        const acceptionButton = await page.$("button"); await acceptionButton.click();

        page.waitForNavigation("http://qamid.tmweb.ru/client/payment.php"); await page.waitForSelector("h1");

        const actual = await page.$eval("main > section > div > p:nth-child(2) > span", text => text.textContent);
        const expected = "5/5, 5/6"; expect(actual).toContain(expected);
    }, 60000);

    test("should not book", async () => {
        const firstDate = await page.$(
            "nav > a:nth-child(3) > span.page-nav__day-week"
        );
        await firstDate.click();

        const secondMovie = await page.$(
            "main > section:nth-child(2) > div.movie-seances__hall > ul > li > a"
        );
        await secondMovie.click();

        page.waitForNavigation("http://qamid.tmweb.ru/client/hall.php");
        await page.waitForSelector("h1");

        const freeChair1 = await page.$(
            "main > section  div:nth-child(3) > span:nth-child(4)"
        );
        await freeChair1.click();
        const freeChair2 = await page.$(
            "main > section  div:nth-child(3) > span.buying-scheme__chair.buying-scheme__chair_vip.buying-scheme__chair_taken"
        );
        await freeChair2.click();

        const acceptionButton = await page.$("button");
        await acceptionButton.click();

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