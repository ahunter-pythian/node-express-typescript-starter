/*************************************************************************************************************************
 * Copyright (c) 2019, Anthony Hunter.
 * This unpublished material is proprietary to Anthony Hunter.
 * All rights reserved. The methods and techniques described herein are considered trade secrets and/or confidential.
 * Reproduction or distribution, in whole or in part, is forbidden except by express written permission of Anthony
 * Hunter.
 *************************************************************************************************************************/
import { NextFunction, Request, Response, Router } from "express";
export class IndexPage {

    public static create(router: Router) {
        console.log("Creating index page route...");
        // @ts-ignore
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.render("index", { title: "Express" });
        });
    }

}