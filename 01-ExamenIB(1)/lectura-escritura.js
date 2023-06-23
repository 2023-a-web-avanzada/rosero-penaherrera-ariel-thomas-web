import fs from "fs";

export async function readFile(path){
    let myFirstPromise = await new Promise(
        (resolve, reject)=>{
            fs.readFile(
                path,
                'utf-8',//codificación
                (errorReadFirstFile , content) =>{//callback
                    if(errorReadFirstFile){
                        reject('Error al leer el archivo');
                    }else{
                        resolve(content);
                    }
                }
            );
        }
    );
    return myFirstPromise
}

export async function writeFile(path, content){
    const myPromise = await new Promise(
        (resolve, reject)=> {
            fs.writeFile(
                path,
                content,
                (errorWrite) => {//callback
                    if (errorWrite) {
                        reject('Error reading a file');
                    } else {
                        resolve(content);
                    }
                }
            );
        }
    );
    return myPromise
}
export async function readWriteFile(path, newContent){
    try {
        let answerContentFileOriginal = await readFile(path); //espera una respuesta
        if(answerContentFileOriginal == ""){
            answerContentFileOriginal='[]'
        }
        answerContentFileOriginal = JSON.parse(answerContentFileOriginal);
        answerContentFileOriginal.push(newContent)
        const strRestaurant = JSON.stringify(answerContentFileOriginal);
        await writeFile(path, strRestaurant);
    }catch (error){
        console.error(error);
    }
}
