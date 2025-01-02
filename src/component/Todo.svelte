<script lang="ts">
  import type { FiltersType, ITodo } from "$root/types/Todo.ts";
  import  useStorage  from '$root/stores/useStorage'
  import AddTodo from "./AddTodo.svelte";
  import Todos from "./Todos.svelte";
  import Left from "./Remaining.svelte";
  import FilterTodos from "./FilterTodo.svelte";
  import ClearTodos from "./ClearTodos.svelte";

  //let todo: ITodo[] = [
  //  { id: "1", text: "Todo 1", completed: false },
  //  { id: "2", text: "Todo 2", completed: false },
  //  { id: "3", text: "Todo 3", completed: false },
  //  { id: "4", text: "Todo 4", completed: false },
  //]; 
  //new add
  //var localStorage: Storage = window.localStorage;
  //let todo: ITodo[] = [];
  //
  //const storedTodo = localStorage.getItem('todo');
  //if (storedTodo) {
  //  todo = JSON.parse(storedTodo);
  //}
  //  $: {
  //    localStorage.setItem('todos', JSON.stringify(todo))
  //  }
//
  //
  let todo = useStorage<ITodo[]>('todos', [])

  let selectedFilter: FiltersType = "all";


  // compute
  $: todoAmount = $todo.length;
  $: incompleteTodos = $todo.filter((todo) => !todo.completed).length;
  $: filteredTodo = filterTodo($todo, selectedFilter);
  $: completeTodos = $todo.filter((todo)=> todo.completed).length;

  function generateRandomId(): string {
    return Math.random().toString(16).slice(2);
  }

  function addTodo(todoText: string): void {
    $todo = [{ id: generateRandomId(), text: todoText, completed: false }, ...$todo];
  }

  function toggleComplete(event: MouseEvent): void {
    const { checked } = event.target as HTMLInputElement;
    $todo = $todo.map((todo) => ({ ...todo, completed: checked }));
  }

  function completeTodo(id: string): void {
    $todo = $todo.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  function removeTodo(id: string): void {
    $todo = $todo.filter((todo) => todo.id !== id);
  }

  function EditTodo(id: string, newTodo: string): void {
    $todo = $todo.map((todos) =>
      todos.id === id ? { ...todos, text: newTodo } : todos
    );
  }

  function setFilter(newFilter: FiltersType):void {
    selectedFilter = newFilter;
  }

  function filterTodo(todo: ITodo[], filter: FiltersType): ITodo[] {
    switch (filter) {
      case "all":
        return todo;
      case "active":
        return todo.filter((todo) => !todo.completed);
      case "completed":
        return todo.filter((todo) => todo.completed);
      default:
        return todo;
    }
  }

  function clearCompleted(): void {
    $todo = $todo.filter((todo) => !todo.completed);
  }
</script>

<main>
  <div class="title">Todos</div>
  <section class="todos">
    <AddTodo {addTodo} {toggleComplete} {todoAmount} />
    {#if todoAmount}
      <ul class="todo-list">
        {#each filteredTodo as todos (todos.id)}
          <Todos {todos} {completeTodo} {removeTodo} {EditTodo} />
        {/each}
      </ul>
      <div class="actions">
        <Left {incompleteTodos} />
        <FilterTodos {selectedFilter} {setFilter} />
        <ClearTodos {clearCompleted} {completeTodos}/>
       
      </div>
    {/if}
  </section>
</main>


<style>
  /* Todos */

  .title {
    font-size: var(--font-80);
    font-weight: inherit;
    text-align: center;
    color: var(--color-title);
  }

  .todos {
    --width: 500px;
    --todos-bg: hsl(0 0% 98%);
    --todos-text: hsl(220 20% 14%);

    width: var(--width);
    color: black;
    background-color: var(--todos-bg);
    border-radius: var(--radius-base);
    border: 1px solid var(--color-gray-90);
    box-shadow: 0 0 4px var(--shadow-1);
  }

  .todo-list {
    list-style: none;
  }

  .actions {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-8) var(--spacing-16);
    font-size: 0.9rem;
    border-top: 1px solid var(--color-gray-90);
    color: white;
    background-color: black;
  }

  .actions:before {
    content: "";
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow:
      0 1px 1px hsla(0, 0%, 0%, 0.2),
      0 8px 0 -3px hsl(0, 0%, 96%),
      0 9px 1px -3px hsla(0, 0%, 0%, 0.2),
      0 16px 0 -6px hsl(0, 0%, 96%),
      0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
    z-index: -1;
  }

  /* Add todo */

  .toggle-all {
    width: 1px;
    height: 1px;
    position: absolute;
    opacity: 0;
  }

  .toggle-all + label {
    position: absolute;
    font-size: 0;
  }

  .toggle-all + label:before {
    content: "❯";
    display: block;
    padding: var(--spacing-16);
    font-size: var(--font-24);
    color: black;
    transform: rotate(90deg);
  }

  .toggle-all:checked + label:before {
    /* color: var(--color-gray-28); */
    color: black;
  }

  .new-todo {
    width: 100%;
    padding: var(--spacing-16);
    padding-left: 60px;
    font-size: var(--font-24);
    border: none;
    color: #000;
    border-bottom: 1px solid var(--shadow-1);
  }

 
</style>
