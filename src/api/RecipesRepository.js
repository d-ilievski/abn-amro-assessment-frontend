import Repository from './Repository';

const resource = '/recipes';

export default {
    createRecipe(model) {
        return Repository.post(`${resource}/CreateRecipe`, model);
    },
    getRecipe(id) {
        return Repository.get(`${resource}/GetRecipe/${id}`);
    },
    updateRecipe(model) {
        return Repository.post(`${resource}/UpdateRecipe`, model);
    },
    deleteRecipe(id) {
        return Repository.post(`${resource}/DeleteRecipe/${id}`, model);
    },
    listRecipes() {
        return Repository.get(`${resource}/ListRecipes`);
    },
};
