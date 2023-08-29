export default function Form(){
    return(
        <>
            <form>
                <div className="input-type">
                    <input type="text" name="nombre" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Nombre"/>
                </div>
                <div className="input-type">
                    <input type="text" name="codBienes" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Codigo de Bienes"/>
                </div>
                <div className="input-type">
                    <input type="text" name="marcamodelo" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Marca/Modelo"/>
                </div>
                <div className="input-type">
                    <input type="text" name="nSerie" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Número de Serie"/>
                </div>
                <div className="form-check">
                    <input type="radio" name="status" value="active" id="radioDefault1"
                           className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                        En Uso
                    </label>
                </div>
                <div className="form-check">
                    <input type="radio" name="status" value="inactive" id="radioDefault1"
                           className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                        De Baja
                    </label>
                </div>
                <div className="input-type">
                    <input type="text" name="costo" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Costo"/>
                </div>
                <div className="input-type">
                    <input type="text" name="custodio" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Custodio"/>
                </div>
            </form>
        </>
    )
}