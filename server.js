const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const PORT = 3000;

app.get("/stalk", async (req, res) => {
  const uid = req.query.uid;
  if (!uid) return res.json({ error: "No UID given" });

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(`https://www.facebook.com/${uid}`);

    // Wait for content (simplified)
    await page.waitForSelector("title");

    const name = await page.title(); // crude way, refine if needed
    const link = `https://facebook.com/${uid}`;

    await browser.close();

    return res.json({
      name: name.replace(" | Facebook", ""),
      link,
      uid
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Failed to scrape" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
