// test/products.test.js
const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Import your actual server code
const app = require('../server'); // Adjust path if your app is in a different file

describe('GET /api/products', () => {
  it('should return a list of products', async () => {
    const response = await request(app).get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Check that the first product has required properties
    const product = response.body[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('image');
  });
});
