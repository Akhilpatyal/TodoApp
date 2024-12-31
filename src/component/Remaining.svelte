<script lang="ts">
    export let incompleteTodos: number
</script>
<span class="todo-count">
    {incompleteTodos}
    {incompleteTodos ===1 ? " items" : " item"} left
</span>