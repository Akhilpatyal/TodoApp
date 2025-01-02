<script lang="ts">
    type ClearCompletedType = () => void;
    type CompleteTodoType=number

    export let completeTodos: CompleteTodoType;
    export let clearCompleted: ClearCompletedType;
</script>

<button on:click={clearCompleted} class:hidden={completeTodos === 0}
class="clear-completed">
    Clear Completed
</button>