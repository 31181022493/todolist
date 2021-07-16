<template>
  <div>
    <div class="todo__items-input">
      <div
        v-if="!edit"
        :class="{ completed: item.completed, ellipsis: isEllipsis }"
      >
        <textBase
          :class="{ ellipsis: isEllipsis }"
          @click="isEllipsis = !isEllipsis"
        >
          {{ item.description }}
        </textBase>
      </div>
      <input
        v-else
        type="text"
        class="edit-input"
        v-model="item.description"
        @keyup.esc="cancelEdit"
        @keyup.enter="updateTask(item)"
      />
      <input
        type="checkbox"
        v-model="item.completed"
        @change="updateTask(item)"
      />
    </div>
    <div class="todo__items-icon">
      <span @click="deleteTask(item)"><i class="fas fa-times"></i></span>
      <span @click="editTodo" v-if="!item.completed">
        <i class="fas fa-edit"></i>
      </span>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      edit: false,
      isEllipsis: true,
    }
  },
  methods: {
    ...mapActions('todo/updateTodo', {
      updateItem: 'updateTodoItem',
    }),
    ...mapActions('todo/deleteTodo', {
      deleteItem: 'deleteTodoItem',
    }),
    editTodo() {
      this.edit = !this.edit
    },
    cancelEdit() {
      this.edit = false
    },
    async updateTask(item) {
      const updateInfor = {
        id: item._id,
        description: item.description,
        completed: item.completed,
      }
      if (this.item.description.trim() == '') {
        return this.deleteTask(item)
      }
      await this.updateItem(updateInfor)
      this.edit = false
    },
    deleteTask(item) {
      this.$confirm('Are you sure ?')
        .then(async () => {
          const deleteInfor = {
            id: item._id,
            description: item.description,
            completed: item.completed,
          }
          await this.deleteItem(deleteInfor)
        })
        .catch(() => {
          return
        })
    },
  },
}
</script>
<style lang="scss">
div {
  .todo__items-input {
    display: flex;
    flex-direction: row-reverse;
    margin: auto 10px;
    div {
      margin: auto 30px;
      font-size: 25px;
    }
    input {
      margin: auto 0px;
    }
    .edit-input {
      width: 500px;
      margin: auto 30px;
    }
  }
  .todo__items-icon {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    span {
      margin: auto 20px;
      cursor: pointer;
    }
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 500px;
    cursor: pointer;
  }
}
</style>
