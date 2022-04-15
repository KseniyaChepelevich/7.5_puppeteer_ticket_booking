const {
    clickElement,
    getText
} = require("./lib/commands");
const daysWeek = require("./pageIndex");

const plases = require("./pageHall");

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
            timeout: 60000,
        });
    });
    beforeAll(async () => {
        page = await browser.newPage();
        await page.goto("http://qamid.tmweb.ru/client/index.php", {
            timeout: 60000,
        });
        await clickElement(page, daysWeek.secondDay);
        await clickElement(page, daysWeek.movi3Day);
        await page.waitForSelector("h1");
        await clickElement(page, plases.row2Plase10);
        await clickElement(page, "button");
        await page.waitForSelector("h1");
        await clickElement(page, "button");
        await page.waitForSelector("h1");
    }, 60000);

    test("should book one VIP seat", async () => {
        await clickElement(page, daysWeek.fifthDay);
        await clickElement(page, daysWeek.movi1Evening);
        await page.waitForSelector("h1");
        await clickElement(page, plases.row1PlaseVip);
        await clickElement(page, "button");
        await page.waitForSelector("h1");
        const actual = await getText(
            page,
            "main > section > div > p:nth-child(2) > span",
            (text) => text.textContent
        );
        const expected = "1/2";
        const actualPrise = await getText(
            page,
            "main > section > div > p:nth-child(6) > span",
            (text) => text.textContent
        );
        const expectedPrise = "350";
        expect(actual).toContain(expected);
        expect(actualPrise).toContain(expectedPrise);
    }, 60000);

    test("should book two seats", async () => {
        await clickElement(page, daysWeek.sixthDay);
        await clickElement(page, daysWeek.movi3Morning);
        await page.waitForSelector("h1");
        await clickElement(page, plases.row5Plase5);
        await clickElement(page, plases.row5Plase6);
        await clickElement(page, "button");
        await page.waitForSelector("h1");
        const actual = await getText(
            page,
            "main > section > div > p:nth-child(2) > span",
            (text) => text.textContent
        );
        const expected = "5/5, 5/6";
        const actualPrise = await getText(
            page,
            "main > section > div > p:nth-child(6) > span",
            (text) => text.textContent
        );
        const expectedPrise = "200";
        expect(actual).toContain(expected);
        expect(actualPrise).toContain(expectedPrise);
    }, 60000);

    test.skip("should not book", async () => {
        await clickElement(page, daysWeek.secondDay);
        await clickElement(page, daysWeek.movi3Day);
        await page.waitForSelector("h1");
        await clickElement(page, plases.row2Plase10);
        const actual = await getText(page, "h2", (text) => text.textContent);
        const expected = "Фильм 3";
        expect(actual).toContain(expected);
    }, 60000);
});