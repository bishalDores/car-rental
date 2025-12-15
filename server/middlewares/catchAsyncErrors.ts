import { GraphQLError } from "graphql";
import { NotFoundError } from "../utils/errorHandler";

export default (controllerFunction: Function) =>
  async (...args: any[]) => {
    try {
      return await controllerFunction(...args);
    } catch (error: any) {
      // 1️⃣ Preserve existing GraphQL errors
      if (error instanceof GraphQLError) {
        throw error;
      }

      // 2️⃣ Duplicate key error (email already exists)
      if (error?.code === 11000) {
        const field = Object.keys(error.keyValue)[0];

        throw new GraphQLError(`${field} already exists`, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      // 3️⃣ Invalid Mongo ID
      if (error.name === "CastError") {
        throw new NotFoundError(`Resource not found. Invalid: ${error.path}`);
      }

      // 4️⃣ Mongoose validation errors (password, required, enum, etc.)
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((value: any) => value.message);

        throw new GraphQLError(messages.join(", "), {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      // 5️⃣ Fallback
      throw new GraphQLError(error.message || "Internal server error", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  };
