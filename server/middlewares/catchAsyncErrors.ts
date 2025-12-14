// export default (controllerFunction: Function) =>
//   (...args: any[]) =>
//     Promise.resolve(controllerFunction(...args)).catch((error) => {
//       if (error.name === "CastError") {
//         const message = `Resource not found. Invalid: ${error.path}`;
//         throw new Error(message);
//       }
//       if (error.name === "ValidationError") {
//         const message = Object.values(error.errors).map((value: any) => value.message);
//         const combinedErrorMessage = message.join(", ");
//         throw new Error(combinedErrorMessage);
//       }
//       throw error;
//     });

import { GraphQLError } from "graphql";

export default (controllerFunction: Function) =>
  async (...args: any[]) => {
    try {
      return await controllerFunction(...args);
    } catch (error: any) {
      // If it's already a GraphQL error, DO NOT TOUCH IT
      if (error instanceof GraphQLError) {
        throw error;
      }

      if (error.name === "CastError") {
        throw new GraphQLError(`Resource not found. Invalid: ${error.path}`, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((value: any) => value.message);

        throw new GraphQLError(messages.join(", "), {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      // fallback
      throw new GraphQLError(error.message || "Internal server error", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  };
