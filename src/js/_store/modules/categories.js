import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    categories: [],
    deleteCategoryId: null,
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  user: {
    account_name: '',
    created_at: '',
    email: '',
    full_name: '',
    id: '',
    password_reset_flg: null,
    role: '',
    updated_at: '',
  },
  mutations: {
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
      state.loading = false;
    },
    failRequest(state, { message }) {
      state.errorMessage = `${message}が発生しています。ご確認の上、再度お試しください。`;
      state.loading = false;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        if (res.data.code === 0) throw new Error(res.data.message);
        const categories = res.data.categories.map(data => data);
        commit('doneGetAllCategories', categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
