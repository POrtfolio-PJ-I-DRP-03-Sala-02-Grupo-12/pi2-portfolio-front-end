import serverless from "serverless-http";
import { createApp } from "../../server/app.js";

let handlerPromise;

async function getHandler() {
  if (!handlerPromise) {
    handlerPromise = createApp().then((app) => serverless(app));
  }
  return handlerPromise;
}

export const handler = async (event, context) => {
  const serverlessHandler = await getHandler();
  return serverlessHandler(event, context);
};
