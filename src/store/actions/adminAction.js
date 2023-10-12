import actionTypes from './actionTypes';
import { getAllCodeService,createNewUserService } from '../../services/userSevice';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart =  () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type:actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService('gender')
            if(res && res.errCode === 0){

                dispatch(fetchGenderSuccess(res.data));

            }else{
                dispatch(fetchGenderFailed());
            }

        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error',error)
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart =  () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type:actionTypes.FETCH_POSITION_START})
            let res = await getAllCodeService('position')
            if(res && res.errCode === 0){

                dispatch(fetchPositionSuccess(res.data));

            }else{
                dispatch(fetchPositionFailed());
            }

        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error',error)
        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart =  () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type:actionTypes.FETCH_ROLE_START})
            let res = await getAllCodeService('role')
            if(res && res.errCode === 0){

                dispatch(fetchRoleSuccess(res.data));

            }else{
                dispatch(fetchRoleFailed());
            }

        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error',error)
        }
    }

}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('hoidanit check create user redux:',res )
            if(res && res.errCode === 0){

                dispatch(saveUserSuccess(res.data));

            }else{
                dispatch(saveUserFailed());
            }

        } catch (error) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error',error)
        }
    }
}

export const saveUserSuccess = () => ({
    type:'CREATE_USER_SUCCESS'
})
export const saveUserFailed = () => ({
    type:'CREATE_USER_FAILED'
})