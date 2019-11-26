import Repository from "./Repository";

const resource = "/files";

export default {
  getRecipePhoto(id) {
    return Repository.get(`${resource}/${id}`);
  },
  uploadRecipePhoto(file, id) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    return Repository.post(`${resource}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
};
