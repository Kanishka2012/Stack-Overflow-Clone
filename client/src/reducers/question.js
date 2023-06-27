export const questionReducer = (state = {data:null}, action) => {
    switch (action.type) {
        case "POST_QUESTION":
            return {...state}
            break;
        case "POST_ANSWER" :
            return {...state};
        case "FETCH_ALL_QUESTIONS":
            return {...state, data:action.payload};
            break;
        default:
            return state;
            break;
    }
}