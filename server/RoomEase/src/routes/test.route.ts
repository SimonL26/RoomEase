import { Router } from "express";
import { test } from "../controllers/test.controller";
import { verifications } from "../middleware/verifications";

const testRoute = Router()

testRoute.get("/allResource", test.testGetAllResource);

testRoute.get("/userResource", [verifications.verifyToken], test.testUserResource)

export default testRoute;