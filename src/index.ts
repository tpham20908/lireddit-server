import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
	// create db
	const orm = await MikroORM.init(microConfig);
	// run migration
	await orm.getMigrator().up();
	// create table
	// const post = orm.em.create(Post, {title: 'My first post'});
	// await orm.em.persistAndFlush(post);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver],
			validate: false,
		}),
		context: () => ({ em: orm.em }),
	});

	const app = express();
	apolloServer.applyMiddleware({ app });
	app.get('/', (_, res) => {
		res.send('Hello');
	});
	app.listen(4000, () => {
		console.log('Server started on localhost:4000');
	});
};

main().catch((err) => {
	console.error(err);
});
