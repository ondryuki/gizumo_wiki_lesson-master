<template>
  <div class="article-post">
    <div v-if="errorMessage" class="article-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div class="article-post__columns">
      <section class="article-post-editor">
        <app-heading :level="1">記事の新規作成</app-heading>
        <app-heading
          class="article-post-editor-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <app-select
          v-validate="'required'"
          name="category"
          data-vv-as="カテゴリー"
          :error-messages="errors.collect('category')"
          :value="value"
          @update-value="$emit('selected-article-category', $event)"
        >
          <option value=""> --- </option>
          <option
            v-for="(category) in categoryList"
            :key="category.id"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </app-select>
        <app-heading
          class="article-post-editor-title"
          :level="2"
        >
          タイトル・本文
        </app-heading>
        <div class="article-post-form">
          <app-input
            v-validate="'required'"
            name="title"
            type="text"
            placeholder="記事のタイトルを入力してください。"
            required
            white-bg
            data-vv-as="記事のタイトル"
            :error-messages="errors.collect('title')"
            :value="articleTitle"
            @update-value="$emit('edited-title', $event)"
          />
        </div>

        <div class="article-post-form">
          <app-textarea
            v-validate="'required'"
            name="content"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            required
            white-bg
            data-vv-as="記事の本文"
            :error-messages="errors.collect('content')"
            :value="articleContent"
            @update-value="$emit('edited-content', $event)"
          />
        </div>
        <app-button
          class="article-post-submit"
          button-type="submit"
          round
          :disabled="!disabled"
          @click="handleSubmit"
        >
          {{ buttonText }}
        </app-button>
      </section>

      <article class="article-post-preview">
        <app-markdown-preview
          :markdown-content="markdownContent"
        />
      </article>
    </div>
  </div>
</template>

<script>
import {
  Heading, Input, Textarea, MarkdownPreview, Button, Select, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    appButton: Button,
    appSelect: Select,
    appText: Text,
  },
  props: {
    articleTitle: {
      type: String,
      default: '',
    },
    articleContent: {
      type: String,
      default: '',
    },
    markdownContent: {
      type: String,
      default: '',
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '作成権限がありません';
      return this.loading ? '作成中...' : '作成';
    },
    disabled() {
      return this.access.create && !this.loading;
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.create) return;
      this.$validator.validate().then(valid => {
        if (valid) this.$emit('handle-submit');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.article-post {
  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
    &-title {
      margin-top: 16px;
    }
  }
  &__columns {
  display: flex;
  height: 100%;
  }
  &-preview {
    margin-left: 2%;
    width: 48%;
    overflow-y: scroll;
    background-color: #fff;
  }
  &-form {
    margin-top: 20px;
  }
  &-submit {
    margin-top: 16px;
  }
  &__notice {
    margin-bottom: 16px;
  }
}
</style>
