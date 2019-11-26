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
    delete(id) {
        return Repository.delete(`${resource}/${id}`);
    },
    list(query = "", page = 0) {
        return Repository.get(`${resource}?size=10&page=${page}&query=${query}`);
    },
};
