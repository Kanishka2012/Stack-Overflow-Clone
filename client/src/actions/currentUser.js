export const setCurrentUser = (data) => async(dispatch)=>{
   try {
    dispatch({type:"CURRENT_USER",payload:data});
   } catch (error) {
    console.log(error);
   }
}