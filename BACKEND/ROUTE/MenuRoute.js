const express = require('express');
const Menu = require('../MODEL/MenuModel');
const router = express.Router();

// Create a new menu
// router.post('/', async (req, res) => {
//   const { name, description } = req.body;
//   try {
//     const menu = new Menu({ name, description });
//     await menu.save();
//     res.status(201).json(menu);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// POST route to add a new menu
// router.post('/', async (req, res) => {
//     const { name, description } = req.body;
  
//     // Check if name and description are provided
//     if (!name || !description) {
//       return res.status(400).json({ message: 'Name and description are required' });
//     }
  
//     try {
//       // Create a new menu
//       const menu = new Menu({ name, description });
  
//       // Save the new menu to the database
//       await menu.save();
  
//       // Return the newly created menu
//       res.status(201).json(menu);
//     } catch (err) {
//       console.error('Error creating menu:', err);
//       res.status(500).json({ message: 'Server error: ' + err.message });
//     }
//   });

router.post('/', async (req, res) => {
    const { name, description } = req.body;
  
    // Check if name and description are provided
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
  
    try {
      // Create a new menu
      const menu = new Menu({ name, description });
  
      // Save the new menu to the database
      await menu.save();
  
      // Return the newly created menu
      res.status(201).json(menu);
    } catch (err) {
      console.error('Error creating menu:', err);
      res.status(500).json({ message: 'Server error: ' + err.message });
    }
  });
  
  module.exports = router;
  

// Get all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;