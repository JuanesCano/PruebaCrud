import Fastify from 'fastify';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';
import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoute.js';
import fastifyEnv from '@fastify/env';
import { optionsEnv } from "./configEnv.js"
import { connectDB } from './database.js';

const fastify = Fastify({ logger: true });

fastify.register(fastifyEnv, optionsEnv).ready((err) => { if (err) console.log(err); });

fastify.register(cors, { origin: '*' });
fastify.register(formBody);
fastify.register(connectDB)

//rutas
fastify.register(userRoutes, { prefix: "/user" });
fastify.register(postRoutes, { prefix: "/post" });

const start = async () => {
    try {
        await fastify.ready()
        await fastify.listen({ port: process.env.PORT, host: process.env.HOST });
        console.log('Servidor corriendo correctamente');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();