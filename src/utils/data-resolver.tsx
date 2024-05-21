type ICatalog = {
    _id?: string,
    name: string,
    description?: string,
}
type IAutoComplete = {
    title: string,
    label: string,
}
class DataResolver {
    constructor() {

    }

    resolveCatalogAutoComplete(data: ICatalog[]): IAutoComplete[] {
        return data.map((item) => {
            return {
                title: item.name,
                label: item.name
            }
        })
    }
}

const dataResolver = new DataResolver();
export default dataResolver;