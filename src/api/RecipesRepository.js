import Repository from './Repository';

const resource = '/recipes';

export default {
    create(model) {
        return Repository.post(`${resource}`, model);
    },
    get(id) {
        return Repository.get(`${resource}/${id}`);
    },
    update(model) {
        return Repository.put(`${resource}`, model);
    },
    delete(model) {
        return Repository.delete(`${resource}`, model);
    },
    list(model) {
        return Repository.post(`${resource}/ListRecipes`, model);
    },
};
