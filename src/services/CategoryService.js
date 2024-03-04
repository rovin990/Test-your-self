import axios from "axios";

const BASE_URL="http://localhost:8080/category"

class CategoryService{

    async  getCategories(){

        return await axios.get(BASE_URL+"/all",{withCredentials:true, auth:{username:"kick990",password:"12345" } });
    }

    async saveCategory(category){

        
        return axios.post(BASE_URL,category,{withCredentials:true, auth:{username:"kick990",password:"12345" } })
    }

    async saveFile(formData){

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        return await axios.post("http://localhost:8080/image",formData,{withCredentials:true, auth:{username:"kick990",password:"12345" } ,headers:{"Content-Type":"multipart/form-data"}})
    }
}


export default CategoryService;


