// TODO this will be axios

const readAllTags = async () => {
  await setTimeout(() => {}, 1000);
  return { tags: ["taga", "tagb", "tagc", "tagd"] };
};

const notesApi = {
  readAllTags,
};

export default notesApi;
