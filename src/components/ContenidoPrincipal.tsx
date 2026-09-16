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


export const ContenidoPrincipal = ({ data, funcion, limpieza, formulario, json }) => {

    /*     const { data: listaWallpapers, fetchData: consultarWallpapers }
            = useFetch<wallpaper[]>({ endpoint: mostrarImagenes, metodo: 'GET' }) */

    //useEffect(() => { consultarWallpapers() }, [])

    const [listaCheckpoints, setListaCheckpoints] = React.useState<string[]>([]);
    const [checkopointSeleccionado, setCheckpointSeleccionado] = React.useState<string>("");

    const [semilla, setSemilla] = React.useState<string>("");
    const [promptPositivo, setPromptPositivo] = React.useState<string>("");
    const [promptNegativo, setPromptNegativo] = React.useState<string>("");

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
    }

    useEffect(() => {
        //if (!listaCheckpoints || listaCheckpoints.length === 0) return;
        console.log("lista Bv -> ", listaCheckpoints);
    }, [listaCheckpoints])

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
                </div>
            )}


        </div>
    )
}
