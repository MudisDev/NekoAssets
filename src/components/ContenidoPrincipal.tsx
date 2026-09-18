import React, { useEffect } from "react"
import { useFetch } from "../hooks/useFetch";


interface wallpaper {
    id_imagen: string,
    url: string
}

interface comfyui {
    prompt_positivo: string,
    prompt_negativo: string,
    semilla: string,
    checkpoint: string,
}


export const ContenidoPrincipal = ({ data, funcion, limpieza, formulario, json, locales }) => {

    /*     const { data: listaWallpapers, fetchData: consultarWallpapers }
            = useFetch<wallpaper[]>({ endpoint: mostrarImagenes, metodo: 'GET' }) */

    //useEffect(() => { consultarWallpapers() }, [])
    const [listaLocales, setListaLocales] = React.useState<string[]>([]);
    const [listaCheckpoints, setListaCheckpoints] = React.useState<string[]>([]);
    const [checkopointSeleccionado, setCheckpointSeleccionado] = React.useState<string>("");

    const [semilla, setSemilla] = React.useState<string>("");
    const [promptPositivo, setPromptPositivo] = React.useState<string>("");
    const [promptNegativo, setPromptNegativo] = React.useState<string>("");

    const [idPrompt, setIdPrompt] = React.useState<string>("");

    const [generacion, setGeneracion] = React.useState(null);
    const [imagenGenerada, setImagenGenerada] = React.useState(null);

    // useEffect(() => {
    const cargarListadoCheckpoints = async () => {
        const archivos = await window.electronAPI.obtenerArchivos(json.directorioCheckpoints);
        console.log("Archivos ARRAY -> ", Array.isArray(archivos));
        setListaCheckpoints(archivos);
    };
    // cargarListadoCheckpoints();
    //}, [])

    const endpointsubir = "http://localhost:3000/comfyui";

    const { /* data, */ fetchData: Workflow } = useFetch({ endpoint: endpointsubir, metodo: "POST" });

    const enviarWorkflow = async () => {
        const parametros: comfyui = {
            prompt_positivo: promptPositivo,
            prompt_negativo: promptNegativo,
            semilla: semilla,
            checkpoint: checkopointSeleccionado
        }
        const response = await Workflow(parametros);
        console.log("Respuesta Generacion -> ", response);
        setIdPrompt(response.prompt_id);
    }

    //useEffect(() => {
    //if (!listaCheckpoints || listaCheckpoints.length === 0) return;
    // console.log("lista Bv -> ", listaCheckpoints);
    // }, [listaCheckpoints])

    const cargarHistorial = async () => {
        const archivos = await window.electronAPI.obtenerArchivos(
            json.directorioOutput
        );

        console.log("Outputs -> ", archivos);

        const listaAdaptada = archivos.map((archivo) => {
            const rutaArchivo =
                `${json.directorioOutput}\\${archivo}`;

            return `nekoassets://local?path=${encodeURIComponent(rutaArchivo)}`;
        });

        console.log("URLs -> ", listaAdaptada);

        setListaLocales(listaAdaptada);
    };
    const urlDatosGenerativos = `http://localhost:3000/consultar_info/${idPrompt}`;
    const { data: datosObtenidos, fetchData: consultarDatos } = useFetch({ endpoint: urlDatosGenerativos, metodo: "GET" });

    const obtenerDatosGeneracion = async () => {

        const resultado = await consultarDatos(/* { id_prompt: idPrompt } */)
        console.log("DATOS OBTENIDOS -> ", resultado);

        const historial = resultado[idPrompt];

        const workflow = historial.prompt[2];

        const generacion = {
            id_prompt: idPrompt,

            prompt_positivo:
                workflow["6"].inputs.text,

            prompt_negativo:
                workflow["7"].inputs.text,

            semilla:
                workflow["3"].inputs.seed,

            checkpoint:
                workflow["4"].inputs.ckpt_name,

            sampler:
                workflow["3"].inputs.sampler_name,

            scheduler:
                workflow["3"].inputs.scheduler,

            steps:
                workflow["3"].inputs.steps,

            cfg:
                workflow["3"].inputs.cfg,
        };

        const imagen = historial.outputs["9"].images[0];

        console.log(imagen.filename);

        const ruta = `${json.directorioOutput}\\${imagen.filename}`;

        const urlArchivo = await window.electronAPI.obtenerUrlArchivo(ruta);

        setGeneracion({
            id_prompt: idPrompt,
            prompt_positivo: workflow["6"].inputs.text,
            prompt_negativo: workflow["7"].inputs.text,
            semilla: workflow["3"].inputs.seed,
            checkpoint: workflow["4"].inputs.ckpt_name,
            sampler: workflow["3"].inputs.sampler_name,
            scheduler: workflow["3"].inputs.scheduler,
            steps: workflow["3"].inputs.steps,
            cfg: workflow["3"].inputs.cfg,
        });

        setImagenGenerada({
            nombre_archivo: imagen.filename,
            ruta: ruta,
        });
    }

    const urlRegistrarAsset = "http://localhost:3000/assets/registrar-asset";

    const {
        fetchData: registrarAsset
    } = useFetch({
        endpoint: urlRegistrarAsset,
        metodo: "POST"
    });

    const registrarGeneracionBD = async () => {

        if (!generacion || !imagenGenerada) {
            console.log("Faltan datos para registrar");
            return;
        }

        const datos = {
            imagen: {
                nombre_archivo: imagenGenerada.nombre_archivo,
                ruta: imagenGenerada.ruta
            },

            generacion: {
                id_prompt: generacion.id_prompt,
                prompt_positivo: generacion.prompt_positivo,
                prompt_negativo: generacion.prompt_negativo,
                semilla: generacion.semilla,
                checkpoint: generacion.checkpoint,
                sampler: generacion.sampler,
                scheduler: generacion.scheduler,
                steps: generacion.steps,
                cfg: generacion.cfg,

                // todavía no tienes imagen de referencia
                id_imagen_referencia: null,

                // Express lo va a completar con el insertId
                id_imagen_salida: null
            }
        };

        const response = await registrarAsset(datos);

        console.log("Registro BD -> ", response);
    };

    return (
        <div id='contenido-principal'>
            {limpieza && (<div className='placeholder'><p>Bienvenido a <strong>NekoAssets</strong></p><p>Selecciona una opcion del menu lateral para comenzar.</p></div>)}
            {!limpieza && data?.length !== 0 && (
                <div className='contenedor-wallpapers'>
                    {data?.map(wallpaper => (
                        <button className='wallpaper' key={wallpaper.id_imagen} onClick={() => { funcion(wallpaper.id_imagen) }} >
                            <img src={wallpaper.url} />
                        </button>
                    ))}
                </div>
            )}

            {!limpieza && formulario && (
                <div className="formulario">
                    <p>Personalizar Workflow</p>
                    <input placeholder="Prompt positivo general" value={promptPositivo} onChange={(e) => setPromptPositivo(e.target.value)} ></input>
                    <input placeholder="Prompt negativo general" value={promptNegativo} onChange={(e) => setPromptNegativo(e.target.value)} ></input>
                    <input placeholder="Semilla" value={semilla} onChange={(e) => setSemilla(e.target.value)}></input>
                    <select
                        name="checkpoints"
                        value={checkopointSeleccionado}
                        onChange={(e) => setCheckpointSeleccionado(e.target.value)}
                    >
                        <option value={""} disabled>
                            Selecciona un checkpoint
                        </option>
                        {listaCheckpoints.map((checkpoint) => (
                            <option key={checkpoint} value={checkpoint}>
                                {checkpoint}
                            </option>
                        ))}
                    </select>
                    {/* <button
                        onClick={Cambiar_Especie}
                        disabled={especieSeleccionada == ""}
                    >
                        Cambiar Especie
                    </button> */}

                    <button onClick={cargarListadoCheckpoints}>cargar checkpoints</button>
                    <button onClick={enviarWorkflow}
                        disabled={promptNegativo === "" || promptPositivo === "" || semilla === "" || checkopointSeleccionado === ""}
                    >
                        Generar Asset</button>

                    <p>ID prompt - {idPrompt}</p>
                    <button disabled={idPrompt === ""} onClick={obtenerDatosGeneracion}>Obtener informacion</button>

                    <button
                        disabled={!generacion || !imagenGenerada}
                        onClick={registrarGeneracionBD}
                    >
                        Registrar en BD
                    </button>
                </div>
            )}

            {!limpieza && locales && (
                <>
                    <button onClick={cargarHistorial}>Cargar Locales</button>
                    {listaLocales.map((wallpaper) => (
                        <button
                            className="wallpaper"
                            key={wallpaper}
                        >
                            <img src={wallpaper} />
                        </button>
                    ))}

                </>
            )}

        </div>
    )
}
