import { saveAs } from 'file-saver'
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 格式化文件大小
 * @param size
 */
export const formatSize = (size?: number) => {
  if (!size) return '未知'
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  return (size / (1024 * 1024)).toFixed(2) + ' MB'
}

/**
 * 下载图片
 * @param url 图片下载地址
 * @param fileName 要保存为的文件名
 */
export function downloadImage(url?: string, fileName?: string) {
  if (!url) {
    return
  }
  saveAs(url, fileName)
}

/**
 * 图片主色调转换
 * @param input
 */
export function toHexColor(input) {
  // 去掉 0x 前缀
  const colorValue = input.startsWith('0x') ? input.slice(2) : input

  // 将剩余部分解析为十六进制数，再转成 6 位十六进制字符串
  const hexColor = parseInt(colorValue, 16).toString(16).padStart(6, '0')

  // 返回标准 #RRGGBB 格式
  return `#${hexColor}`
}

/**
 * 处理分析数据组件防抖
 * @param chartRef
 */
export function useChartResize(chartRef: any) {
  // 防抖函数
  function useDebounce(fn: Function, delay: number) {
    let timer: NodeJS.Timeout | null = null
    return function(this: any, ...args: any[]) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }

  // 处理图表 resize
  const handleResize = () => {
    if (chartRef.value) {
      chartRef.value.resize()
    }
  }

  // 创建防抖后的 resize 处理函数
  const debounceResize = useDebounce(handleResize, 300)

  // 组件挂载时添加 resize 监听
  onMounted(() => {
    window.addEventListener('resize', debounceResize)
  })

  // 卸载时移除监听
  onUnmounted(() => {
    window.removeEventListener('resize', debounceResize)
  })
}

