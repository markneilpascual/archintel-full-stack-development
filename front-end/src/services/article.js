import service from "./service";

const Article = {
    all: async () => {
        let response = await service.get("articles/");
        return response;
    },
    filter: async (filter) => {
        let response = await service.get("articles/",{
            params: filter
        })
        return response
    },

    find: async (slug) => {
        let response = await service.get(`articles/${slug}/`)
        return response
    },
    
    save: async(data) =>{
        let response = await service.post("articles/",data)
        return response
    }
};

export default Article;
