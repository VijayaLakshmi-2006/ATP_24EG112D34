import express from 'express';
import { Employee } from '../model/Employee.js';

const router = express.Router();

// create employees
router.post('/', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

// read all employess
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ message: 'Employee found successfully', employee: employees });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// read single employee by id
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if(!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee found successfully', employee });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// edit employee
router.put('/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if(!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
});

// delete employee
router.delete('/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if(!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;