import React, { useReducer } from "react";
import axios from "axios"; // dealing with rest full API
import Context from "./Context";
import {Reducer } from '../context/Reducer'


const State = ({children})=>{

    const initialState = {
        loading: false,
        success:false,
        error: null,
        MessageError:null,
      };
    const [state, dispacth] = useReducer(Reducer, initialState);


      // send application
      const ApplyNow = async (student)=>{
        dispacth({type:'Request'})
        const config = {
            headers: {
              "Content-Type": "application/json",
            },};
            try {
            //const response = await axios.post("/api/send", student, config);
            const response = await axios.post("https://ccabs.ccab.tech/api/send", student, config);
            //console.log(response.data.success)
            dispacth({
                type: 'Success',
                success:response.data.success, // updated 
                });
                    
            } catch (error) {
                 //console.log('err : ',error.response.data.success );
                dispacth({ type: 'Error', 
                    payload: error.response.data.msg ,    
                    success:error.response.data.success, //updated 
          });
            }
      }


      const SendMessage = async (msg)=>{
        dispacth({ type:'Request'})
        const config ={
          headers:{
            "Content-Type": "application/json",
          }}

          try {

            const response = await axios.post("https://ccabs.ccab.tech/api/message", msg, config);
            //console.log(response.data.success)
            dispacth({
                type: 'Success',
                success:response.data.success, // updated 
                });

          } catch (error) {
             dispacth({ type: 'Message_Error', 
                    payload: error.response.data.msg ,    
                    success:error.response.data.success, //updated 
          });
          }
      }
      const ClearError = ()=>{
        state.error = null;
        state.MessageError= null;
   }






    return (
        <Context.Provider
          value={{
            
            error: state.error,
            success:state.success,
            loading:state.loading,
            MessageError:state.MessageError,
            SendMessage,
            ApplyNow,ClearError

          }}
        >
          {children}
        </Context.Provider>
      );
}

export default State ; 