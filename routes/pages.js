import express from 'express';

const router = express.Router();

router.get('/main', (req, res) => {
    res.sendFile('main.html', { root: 'public' });
});

router.get('/signup', (req, res) => {
    res.sendFile('signup.html', { root: 'public' });
});

export default router;