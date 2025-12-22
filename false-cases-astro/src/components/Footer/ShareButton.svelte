<script lang="ts">
    import { Send } from "lucide-svelte";

    // Function to handle share button click
    function onclick() {
        // change this if deploying elsewhere
        const url: string = 'https://narendran-1999.github.io/false-cases-india/';

		if (navigator.share) {
			navigator.share({
				title: 'False Cases India',
                text: 'Fake reports in crimes against women are more common than you think.',
				url,
			}).catch(() => {});
		} else {
			navigator.clipboard.writeText(url);
			alert('Site link copied. Please share to spread awareness.');
		}
    };
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
    <Send size={16} fill="white" />
    Share
</button>