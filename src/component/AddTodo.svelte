<script lang="ts">
  type AddTodoType=(todo:string)=>void
  type ToggleCompleteType=(event:MouseEvent)=>void
  type TodoAmountType=number
    export let addTodo: AddTodoType
    export let toggleComplete: ToggleCompleteType
    export let todoAmount: TodoAmountType

    let todo=''
    function handleSubmit(){
      if(todo.trim()===''){return}
      addTodo(todo)
      // console.log(todo)   done
      todo=''
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
  {#if todoAmount>0}
    <input on:click={toggleComplete} type="checkbox" id="toggle-all" class="toggle-all" />
    <label for="toggle-all" aria-label="Mark all as complete"> Mark all as complete</label>
    {/if}
    <input bind:value={todo} type="text" id="new-todo" class="new-todo" placeholder="What need to be done ?"/>
</form>

<style>
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
      content: '❯';
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
      color:#000;
      border-bottom: 1px solid var(--shadow-1);
    }
</style>