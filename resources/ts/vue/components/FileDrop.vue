<!-- 参考：https://medium.com/swlh/drop-and-click-file-upload-with-vuetifyjs-f2c2a8357377 -->
<template>
    <v-sheet
      id="dropzone"
      ref="dzone"
      tabindex="0"
      title="Click to grap a file from your PC!"
      color="indigo lighten-4"
      width="98%"
      style="cursor:pointer;"
      class="pa-2"
    >

      <input
        ref="upload"
        id="fileUpload"
        type="file"
        style="display:none"/>
      <v-row justify="center" align="center">
        <v-icon
          v-if="!dragover"
          color="indigo darken-2"
          size="75"
        >mdi-cloud-upload-outline</v-icon>
        <v-icon
          v-if="dragover"
          color="indigo darken-2"
          size="75"
        >mdi-book-plus</v-icon>
      </v-row>
      <v-row justify="center" align="center">
        <span class="title indigo--text text--darken-2">ドラッグ&ドロップ または クリックでファイルをアップロードしてください</span>
      </v-row>
    </v-sheet>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Emit } from "vue-property-decorator"
@Component
export default class FileDrop extends Vue{

  // internal properties
  formUpload: boolean = false
  dragover: boolean = false

  /**
   * マウント時に実行されるメソッド
   *
   */
  mounted () {
    // to register listeners, we have to know the
    // html elements
    const dropzone = this.$el
    const fileupload = this.$el.firstElementChild as HTMLElement
    // register listeners on your dropzone / v-sheet
    if(dropzone) {
      // register all drag & drop event listeners
      dropzone.addEventListener("dragenter", e => {
        e.preventDefault()
        this.dragover = true
      })
      dropzone.addEventListener("dragleave", e => {
        e.preventDefault()
        this.dragover = false
      })
      dropzone.addEventListener("dragover", e => {
        e.preventDefault()
        this.dragover = true
      })
      dropzone.addEventListener("drop", e => {
        e.preventDefault()
        const dragevent = e as DragEvent
        if(dragevent.dataTransfer) {
          this.filesSelected(dragevent.dataTransfer.files)
        }
      })
      // register event listener for keyboard usage
      dropzone.addEventListener("click", e => {
        // e.preventDefault();
        console.log(fileupload);
        if(fileupload) {
          fileupload.click()
        }
      })
      dropzone.addEventListener("keypress", e => {
        e.preventDefault()
        const keyEvent = e as KeyboardEvent
        if (keyEvent.key === "Enter") {
          if(fileupload)
            fileupload.click()
        }
      })
      // register listeners on the file input
      if(fileupload) {
        fileupload.addEventListener("change", e => {
          const target = (e.target as HTMLInputElement)
          if(target.files) {
            this.filesSelected(target.files)
          }
        })
    }
    }
  }
  /**
   * upload event...
   */
  @Emit()
  filesSelected(fileList: FileList) {
    this.dragover = false
  }
}
</script>
