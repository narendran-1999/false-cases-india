<script lang="ts">
    import SendHorizontal from '@lucide/svelte/icons/send-horizontal';

    async function onclick() {
        const url = "https://narendran-1999.github.io/false-cases-india/";
        // Change if deploying elsewhere
        
        window.prompt("Copy this link to share:", url);
    }
</script>

<button
    class="
        flex gap-3 items-center px-6 py-2
        border-2 border-gray-100 font-semibold text-gray-100
        bg-[#ffffff18] hover:bg-[#ffffff37] active:bg-[#ffffff37]
        transition cursor-pointer
    "
    {onclick}
>
    Share to spread awareness
    <SendHorizontal size={16} />
</button>