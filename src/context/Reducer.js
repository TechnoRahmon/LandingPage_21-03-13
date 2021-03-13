

export const Reducer = (state, action) => {
    switch (action.type) {
        case'Request':
        return{
            ...state,
            loading:true,
        }
        case 'Success':
            // console.log("action: ",action.payload)
            return {
              ...state,
              success:true,
              loading:false,
            };


        case 'Error':
            // console.log("action: ",action.payload)
            return {
              ...state,
              error: action.payload,
              success:false,
              loading:false,
            };
        case'Message_Error':
        return{
          ...state, 
          MessageError:action.payload,
          success:false,
          loading:false,
        }
    }


}