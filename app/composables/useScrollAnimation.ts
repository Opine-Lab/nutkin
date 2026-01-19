export const useScrollAnimation = () => {
  const observedElements = ref<Set<Element>>(new Set())

  const observe = (element: Element) => {
    if (!element || observedElements.value.has(element)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入视口，添加动画类
            entry.target.classList.add('animate-in')
            // 动画完成后停止观察
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1, // 10% 可见时触发
        rootMargin: '0px 0px -50px 0px' // 提前 50px 触发
      }
    )

    observer.observe(element)
    observedElements.value.add(element)
  }

  const observeAll = (selector: string) => {
    if (import.meta.client) {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => observe(el))
    }
  }

  return {
    observe,
    observeAll
  }
}
