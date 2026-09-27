const express = require('express');
const router = express.Router();
let students = [];

router.get('/', (req, res) => {
    try { res.status(200).json(students); } 
    catch (error) { res.status(500).json({ error: "Server Error" }); }
});

router.post('/', (req, res) => {
    try {
        const student = req.body;
        if (!student || Object.keys(student).length === 0) return res.status(400).json({ error: "Data required" });
        student.id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
        students.push(student);
        res.status(201).json(student);
    } catch (error) { res.status(500).json({ error: "Server Error" }); }
});

router.put('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return res.status(404).json({ error: "Not Found: Unknown ID" });
        if (!req.body || Object.keys(req.body).length === 0) return res.status(400).json({ error: "Data required" });
        
        students[index] = { ...students[index], ...req.body, id };
        res.status(200).json(students[index]);
    } catch (error) { res.status(500).json({ error: "Server Error" }); }
});

router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return res.status(404).json({ error: "Not Found: Unknown ID" });
        
        students.splice(index, 1);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) { res.status(500).json({ error: "Server Error" }); }
});

module.exports = router;