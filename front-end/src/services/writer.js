import service from "./service";

const Writer = {
    all: async () => {
        let response = await service.get("writers/");
        return response;
    },
};

export default Writer;
