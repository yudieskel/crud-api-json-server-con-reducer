import React from "react";

const CrudTableRowApi = ({ e, setDataToEdit, deleteData }) => {
    
    let { name, constellation, id } = e; 

    return(
        <tr>
            <td>{name}</td>
            <td>{constellation}</td>
            <td>
                <button onClick= {() => setDataToEdit(e)}>Editar</button>
                <button onClick= {() => deleteData(id)}>Eliminar</button>
            </td>
        </tr>
    )
};

export default CrudTableRowApi