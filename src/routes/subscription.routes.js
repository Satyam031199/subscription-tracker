import {Router} from "express";
import {createSubscription, getUserSubscription} from "../controllers/subscription.controller.js";
import {authorize} from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({message: 'GET all subscriptions'});
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({message: 'GET subscription by id'});
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send({message: 'UPDATE subscription'});
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({message: 'DELETE subscription'});
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({message: 'CANCEL subscription'});
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({message: 'GET upcoming renewals'});
});

export default subscriptionRouter;