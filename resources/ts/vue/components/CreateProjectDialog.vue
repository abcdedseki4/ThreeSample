<template>
  <v-card>
    <v-card-title>プロジェクト登録 </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="タイトル"
              v-model="title"
              required
            ></v-text-field>
            <v-textarea
              label="概要"
              v-model="description"
              required
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="cancel" @click="cancel()"> キャンセル </v-btn>
      <v-btn text color="success" @click="submit()"> 登録 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CreateProjectDialog extends Vue {

  /**
   * タイトル
   */
  @Prop()
  private title: string = "";

  /**
   * 概要
   */
  @Prop()
  private description: string = "";

  /**
   * 登録ボタンクリック時のイベント
   */
  private submit(): void {
    this.$emit("clickSubmit", {
      title: this.title,
      description: this.description,
    });
  }

  /**
   * キャンセルボタンクリック時のイベント
   */
  private cancel(): void {
    this.$emit("clickCancel", {});
  }
}
</script>
