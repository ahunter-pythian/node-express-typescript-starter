/*************************************************************************************************************************
 * Copyright (c) 2019, Anthony Hunter.
 * This unpublished material is proprietary to Anthony Hunter.
 * All rights reserved. The methods and techniques described herein are considered trade secrets and/or confidential.
 * Reproduction or distribution, in whole or in part, is forbidden except by express written permission of Anthony
 * Hunter.
 *************************************************************************************************************************/
import * as http from "http";
import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import {IndexPage} from "./routes/IndexPage";

export class Application {

    public static start() {
        console.log("Starting application...");
        const application: express.Express = express();

        application.use(logger("dev"));
        application.use(express.json());
        application.use(express.urlencoded({extended: false}));
        application.use(cookieParser());
        application.use(express.static(path.join(__dirname, "../public")));

        const router: express.Router = express.Router();

        IndexPage.create(router);
        application.use(router);

        const port: string = process.env.PORT || "3000";

        application.set("port", port);

        const server: http.Server = http.createServer(application);

        server.listen(port);
        server.on("error", (error: any) => {
            if (error.syscall !== "listen") {
                throw error;
            }

            switch (error.code) {
                case "EACCES":
                    console.error("Port " + port + " requires elevated privileges");
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    console.error("Port " + port + " is already in use");
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
        server.on("listening", () => {
            console.log("Server listening on port " + port + "...");
        });
    }
}