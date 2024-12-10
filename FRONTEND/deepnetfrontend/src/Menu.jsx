import React, { useState, useEffect } from "react";
import "./css/Menu.css";
import logo from "./assets/logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';

const Menu = () => {
    const [menus, setMenus] = useState([]);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
    const [newMenu, setNewMenu] = useState({ name: "", description: "" });
    const [isMenuFormVisible, setIsMenuFormVisible] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", description: "", price: "" });
    const [isItemFormVisible, setIsItemFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch menus and items from backend
    const fetchMenus = async () => {
        try {
            const response = await axios.get("http://localhost:3015/api/menu");
            setMenus(response.data); // Set fetched menus state
            setIsLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.error("Error fetching menus:", error);
            setIsLoading(false); // Ensure loading is turned off in case of error
        }
    };

    // Fetch items for the selected menu
    const fetchItemsForMenu = async (menuId) => {
        try {
            const response = await axios.get(`http://localhost:3015/api/items/${menuId}`);
            const updatedMenus = [...menus];
            updatedMenus[selectedMenuIndex].items = response.data;
            setMenus(updatedMenus);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };
  // Handle adding a new menu
  const handleAddMenu = async () => {
    if (newMenu.name.trim() && newMenu.description.trim()) {
        try {
            // Send POST request to backend to add a new menu
            const response = await axios.post("http://localhost:3015/api/menu", {
                name: newMenu.name,
                description: newMenu.description,
            });

            // If successful, add the new menu to the state
            setMenus([...menus, response.data]);
            setNewMenu({ name: "", description: "" });  // Reset the form fields
            setIsMenuFormVisible(false);  // Hide the form after successful add
        } catch (error) {
            console.error("Error adding menu:", error);
            alert("Error adding menu. Please try again.");
        }
    } else {
        alert("Please provide both a menu name and description.");
    }
};


    // Handle adding a new item
    const handleAddItem = async () => {
        const selectedMenu = menus[selectedMenuIndex];
        const menuId = selectedMenu._id;
        if (newItem.name.trim() && newItem.description.trim() && newItem.price.trim()) {
            try {

                const response = await axios.post("http://localhost:3015/api/items", {
                    name: newItem.name,
                    description: newItem.description,
                    price: newItem.price,
                    menu: menuId
                });


                if (response.status === 201) {
                    await fetchItemsForMenu(menuId);
                    setNewItem({ name: "", description: "", price: "" });
                    setIsItemFormVisible(false);
                }
            } catch (error) {
                console.error("Error adding item:", error);
                alert("Error adding item to the menu. Please try again.");
            }
        } else {
            alert("Please provide all item details.");
        }
    };

    // Use effect to call fetchMenus once on component mount
    useEffect(() => {
        fetchMenus();
    }, []);

    // Loading state handling
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid menu-page">
            {/* Navigation */}
            <div className="navigation-container">
                <div className="navigation-left">
                    <img src={logo} alt="Logo" className="navigation-logo" />
                    <span className="navigation-text">
                        <p className="blue-text">DEEP</p> NET SOFT
                    </span>
                </div>
                <ul className="navigation-ul">
                    <li className="navigation-li"><a href="#">HOME</a></li>
                    <li className="navigation-li"><a href="#" className=" active-nav">MENU</a></li>
                    <li className="navigation-li"><a href="#">MAKE A RESERVATION</a></li>
                    <li className="navigation-li"><a href="#">CONTACT US</a></li>
                </ul>
            </div>

            {/* Header */}
            <header className="header-section">
                <h1>MENU</h1>
                <p>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to <br />place an order, use the "Order Online" button located below the menu.</p>
            </header>

            {/* Menu Navigation */}
            <div className="container-fluid menu-navigation">
                <div className="btn-group">
                    {menus?.map((menu, index) => (
                        <button
                            key={index}
                            className={`btn ${selectedMenuIndex === index ? "btn-primary" : ""}`}
                            onClick={() => {
                                setSelectedMenuIndex(index);
                                fetchItemsForMenu(menu._id);
                            }}
                            title="Double click to see menu items"
                        >
                            {menu.name}
                        </button>
                    ))}
                </div>
                 {/* Add Menu Button */}
                 <button className="btn addmenubtn" onClick={() => setIsMenuFormVisible(!isMenuFormVisible)}>
                    {isMenuFormVisible ? "Cancel" : "Add New Menu"}
                </button>&emsp;

                <button className="btn addmenubtn" onClick={() => setIsItemFormVisible(!isItemFormVisible)} title="Select a particular menu for adding menu items">
                    {isItemFormVisible ? "Cancel" : "Add New Item"}
                </button>
            </div>

            {/* Add Menu Form */}
            {isMenuFormVisible && (
                <div className="form-section">
                    <h3>Add a New Menu</h3>
                    <input
                        type="text"
                        placeholder="Menu Name"
                        value={newMenu.name}
                        onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={newMenu.description}
                        onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
                    ></textarea>
                    <button onClick={handleAddMenu}>Add Menu</button>
                </div>
            )}
            {/* Item Form */}
            {isItemFormVisible && (
                <div className="form-section">
                    <h3>Add a New Item</h3>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                    <button onClick={handleAddItem}>Add Item</button>
                </div>
            )}

            {/* Menu Items */}
            <div className="menu-items">
                <div className="inside-menuitems">
                    <h2>{menus[selectedMenuIndex]?.name}</h2>
                    <p>{menus[selectedMenuIndex]?.description}</p>
                    <div className="menu-item-list">
                        {menus[selectedMenuIndex]?.items?.map((item, index) => (
                            <div key={index} className="menu-item">
                                <div className="menu-item-details">
                                    <h5>{item.name}</h5>
                                    <p>{item.description}</p>
                                </div>
                                <div className="menu-item-price">
                                    <p>{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    {/* Connect With Us */}
                    <div className="footer-section section1">
                        <h3 className="footer-title">CONNECT WITH US</h3>
                        <p>📞 +91 9567843340</p>
                        <p>📧 info@deepnetsoft.com</p>
                    </div>

                    {/* Logo Section */}
                    <div className="footer-section logo-section section2">
                        <img src={logo} alt="Deep Net Soft Logo" className="footer-logo" />                        <h2 className="brand-name">
                            DEEP <span className="brand-highlight">NET</span> SOFT
                        </h2>
                        <div className="social-icons">
                            <FontAwesomeIcon icon={faFacebookF} />
                            <FontAwesomeIcon icon={faTwitter} />
                            <FontAwesomeIcon icon={faInstagram} />
                            <FontAwesomeIcon icon={faYoutube} />
                        </div>
                    </div>

                    {/* Find Us */}
                    <div className="footer-section section3">
                        <h3 className="footer-title">FIND US</h3>
                        <p>📍 First floor, Geo Infopark,</p>
                        <p>Infopark EXPY, Kakkanad</p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="p1">© 2024 Deepnetsoft Solutions. All rights reserved.</p>
                    <p className="p2">
                        <a href="/terms">Terms & Conditions</a> | <a href="/privacy">Privacy Policy</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Menu;
