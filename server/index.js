const express = require('express');
const Parser = require('rss-parser');
const app = express();
const port = 3000;

const parser = new Parser();
const FEED_URL = 'https://www.theverge.com/rss/index.xml';

app.get('/api/feed', async (req, res) => {
    try {
        const feed = await parser.parseURL(FEED_URL);
        res.json(feed.items);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});