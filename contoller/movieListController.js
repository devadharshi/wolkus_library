const MovieList = require('../models/movielist');

exports.createList = async (req, res) => {
    const { name, movies, isPublic } = req.body;
    try {
        const newList = new MovieList({ user: req.user.id, name, movies, isPublic });
        const list = await newList.save();
        res.json(list);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getLists = async (req, res) => {
    try {
        const lists = await MovieList.find({ user: req.user.id });
        res.json(lists);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getList = async (req, res) => {
    try {
        const list = await MovieList.findById(req.params.id);
        if (!list) return res.status(404).json({ msg: 'List not found' });
        if (list.user.toString() !== req.user.id && !list.isPublic) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        res.json(list);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.deleteList = async (req, res) => {
    try {
        const list = await MovieList.findById(req.params.id);
        if (!list) return res.status(404).json({ msg: 'List not found' });
        if (list.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await list.remove();
        res.json({ msg: 'List removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
