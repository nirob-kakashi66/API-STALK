const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// তোমার দেওয়া token এখানে বসানো হয়েছে — যেটা public post/info access করবে
const FB_TOKEN = "EAAOxANeUGbwBPBHQqkZBWGTLNl7pOr6PvYbGo345KPAs2Yy94KZAUqWsdZCPyKw5fSWhtUbMTs7jUEkPGJ3abLnhCOqZC01wxYw2lXvMiSSvUugFXEjYrD7zjBQB2Vj0cJVS3OCZCK8S0ZCo3c8ZBCUsgmzxZCtYPK6v7E2jemGzSPsrG6ysMNUpGcAkZCjGTaqRu0Q6ZBC6J8eITa2kLxqi9Qr7falMkAjI6ieHWP";

app.get("/stalk", async (req, res) => {
  const uid = req.query.uid;

  if (!uid) {
    return res.status(400).json({ error: "⚠️ Please provide a UID like ?uid=1000xxxxx" });
  }

  try {
    const url = `https://graph.facebook.com/${uid}?fields=id,name,link,gender,birthday&access_token=${FB_TOKEN}`;

    const response = await axios.get(url);
    const { id, name, link, gender, birthday } = response.data;

    res.json({
      success: true,
      name,
      uid: id,
      gender: gender || "Not public",
      birthday: birthday || "Not public",
      link,
      profile_picture: `https://graph.facebook.com/${id}/picture?width=720&height=720`
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "❌ Failed to fetch info. UID invalid or token expired/limited."
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
