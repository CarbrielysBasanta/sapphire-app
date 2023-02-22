import { createApplication } from "graphql-modules";
import { characterModule } from "./characterModule.js";
import { userModule } from "./userModule.js";

export const application = createApplication({
  modules: [userModule, characterModule]
})