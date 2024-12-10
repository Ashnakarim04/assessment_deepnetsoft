// const express = require('express');
// const Item = require('../MODEL/ItemModel');
// const router = express.Router();

// // Create a new item
// router.post('/', async (req, res) => {
//   const { name, description, price, menu } = req.body;
//   try {
//     const item = new Item({ name, description, price, menu });
//     await item.save();
//     res.status(201).json(item);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get items for a specific menu
// router.get('/:menuId', async (req, res) => {
//   try {
//     const items = await Item.find({ menu: req.params.menuId });
//     res.status(200).json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const Item = require('../MODEL/ItemModel');
const Menu = require('../MODEL/MenuModel');  // Import Menu model
const router = express.Router();

// Create a new item
// router.post('/', async (req, res) => {
//     const { name, description, price, menu } = req.body;

//     console.log('Received Item:', req.body);  // Log the incoming request body

//     // Ensure all required fields are present
//     if (!name || !description || !price || !menu) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }

//     try {
//         // Verify if the Menu exists
//         const foundMenu = await Menu.findById(menu);
//         if (!foundMenu) {
//             console.log('Menu not found for id:', menu);
//             return res.status(404).json({ message: "Menu not found" });
//         }

//         const newItem = new Item({ name, description, price, menu });
//         await newItem.save();

//         console.log('Item added successfully:', newItem);
//         res.status(201).json(newItem);  // Return the added item
//     } catch (err) {
//         console.error('Error adding item:', err);  // Log detailed error
//         res.status(500).json({ message: err.message });
//     }
// });

router.post('/', async (req, res) => {
    const { name, description, price, menu } = req.body;  // Destructure request body

    try {
        // Check if menu exists by its ID
        const foundMenu = await Menu.findById(menu);
        if (!foundMenu) {
            return res.status(404).json({ message: "Menu not found" });
        }

        // Create a new item for the menu
        const newItem = new Item({ name, description, price, menu });
        await newItem.save();

        // Add the item to the menu's `items` array (embedding)
        foundMenu.items.push(newItem._id);
        await foundMenu.save();

        res.status(201).json(newItem);  // Respond with the newly created item
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get all items for a specific menu
router.get('/:menuId', async (req, res) => {
    try {
        // Fetch items for a specific menu
        const items = await Item.find({ menu: req.params.menuId });
        res.status(200).json(items);  // Return items for the specific menu
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ message: err.message });
    }
});

        
module.exports = router;