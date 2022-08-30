"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../Config/config");
const email_1 = __importDefault(require("../Helpers/email"));
dotenv_1.default.config();
const SendEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const projects = yield (yield pool.request().query(`
SELECT * FROM project WHERE issent='0'`)).recordset;
    console.log(projects);
    for (let project of projects) {
        let result = yield pool
            .request()
            .input("userId", project.user_id)
            .execute(`getAssignedEmails`);
        let emailRes = result.recordset[0];
        console.log("ghghgh", emailRes);
        if (emailRes) {
            ejs_1.default.renderFile("templates/assign_project.ejs", {
                username: emailRes.username,
                name: project.name,
                project: project.description,
            }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.log(error);
                    return;
                }
                let messageoption = {
                    from: process.env.EMAIL,
                    to: emailRes.email,
                    subject: " task",
                    html: data,
                    attachments: [
                        {
                            fileusername: "project.txt",
                        },
                    ],
                };
                try {
                    yield (0, email_1.default)(messageoption);
                    yield pool
                        .request()
                        .query(`UPDATE project SET issent='1' WHERE user_id = '${project.user_id}'`);
                    console.log("Email is Sent");
                }
                catch (error) {
                    console.log(error);
                }
            }));
        }
    }
});
exports.default = SendEmail;
