import React, { useState, useEffect, useReducer } from 'react';
import { TYPES } from '../actions/crudAction';
import { helpHttp } from '../helpers/helpHttp';
import { crudInitialState, crudReducer } from '../reducers/crudReducer';
import CrudFormApi from './CrudFormApi';
import CrudTableApi from './CrudTableApi';
import Loader from './Loader';
import Message from './Message';

const CrudApi = () => {

    const [ state, dispatch ] = useReducer(crudReducer, crudInitialState);
    const { db } = state;

    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:5000/santos";

    useEffect( () => {

        setLoading(true);
        
        api.get(url).then( res => {
            if(!res.err) {
                dispatch({type: TYPES.READ_ALL_DATA, payload: res});
                setError(null)
            } else {
                dispatch({type: TYPES.NO_DATA});
                setError(res)
            }

        setLoading(false);
        } );
    }, [] );

    const createData = (data) => {
        data.id = Date.now();

        let options = { body: data, 
            headers: { "content-type": "application/json" }
        };
        api
            .post( url, options)
            .then(res => {
             if(!res.err) {
                dispatch({type: TYPES.CREATE_DATA, payload: res});
            } else {
                setError(res)
            }
            });
    };

    const updateData = (data) => {
        
        let endpoint = `${url}/${data.id}`;

        let options = { body: data, 
            headers: { "content-type": "application/json" }
        };
        api
            .put( endpoint, options)
            .then(res => {
             if(!res.err) {
                dispatch({type: TYPES.UPDATE_DATA, payload: data});
            } else {
                setError(res)
            }
            });
    };  

    const deleteData = (id) => {
        let isDelete = window.confirm(`Estás seguro de querer borrar el registro ${id}?`);

        if(isDelete) { 
            
            let endpoint = `${url}/${id}`;

            let options = { headers: { "content-type": "application/json" } 
            };
            api
                .del(endpoint, options)
                .then((res) => {
                    if(!res.err) {
                    dispatch({type: TYPES.DELETE_DATA, payload: id});
                    } else {
                    setError(res)
                    }
                });
            
         } else {
             return
         }
    };

    return(
    <>
    <div>
        <h1>Ejercicios con React</h1>
        <h2>CRUD API</h2>
          <article className= "grid-1-2">
            <CrudFormApi 
            createData={createData} 
            updateData={updateData } 
            dataToEdit={dataToEdit} 
            setDataToEdit={setDataToEdit}
            />
            {loading && <Loader/>}
            {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545"/>}
            {db && <CrudTableApi data={db} setDataToEdit={setDataToEdit} deleteData={deleteData}/>}
          </article>
    </div>
    </>
    )
};

export default CrudApi