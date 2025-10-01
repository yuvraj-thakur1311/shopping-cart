
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// const products = [
//   {
//     id: 1,
//     title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     price: 109.95,
//     description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//     rating: { rate: 3.9, count: 120 }
//   },
//   {
//     id: 2,
//     title: "Mens Casual Premium Slim Fit T-Shirts ",
//     price: 22.3,
//     description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
//     rating: { rate: 4.1, count: 259 }
//   },
//   {
//     id: 3,
//     title: "Mens Cotton Jacket",
//     price: 55.99,
//     description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
//     rating: { rate: 4.7, count: 500 }
//   },
//   {
//     id: 4,
//     title: "Mens Casual Slim Fit",
//     price: 15.99,
//     description: "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
//     rating: { rate: 2.1, count: 430 }
//   },
//   {
//     id: 5,
//     title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
//     price: 695,
//     description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
//     category: "jewelery",
//     image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
//     rating: { rate: 4.6, count: 400 }
//   },
//   {
//     id: 6,
//     title: "Solid Gold Petite Micropave ",
//     price: 168,
//     description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States.",
//     category: "jewelery",
//     image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png",
//     rating: { rate: 3.9, count: 70 }
//   },
//   {
//     id: 7,
//     title: "White Gold Plated Princess",
//     price: 9.99,
//     description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
//     category: "jewelery",
//     image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
//     rating: { rate: 3, count: 400 }
//   },
//   {
//     id: 8,
//     title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
//     price: 10.99,
//     description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
//     category: "jewelery",
//     image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
//     rating: { rate: 1.9, count: 100 }
//   },
//   {
//     id: 9,
//     title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
//     price: 64,
//     description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7",
//     category: "electronics",
//     image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
//     rating: { rate: 3.3, count: 203 }
//   },
//   {
//     id: 10,
//     title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
//     price: 109,
//     description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance, making it ideal for typical PC workloads",
//     category: "electronics",
//     image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png",
//     rating: { rate: 2.9, count: 470 }
//   }
// ];

app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products from Fake Store API:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: 'Order must contain at least one item with productId and quantity'
    });
  }

  try {

    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    let total = 0;
    const orderDetails = [];

    items.forEach((item, index) => {
      const product = products.find(p => p.id === item.productId);

      if (product) {
        const subtotal = product.price * item.quantity;
        total += subtotal;

        orderDetails.push({
          productId: item.productId,
          productName: product.title,
          quantity: item.quantity,
          price: product.price,
          subtotal
        });

        console.log(`\n  ${index + 1}. ${product.title}`);
        console.log(`     Product ID: ${item.productId}`);
        console.log(`     Category: ${product.category}`);
        console.log(`     Quantity: ${item.quantity}`);
        console.log(`     Price: $${product.price.toFixed(2)}`);
        console.log(`     Subtotal: $${subtotal.toFixed(2)}`);
      }
    });

    console.log('\n---------------------------------------------');
    console.log(`TOTAL AMOUNT: $${total.toFixed(2)}`);
    console.log(`Total Items: ${orderDetails.length}`);
    console.log('=============================================\n');

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderSummary: {
        items: orderDetails,
        total,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error(' Error processing order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API is running',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});


module.exports = app;