import axios from "axios";

import { ENVConstant } from "../constants/ENVConstant";

class CategoryService{

    async  getCategories(){

        return await axios.get(ENVConstant.BASE_URL+"/category/all",{withCredentials:true});
    }

    async saveCategory(category){

        
        return axios.post(ENVConstant.BASE_URL+"/category",category,{withCredentials:true})
    }

    async saveFile(formData){

        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        return await axios.post(ENVConstant.BASE_URL+"/image/category",formData,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}})
    }
}


export default CategoryService;


