
<template>
  <q-page>
    <q-btn @click="showAddArticleDialog = true" label="Add Article" color="primary" class="q-mb-md" />

    <q-dialog v-model="showAddArticleDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Article</div>
          <q-input v-model="newArticle.title" label="Title" class="q-ma-md" />
          <q-input v-model="newArticle.content" label="Content" type="textarea" class="q-ma-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
          <q-btn flat label="Add" color="primary" @click="addArticle" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-table
      title="Articles"
      :rows="articles"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-ops="props">
        <q-td :props="props">
          <q-btn dense flat icon="edit" @click="editArticle(props.row)" />
          <q-btn dense flat icon="delete" color="negative" @click="deleteArticle(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>


<script lang="ts">
import { useArticlesCrud } from 'src/hooks/useArticleCrud';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const {
      showAddArticleDialog,
      articles,
      newArticle,
      loadArticles,
      addArticle,
      deleteArticle,
    } = useArticlesCrud();

    loadArticles();

    return {
      showAddArticleDialog,
      articles,
      newArticle,
      loadArticles,
      addArticle,
      deleteArticle,
    };
  },
});
</script>
