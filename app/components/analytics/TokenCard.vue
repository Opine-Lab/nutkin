<template>
  <div class="group p-3 md:p-4 rounded-xl transition-all cursor-pointer">
    <!-- Token 指标 -->
    <slot name="metrics"></slot>
    
    <!-- 分隔线 -->
    <div class="mt-4 pt-3 border-t border-white/5">
      <!-- 左右布局：左边 3/5 走势图，右边 2/5 交易记录 -->
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- 左侧：走势图 (3/5) -->
        <div class="flex-1 lg:flex-[3]">
          <slot name="chart"></slot>
        </div>

        <!-- 右侧：交易记录 (2/5) -->
        <div class="flex-1 lg:flex-[2]">
          <slot name="trades"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Token 卡片容器组件 - 用于组织 Token 的各个部分
</script>
