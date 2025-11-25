<template>
  <div>
    <a-modal v-model:visible="visible" title="title" :footer="false" @cancel="closeModal">
      <h4>复制分享链接</h4>
      <a-typography-link copyable>
        {{ link }}
      </a-typography-link>
      <div style="margin-bottom: 16px"/>
      <h4>手机扫码查看</h4>
      <a-qrcode :value="link"/>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const open = ref<boolean>(false)

interface Props {
  title: string
  link: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '分享图片',
  link: 'https://www.codefather.cn',
})

const visible = ref(false)

// 打开弹窗
const openModal = () => {
  visible.value = true
}

//关闭弹窗
const closeModal = () => {
  visible.value = false
}

defineExpose({
  openModal
})
</script>
