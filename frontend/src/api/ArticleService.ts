
import getCrudifulAxios from './axios_config';
import { Article } from "components/models";

export const ArticleService = {
  getArticles: async (): Promise<Article[]> => {
    const axios = getCrudifulAxios();
    const response = await axios.get<Article[]>('/articles');
    return response.data;
  },
  createArticle: async (newArticle: Omit<Article, 'id'>): Promise<Article> => {
    const axios = getCrudifulAxios();
    const response = await axios.post<Article>('/articles', newArticle);
    return response.data;
  },
  updateArticle: async (articleId: number, articleData: Partial<Article>): Promise<Article> => {
    const axios = getCrudifulAxios();
    const response = await axios.put<Article>(`/articles/${articleId}`, articleData);
    return response.data;
  },
  deleteArticle: async (articleId: number): Promise<void> => {
    const axios = getCrudifulAxios();
    await axios.delete<void>(`/articles/${articleId}`);
  },
};
