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
exports.Database = void 0;
// src/utils/Database.ts
const promise_1 = __importDefault(require("mysql2/promise"));
class Database {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                this.connection = yield promise_1.default.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database: 'tareas',
                });
            }
        });
    }
    static disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                yield this.connection.end();
                this.connection = null;
            }
        });
    }
    static executeQuery(query, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                throw new Error('No se ha establecido la conexión a la base de datos.');
            }
            try {
                const [rows] = yield this.connection.execute(query, params);
                return rows;
            }
            catch (error) {
                throw new Error(`Error al ejecutar la consulta: ${error.message}`);
            }
        });
    }
}
exports.Database = Database;
Database.connection = null;
