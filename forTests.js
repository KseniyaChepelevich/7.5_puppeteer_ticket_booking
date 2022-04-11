/*module.exports={
    let page;
    page = await browser.newPage();
        await page.goto("http://qamid.tmweb.ru/client/index.php", {
            timeout: 60000
        });
        await clickElement(page, "body > nav > a:nth-child(2) > span.page-nav__day-number");
        
        await clickElement(page, "body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a");
        
        await page.waitForNavigation("http://qamid.tmweb.ru/client/hall.php");
        await page.waitForSelector("h1");

        await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(5)");
        await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(6)");
        
        await clickElement(page, "/html/body/main/section/button");
        
        await page.waitForNavigation("http://qamid.tmweb.ru/client/payment.php");
        await page.waitForSelector("h1");

        await clickElement(page, "button");

        await page.waitForNavigation("http://qamid.tmweb.ru/client/payment.php");
        await page.waitForSelector("h1");
}*/