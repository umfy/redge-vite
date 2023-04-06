<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useTodoStore } from '../stores/todo'
import type {Todo} from '../stores/todo'
import TodoItem from '../components/todo/TodoItem.vue'
import LoaderBase from '../components/design/loader/LoaderBase.vue'
import DialogBase from '../components/design/dialog/DialogBase.vue'
import TodoForm from '../components/todo/TodoForm.vue'
import CardBase from '../components/design/card/CardBase.vue'
import ButtonBase from '../components/design/button/ButtonBase.vue'
import InputText from '../components/design/input/InputText.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const todoStore = useTodoStore()
todoStore.fetchTodoList()

const activeTodoId = ref<number | null>(null)
async function deleteTodo(id: number | null) {
  if (!id) return
  todoStore.deleteTodo(id)
}
function editTodo(id: number | null) {
  if (!id) return
  activeTodoId.value = id
  isTodoFormDialogOpen.value = true
}
function addTodo() {
  activeTodoId.value = null
  isTodoFormDialogOpen.value = true
}

/* front-end pagination and filtering*/
const searchText = ref('')
const page = ref(1)
const pageSize = ref(3)
const startIndex = ref(0)
const endIndex = ref(0)
const filteredLength = ref(0)
const paginationMessage = ref('')
const filteredTodoList = ref<Todo[]>([])

watchEffect(() => {
  filteredTodoList.value = setFilteredTodoList()
})

function setFilteredTodoList() {
  const filtered = todoStore.todoList.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.value.toLowerCase())
  )
  filteredLength.value = filtered.length

  const totalPages = Math.ceil(filteredLength.value / pageSize.value)
  if (page.value > totalPages) {
    page.value = totalPages
  }
  if (page.value < 1) {
    page.value = 1
  }
  startIndex.value = (page.value - 1) * pageSize.value
  endIndex.value = startIndex.value + pageSize.value

  if (endIndex.value > filteredLength.value) {
    endIndex.value = filteredLength.value
  }
  paginationMessage.value = setPaginationMessage()
  return filtered.slice(startIndex.value, endIndex.value)
}

function setPaginationMessage() {
  if (!filteredLength.value) {
    return t('todoList.pagination.noData')
  }
  return t('todoList.pagination.info', {
    start: startIndex.value + 1,
    end: endIndex.value,
    total: filteredLength.value
  })
}

const isTodoFormDialogOpen = ref(false)
</script>

<template>
  <div class="item-list">
    <CardBase class="options-card">
      <div class="search">
        <InputText v-model="searchText" :label="t('todoList.headers.searchBar')"></InputText>
      </div>

      <ButtonBase @click="addTodo" class="add-button">{{ t('todoList.buttons.add') }}</ButtonBase>
    </CardBase>

    <TodoItem
      v-for="todo of filteredTodoList"
      :key="String(todo.id)"
      :todo="todo"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
    ></TodoItem>
  </div>

  <div class="pagination-controls">
    <ButtonBase @click="page--">{{ t('todoList.buttons.back') }}</ButtonBase>
    <p>
      {{ paginationMessage }}
    </p>
    <ButtonBase @click="page++">{{ t('todoList.buttons.next') }}</ButtonBase>
  </div>

  <LoaderBase :is-loading="todoStore.isLoading"></LoaderBase>
  <DialogBase :label="t('todoList.headers.modification')" v-model:is-open="isTodoFormDialogOpen">
    <TodoForm @submit="isTodoFormDialogOpen = false" :todoId="activeTodoId"></TodoForm
  ></DialogBase>
</template>

<style scoped>
.item-list {
  margin-inline: 4rem;
}
.options-card {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
}
.search {
  flex-grow: 2;
  margin: 1rem;
}
.add-button {
  padding-top: 1.5rem;
}
.pagination-controls {
  display: flex;
  justify-content: space-evenly;
}
</style>
