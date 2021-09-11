import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import UserRouter from "./components/user/router";
import * as mysql2 from "mysql2/promise";
import IApplicationResources from "./common/IApplicationResources.interface";
import Router from "./router";
import AccountRouter from "./components/account/router";
import UserService from "./components/user/service";
import AccountService from "./components/account/service";
import ExpenseService from "./components/expense/service";
import ExpenseRouter from "./components/expense/router";
import IncomeRouter from "./components/income/router";
import IncomeService from "./components/income/service";
import AuthRouter from "./components/auth/router";


async function main() {
    
const application: express.Application = express();

application.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
application.use(express.json());

const resources: IApplicationResources = {
    databaseConnection: await mysql2.createConnection({
        host: Config.database.host,
        port: Config.database.port,
        user: Config.database.user,
        password: Config.database.password,
        database: Config.database.database,
        charset: Config.database.charset,
        timezone: Config.database.timezone,
        supportBigNumbers: true,
    }),
}

resources.databaseConnection.connect();


resources.services = {
    
        userService: new UserService(resources),
        accountService: new AccountService(resources),
        expenseService: new ExpenseService(resources),
        incomeService: new IncomeService(resources),
}



application.use(
    Config.server.static.route, 
    express.static(Config.server.static.path, {
    index:Config.server.static.index,
    cacheControl: Config.server.static.cacheControl,
    maxAge: Config.server.static.maxAge,
    etag: Config.server.static.etag,
    dotfiles: Config.server.static.dotfiles,
}))


Router.setupRoutes(application, resources,[
    new UserRouter(),
    new AccountRouter(),
    new ExpenseRouter(),
    new IncomeRouter(),
    new AuthRouter(),
]);

application.use((req,res) =>{
    res.sendStatus(404);
})

application.use((err,req,res,next) => {
    res.status(err.status).send(err.type);
})

application.listen(Config.server.port);

}

main();