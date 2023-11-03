import mongoose from "npm:mongoose@7.6.3"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
import express, { Request, Response} from "npm:express@4.18.2"

import { getCity, getCountry } from "./getters.ts";

const env = await load();
const URL_MONGO = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!URL_MONGO) {
  console.error("Debes definir la variable URL_MONGO");
  Deno.exit(1);
}

console.info(URL_MONGO);
try {
  await mongoose.connect(URL_MONGO);
  console.info("Conexion buena");

  const app = express();
  const port = 3000;

  app

    .get("/getCiudad/:city", async (req: Request, res: Response) => {
      const CCode_PCode = req.params.city;
      try {
        const CityName = await getCity(req, res, CCode_PCode);
        res.send(CityName);
      } catch (error) {
        res.status(500).send("Error al obtener información de la ciudad.");
      }
    })
    .get("/getCountry/:country", async (req: Request, res: Response) => {
      const countryn = req.params.country;
      try {
        const CountryName = await getCountry(req, res, countryn);
        res.send(CountryName);
      } catch (error) {
        res.status(500).send("Error al obtener información del pais.");
      }
    })
  app.listen(port, () => {
    console.log("Puerto " + port + " listo");
  });
} catch (e) {
  console.error("No se ha podido conectar");
}
