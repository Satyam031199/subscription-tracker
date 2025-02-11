import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.config.js";
import {SERVER_URL} from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const isExistingSubscription = await Subscription.find({name: req.body.name});
        if(isExistingSubscription){
            const error = new Error('Subscription already exists');
            error.statusCode = 409;
            throw error;
        }
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 0
        })
        res.status(201).json({success: true, data: subscription});
    }catch (error) {
        next(error);
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        if(req.user._id.toString() !== req.params.id) {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }
        const subscription = await Subscription.find({ user: req.params.id });
        res.status(200).json({success: true, data: subscription});
    }catch (error) {
        next(error);
    }
}