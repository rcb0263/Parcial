
import mongoose from "npm:mongoose@7.6.3"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
import express, { Request, Response} from "npm:express@4.18.2"
import { CityModel, ContactoModel, CountryModel } from "./db/types.ts";
type ResponseData2 = {
  name: string;
  generation: generacion;
};
type generacion = {
  name: string;
  url: string;
};
type RDCiudad = {
    place_name: string;
  };
type RDregionschema= {
    official: string
};
type RDCountry = {
    region: string,
    name: RDregionschema
};
type ResponseData1 = {
  id: number;
  types: tipos[];
};
type tipos = {
  slot: number;
  type: tipo;
};
type tipo = {
  name: string;
  slot: number;
};

export const getCity = async (req: Request, res: Response, CCode_Pcode: string) => {
    const url = `https://zip-api.eu/api/v1/info/${CCode_Pcode}`;
  
    try {
      const respuesta1 = await fetch(url);
      if (!respuesta1.ok) {
        throw new Error(`No se ha encontrado: ${CCode_Pcode}`);
      }
  
      const respuesta2: RDCiudad = await respuesta1.json();
      console.log("Se ha encontrado a: " + CCode_Pcode);
  
      const pokemonInfo = new CityModel({
        place_name: respuesta2.place_name,
      });
  
      await pokemonInfo.save(); // Guardar directamente en la base de datos
  
      res.send(pokemonInfo); // Enviar el objeto guardado en la respuesta
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener información de la ciudad.");
    }
  };
export const getCountry = async (req: Request, res: Response, Country: string) => {
  const url = `https://restcountries.com/v3.1/alpha/${Country}`;
  try {
    const respuesta1 = await fetch(url);
    if (!respuesta1.ok) {
      throw new Error(`No se ha encontrado: ${Country}`);
    }

    const respuesta2: RDCountry = await respuesta1.json();
    console.log("Se ha encontrado a: " + Country);

    const Countryinfo = new CountryModel({
        region: respuesta2.region,
      });
    await Countryinfo.save(); // Guardar directamente en la base de datos

    res.send(Countryinfo.region); // Enviar el objeto guardado en la respuesta
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener información de pais.");
  }
};


