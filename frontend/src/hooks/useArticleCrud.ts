import { ref, reactive } from 'vue';


import { useQuasar } from 'quasar';
import { ArticleService } from 'src/api/ArticleService';
import { Article } from 'components/models';

export function useArticlesCrud() {
  const $q = useQuasar();
  const showAddArticleDialog = ref(false);
  const articles = ref<Article[]>([]);
  const newArticle = reactive<Omit<Article, 'id'>>({
    title: '',
    content: '',
    date_created: new Date(),
    date_updated: new Date(),
    author: {
      user_id: 0,
      email: 'anonymous@mail.com',
      first_name: 'First',
      last_name: 'Last',
    },
  });

  const loadArticles = async () => {
    try {
      articles.value = await ArticleService.getArticles();
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Failed to load articles' });
    }
  };

  const addArticle = async () => {
    try {
      const addedArticle = await ArticleService.createArticle(newArticle);
      articles.value.push(addedArticle);
      clearNewArticle();
      $q.notify({ type: 'positive', message: 'Article added successfully' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Failed to add article' });
    }
  };

  const clearNewArticle = () => {
    newArticle.title = '';
    newArticle.content = '';
  };

  const deleteArticle = async (articleId: number) => {
    try {
      await ArticleService.deleteArticle(articleId);
      await loadArticles();
      $q.notify({ type: 'positive', message: 'Article deleted successfully' });
    } catch (error) {
      $q.notify({ type: 'negative', message: 'Failed to delete article' });
    }
  };

  return {
    showAddArticleDialog,
    articles,
    newArticle,
    loadArticles,
    addArticle,
    deleteArticle,
  };
}
