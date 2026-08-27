/**
 * Artify Sols Backend — API v1 Master Router
 * Aggregates all modular subsystem routes.
 */

import { Router } from 'express';
import authRoutes from './authRoutes';
import cmsRoutes from './cmsRoutes';
import productRoutes from './productRoutes';
import { subscriptionRouter, apiKeyRouter } from './subscriptionRoutes';
import leadRoutes from './leadRoutes';
import { notificationRouter, auditRouter } from './notificationRoutes';
import aiRoutes from './aiRoutes';
import systemRoutes from './systemRoutes';

const v1Router = Router();

v1Router.use('/auth', authRoutes);
v1Router.use('/cms', cmsRoutes);
v1Router.use('/articles', cmsRoutes);
v1Router.use('/products', productRoutes);
v1Router.use('/services', productRoutes);
v1Router.use('/subscriptions', subscriptionRouter);
v1Router.use('/api-keys', apiKeyRouter);
v1Router.use('/leads', leadRoutes);
v1Router.use('/notifications', notificationRouter);
v1Router.use('/audit', auditRouter);
v1Router.use('/ai', aiRoutes);
v1Router.use('/system', systemRoutes);

export default v1Router;
