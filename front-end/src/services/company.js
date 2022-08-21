import service from "./service";



const Company  = ({
    all: async () =>{
        let response = await service.get("companies/");
        return response;
    }
})

export default Company;
