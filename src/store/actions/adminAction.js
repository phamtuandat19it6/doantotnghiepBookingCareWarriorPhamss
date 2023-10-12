import actionTypes from './actionTypes';
import { getAllCodeService,createNewUserService,getAllUsers,deleteUserService  } from '../../services/userSevice';
import {toast} from "react-toastify"
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
            toast.error('🦄 fetchRoleStart  error!');
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
            if(res && res.errCode === 0){
                toast.success('🦄 Create a new user succeed!');
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFailed());
            }

        } catch (error) {
            dispatch(saveUserFailed());
            toast.error('🦄 saveUserFailed  error!');
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type:actionTypes.CREATE_USER_FAILED
})


export const fetchAllUsersStart =  () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL')
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }else{
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            toast.error('🦄 fetchAllUsersFailed error!');
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type:actionTypes.FETCH_ALL_USERS_FAILED
})


export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success('🦄 Delete user succeed!');
                dispatch(deleteUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(deleteUserFailed());
            }

        } catch (error) {
            dispatch(deleteUserFailed());
            toast.error('🦄 Delete user error!');
        }
    }
}

export const deleteUserSuccess = () => ({
    type:actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type:actionTypes.DELETE_USER_FAILED
})