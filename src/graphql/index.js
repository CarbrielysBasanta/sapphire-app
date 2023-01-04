import { createApplication } from "graphql-modules";
import { userModule } from "./modules.js";

export const application = createApplication({
  modules: [userModule]
})