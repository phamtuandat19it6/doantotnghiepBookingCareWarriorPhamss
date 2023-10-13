import { reject } from "lodash";

class CommonUtils {
    static getBase64(file) {
        return new Promise((resole,reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resole(reader.result);
            reader.onerror =  error => reject(error);

        });
    }
}

export default CommonUtils;