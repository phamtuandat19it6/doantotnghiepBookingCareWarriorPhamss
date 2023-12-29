import axios from '../axios';
const handleLoginApi = (email,password) => {
    return axios.post('/api/login',{email,password});
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    console.log('check data from service:',data)
    return axios.post(`/api/create-new-user`,data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user',inputData)
}
const getAllCodeService = (inputType) =>{
    return axios.get(`/api/allcode?type=${inputType}`)
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveInforDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`,data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`,data)
}
const getScheduleDoctorByDate = (doctorId,date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor_doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientInfor = (data) => {
    return axios.post(`/api/save-patients-infor`,data)
}
const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-patients-booking-infor`,data)
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`,data)
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const createNewClinic = (data) => {
    return axios.post(`/api/create-new-Clinic`,data)
}
const getAllclinic = () => {
    return axios.get(`/api/get-all-clinic`)
}
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const deleteClinicService = (ClinicId) => {
    return axios.delete('/api/delete-clinic', {
        data: {
            id: ClinicId
        }
    })
}
const getAllPatientForDoctor = (data)=>{
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) =>{
    return axios.post(`/api/send-remedy`,data)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveInforDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraDoctorById,
    getProfileDoctorById,
    postPatientInfor,
    postVerifyBookingAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    createNewClinic,
    getAllclinic,
    getDetailClinicById,
    deleteClinicService,
    getAllPatientForDoctor,
    postSendRemedy
    // saveInforClinic
}