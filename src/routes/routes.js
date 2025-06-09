import reportRoutes from "./reportRoutes.js";
import userRoutes from "./userRoutes.js";

const user = userRoutes;
const report = reportRoutes;

const routes = [...user, ...report];

export default routes;
