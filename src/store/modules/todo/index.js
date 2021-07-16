import addTodo from './modules/addTodo'
import getList from './modules/getList'
import updateTodo from './modules/updateTodo'
import deleteTodo from './modules/deleteTodo'
const todo = {
  namespaced: true,
  modules: { addTodo, getList, updateTodo, deleteTodo },
}

export default todo
