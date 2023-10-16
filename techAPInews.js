const express = require('express');
const app = express();
const port = 8000; // You can use any port you prefer

// Sample tech news data
const techNews = [
    {
        title: "Apple will announce the iPhone 15 on September 12",
        description: "The rumors were right as usual. Apple’s next iPhone event is scheduled for September 12. The firm just sent out invites for the event, once again scheduled...",
        link: "https://techcrunch.com/2023/08/29/apple-will-announce-the-iphone-15-on-september-12/",
        image: "./website photos/iphone-15-event-wonderlust-article.jpg"
    },
    {
        title: "Lamola tables NPA Amendment Bill in Parliament, seeking to make ID permanent unit within NPA",
        description: "Justice and Correctional Services Minister Ronald Lamola has tabled the National Prosecuting Authority (NPA) Amendment Bill before Parliament to establish the Investigative Directorate Against Corruption....",
        link: "https://www.news24.com/news24/southafrica/news/lamola-tables-npa-amendment-bill-in-parliament-seeking-to-make-id-permanent-unit-within-npa-20230830",
        image: "./website photos/lamola2.jpg"
    },
    {
        title: "Google Photos now lets you sync your ‘Locked Folder’ private photos across devices",
        description: "Google Photos will now sync your private photos stored in your Locked Folder across your devices via",
        link: "https://techcrunch.com/2023/08/29/google-photos-now-lets-you-sync-your-locked-folder-private-photos-across-devices/",
        image: "./website photos/GettyImages-887454024.webp"
    },
    {
        title: "ChatGPT: Everything you need to know about the AI-powered chatbot.",
        description: "Since OpenAI released its blockbuster chatbot ChatGPT  last November, hundreds of millions of people have experimented with the tool – and it's already changing ...",
        link: "https://www.businessinsider.com/everything-you-need-to-know-about-chat-gpt-2023-1",
        image: "./website photos/chatgpt5.webp"
    }
];

// API endpoint to get tech news
app.get('/api/tech-news', (req, res) => {
    res.json(techNews);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
