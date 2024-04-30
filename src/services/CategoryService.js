import { axiosInstance } from '../interceptor';

class CategoryService{

    async  getCategories(){

        return await axiosInstance.get("/category/all",{withCredentials:true});
    }

    async saveCategory(category){

        // console.log(category)
        // for (var key of category.entries()) {
        //         console.log(key[0] + ', ' + key[1]);
        //     }
        return axiosInstance.post("/category",category,{withCredentials:true})
    }

    async saveFile(formData){
        return await axiosInstance.post("/image/category",formData,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}})
    }
}


export default CategoryService;


