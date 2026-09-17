/* import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
}); */

import express from "express";
import cors from "cors";

import assetsRoutes from "./routes/assets.routes.js";

const app = express();
//const PORT = process.env.PORT;
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/assets", assetsRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "¡Hola mundo desde NekoAssets! 🥴",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

/* setInterval(() => {
  console.log("Node sigue vivo...");
}, 5000);
 */

/* app.get("/comfyui", async (req, res) => {
  const respuesta = await fetch("http://127.0.0.1:8188");

  const texto = await respuesta.text();

  res.send(texto);
}); */

app.post("/comfyui", async (req, res) => {
  console.log("Datos recibido en peticion -> ", req.body);

  const promptpositivo = req.body.prompt_positivo;
  const promptnegativo = req.body.prompt_negativo;
  const semilla = req.body.semilla;
  const checkpoint = req.body.checkpoint;

  const prompt_text = {
    3: {
      class_type: "KSampler",
      inputs: {
        cfg: 8,
        denoise: 1,
        latent_image: ["5", 0],
        model: ["4", 0],
        negative: ["7", 0],
        positive: ["6", 0],
        sampler_name: "euler",
        scheduler: "normal",
        //seed: 8566257,
        seed: semilla,
        steps: 20,
      },
    },

    4: {
      class_type: "CheckpointLoaderSimple",
      inputs: {
        //ckpt_name: "realisticVisionV51_v51VAE.safetensors"
        ckpt_name: checkpoint,
      },
    },

    5: {
      class_type: "EmptyLatentImage",
      inputs: {
        batch_size: 1,
        height: 512,
        width: 512,
      },
    },

    6: {
      class_type: "CLIPTextEncode",
      inputs: {
        clip: ["4", 1],
        //text: "masterpiece best quality girl"
        text: promptpositivo,
      },
    },

    7: {
      class_type: "CLIPTextEncode",
      inputs: {
        clip: ["4", 1],
        //text: "bad hands"
        text: promptnegativo,
      },
    },

    8: {
      class_type: "VAEDecode",
      inputs: {
        samples: ["3", 0],
        vae: ["4", 2],
      },
    },

    9: {
      class_type: "SaveImage",
      inputs: {
        filename_prefix: "NekoAssets",
        images: ["8", 0],
      },
    },
  };

  const data = {
    prompt: prompt_text,
  };

  try {
    const respuesta = await fetch("http://127.0.0.1:8188/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resultado = await respuesta.json();

    res.json(resultado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/consultar_info/:id_prompt", async (req, res) => {
  const id_prompt = req.params.id_prompt;
  const url = `http://localhost:8188/history/${id_prompt}`;

  const response = await fetch(url);
  const resultado = await response.json();
  res.json(resultado);
});
