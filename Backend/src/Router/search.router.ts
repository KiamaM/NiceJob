import { Router } from "express";
import { filterByCategory } from "../Controllers/search.controller";

const searchRouter = Router()

searchRouter.get('/:serviceCategory', filterByCategory)


export default searchRouter