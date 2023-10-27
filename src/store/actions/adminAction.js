import actionTypes from './actionTypes';
import { getAllCodeService,createNewUserService,getAllUsers,deleteUserService,editUserService,getTopDoctorHomeService,getAllDoctorService,saveInforDoctorService  } from '../../services/userSevice';
import {toast} from "react-toastify"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            console.log(error)
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
            console.log(error)
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
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }else if(res && res.errCode === 1){
                toast.error(res.errMessage);
            }
            else{
                dispatch(saveUserFailed());
            }

        } catch (error) {
            dispatch(saveUserFailed());
            toast.error('🦄 saveUserFailed  error!');
            console.log(error)
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
            console.log(error)
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
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(deleteUserFailed());
            }

        } catch (error) {
            dispatch(deleteUserFailed());
            toast.error('🦄 Delete user error!');
            console.log(error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type:actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type:actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);

            if(res && res.errCode === 0){
                toast.success('Update the user succeed!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(editUserFailed());
                toast.error('Update the user error!');
            }

        } catch (error) {
            dispatch(editUserFailed());
            toast.error('Update the user error!');
            console.log(error)
        }
    }
}

export const editUserSuccess = () => ({
    type:actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type:actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTORS_FAILED',error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })

        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log('FETCH_ALL_DOCTORS_FAILED',error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })

        }
    }
}

export const saveInforDortor = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforDoctorService(inputData);
            if(res && res.errCode === 0){
                toast.success('🦄 Save infor th doctor succeed!');
                dispatch({
                    type: actionTypes.FETCH_SAVE_INFOR_DOCTORS_SUCCESS,
                })
            }else{
                console.log('err res',res)
                toast.error('Save infor doctor error');
                dispatch({
                    type: actionTypes.FETCH_SAVE_INFOR_DOCTORS_FAILED,
                })
            }


        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_SAVE_INFOR_DOCTORS_FAILED,
            })
            toast.error('🦄 Save infor doctor error!');
            console.log('save dơ:', error)
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (error) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED',error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })

        }
    }
}
export const fetchAllRequiredDoctorInfor =  () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type:actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})
            let resPrice = await getAllCodeService('PRICE')
            let resPayment = await getAllCodeService('PAYMENT')
            let resProvince = await getAllCodeService('PROVINCE')

            if(resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0){
                    let data = {
                        resPrice:resPrice.data,
                        resPayment:resPayment.data,
                        resProvince:resProvince.data,
                    }
                dispatch(fetchAllRequiredDoctorInforSuccess(data));

            }else{
                dispatch(fetchAllRequiredDoctorInforFailed());
            }

        } catch (error) {
            dispatch(fetchAllRequiredDoctorInforFailed());
            console.log('fetchAllRequiredDoctorInforStart error',error)
        }
    }

}
export const fetchAllRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_SUCCESS,
    allRequiredData: allRequiredData
})
export const fetchAllRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_FAILED
})