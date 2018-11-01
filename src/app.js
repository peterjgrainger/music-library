import express from 'express';
/**
 * Set up all the middleware and routes.
 */
const app = express()
// Base route should respond with 200 useful for load balancers.
app.get('/', (req, res) => res.status(200).send())

export default app