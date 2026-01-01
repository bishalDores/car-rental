import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Application, json, Response, Request } from "express";
import { carTypeDefs } from "../graphql/typeDefs/car.typeDefs";
import { carResolvers } from "../graphql/resolvers/car.resolvers";
import cors from "cors";
import { userTypeDefs } from "../graphql/typeDefs/user.typeDefs";
import { userResolvers } from "../graphql/resolvers/user.resolvers";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../middlewares/permission";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { bookingTypeDefs } from "../graphql/typeDefs/booking.typeDefs";
import { bookingReolvers } from "../graphql/resolvers/booking.resolvers";

interface CustomJwtPayload {
  _id: string;
}
export async function startApolloServer(app: Application) {
  const typeDefs = [carTypeDefs, userTypeDefs, bookingTypeDefs];
  const resolvers = [carResolvers, userResolvers, bookingReolvers];

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const schemaWithMiddleware = applyMiddleware(schema, permissions);
  const apolloServer = new ApolloServer({
    schema: schemaWithMiddleware,
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    cors({
      credentials: true,
      origin: ["http://localhost:5173"],
    }),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        const token = req.cookies?.token;
        let user = null;
        if (token) {
          try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;
            user = await User.findById(decodedToken._id);
            if (!user) throw new Error("User not found");
          } catch (err) {
            throw new Error("Invalid token");
          }
        }

        return { req, res, user };
      },
    })
  );
}
