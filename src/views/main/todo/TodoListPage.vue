<template>
  <div class="fluid">
    <div class="todo">
      <div class="todo__input">
        <h1>{{ $t('Todo.title') }}</h1>
        <div class="todo__input-form">
          <div class="todo__input-form-group">
            <base-input-text
              class="input"
              v-model="newTodo"
              :placeholder="this.$t('Todo.placeholder')"
            ></base-input-text>
            <div v-if="submited">
              <div class="error" v-if="!$v.input.required">
                {{ $t('validate.inputTodo') }}
              </div>
            </div>
          </div>
          <base-button class="btn" @click="submitTodo">
            {{ $t('Todo.btnAddTodo') }}
          </base-button>
        </div>
      </div>
      <loader v-if="loading"></loader>
      <todo-item
        class="todo__items"
        v-for="item in filterTodos"
        :key="item.id"
        :item="item"
      ></todo-item>
      <div class="filter">
        <base-button class="filter__btn" @click="clickAll">
          {{ $t('Todo.btnAll') }}
        </base-button>
        <base-button class="filter__btn" @click="clickProgress">
          {{ $t('Todo.btnIncompleted') }}
        </base-button>
        <base-button class="filter__btn" @click="clickDone">
          {{ $t('Todo.btnCompleted') }}
        </base-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      edit: false,
      newTodo: '',
      placeholder: this.$t('Todo.placeholder'),
      submited: false,
      filter: 'all',
    }
  },
  validations: {
    input: {
      required,
    },
  },
  methods: {
    ...mapActions('todo/addTodo', {
      addTodos: 'addTodoItem',
    }),
    ...mapActions('todo/getList', {
      getTodoList: 'getList',
    }),
    clickAll() {
      this.filter = 'all'
    },
    clickProgress() {
      this.filter = 'progress'
    },
    clickDone() {
      this.filter = 'done'
    },
    async submitTodo() {
      this.$v.$touch()
      if (this.$v.$invalid && this.newTodo.trim().length == 0)
        return (this.submited = true)

      await this.addTodos({
        description: this.newTodo,
      })
      this.submited = false
      this.newTodo = ''
    },
  },
  async created() {
    await this.getTodoList()
  },
  computed: {
    ...mapState('todo/getList', {
      loader: 'loading',
    }),
    loading: function() {
      return this.loader
    },
    filterTodos() {
      return this.$store.getters[`todo/getList/${this.filter}`]
    },
  },
}
</script>
<style lang="scss" scoped>
.fluid {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .todo {
    background: #fff;
    box-shadow: 0px 20px 20px 20px rgba(0, 0, 0, 0.1);
    width: 60%;
    padding: 30px;
    border-radius: 5px;
    .todo__input {
      h1 {
        margin: 10px auto 20px;
        font-size: 40px;
      }
      &-form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px 0px;
        &-group {
          display: flex;
          flex-direction: column;
          width: 80%;
          .input {
            width: 100%;
            align-items: center;
            padding: 10px;
          }
          .error {
            padding: 0px 10px;
            color: red;
          }
        }
        .btn {
          padding: 10px;
          margin: auto;
          justify-content: center;
          width: 20%;
          height: 60px;
        }
      }
    }
    .todo__items {
      margin: 20px 10px 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border: 1px solid #8ca6db;
      padding: 10px 20px;
      border-radius: 5px;
    }
  }
  .filter {
    display: flex;
    flex-direction: row;
    margin: auto;
    &__btn {
      margin: 10px;
      width: 220px;
    }
  }
}
</style>
