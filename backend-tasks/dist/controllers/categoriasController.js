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
exports.CategoriasController = void 0;
const express_1 = __importDefault(require("express"));
const categoriasModel_1 = require("../models/categoriasModel");
const router = express_1.default.Router();
exports.CategoriasController = router;
// Obtener todas las categorias
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield categoriasModel_1.CategoriasModel.getAllCategorias();
        res.json(tasks);
    }
    catch (error) {
        console.error("Error al obtener categorias", error);
        res.status(500).json({ error: "Error al obtener las categorias." });
    }
}));
