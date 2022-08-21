import service from "./service";

const Category  = ({
    all: async () =>{
        let response = await service.get("categories/");
        return response;
    }
})

export default Category;
