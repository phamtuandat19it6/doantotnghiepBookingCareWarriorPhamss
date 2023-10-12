import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender:false,
    genders:[],
    roles:[],
    positions:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGender = true;
            return {
                ...copyState,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false;
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:

            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            state.isLoadingGender = false;
            // console.log('fire fetch position success:',action)
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:

            console.log('fire fetch position failed:',action)
            state.isLoadingGender = false;
            state.positions = [];
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            state.isLoadingGender = false;
            // console.log('fire fetch role success:',action)   
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:

            console.log('fire fetch role failed:',action)
            state.isLoadingGender = false;
            state.roles = [];
            return {
                ...state,

            }

        default:
            return state;
    }
}

export default adminReducer;