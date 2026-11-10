<script setup lang="ts" generic="T extends string">
defineProps<{
  label: string
  options: { value: T; label: string; count?: number }[]
  modelValue: T
}>()

const emit = defineEmits<{ 'update:modelValue': [value: T] }>()
</script>

<template>
  <div class="chips" role="group" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="chip"
      :aria-pressed="option.value === modelValue"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
      <span v-if="option.count !== undefined" class="chip__count">{{ option.count }}</span>
    </button>
  </div>
</template>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.5rem;
  padding: 0.5rem 0.95rem;
  border: 1px solid rgb(78 48 32 / 0.32);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text);
  font-size: var(--text-sm);
  font-weight: 550;
  transition:
    background-color var(--duration-fast) ease,
    border-color var(--duration-fast) ease;
}

.chip:hover {
  border-color: var(--color-primary);
  background: var(--color-surface);
}

.chip[aria-pressed='true'] {
  border-color: var(--color-primary);
  background: var(--color-accent);
  color: var(--color-primary);
}

.chip__count {
  color: var(--color-text-muted);
  font-size: var(--text-2xs);
  font-variant-numeric: tabular-nums;
}

.chip[aria-pressed='true'] .chip__count {
  color: var(--color-primary);
}
</style>
