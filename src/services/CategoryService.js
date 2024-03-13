import axios from "axios";

const BASE_URL="http://localhost:8080/category"

class CategoryService{

    async  getCategories(){

        return await axios.get(BASE_URL+"/all",{withCredentials:true});
    }

    async saveCategory(category){

        
        return axios.post(BASE_URL,category,{withCredentials:true})
    }

    async saveFile(formData){

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        return await axios.post("http://localhost:8080/image",formData,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}})
    }
}


export default CategoryService;


