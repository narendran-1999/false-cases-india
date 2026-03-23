<!--

PROBLEM:
- Navigator not working anywhere
- Copy to clipboard not working on mobile (falls back to prompt with text field for copying)

-->

<script lang="ts">
    import { SendHorizontal } from "lucide-svelte";

    async function copyToClipboard(url: string) {
        try {
            if (!navigator.clipboard) throw new Error();

            await navigator.clipboard.writeText(url);
            alert("Site link copied. Please share to spread awareness.");
        } catch {
            window.prompt("Copy this link:", url);
        }
    }

    async function onclick() {
        const url = "https://narendran-1999.github.io/false-cases-india/";
        // Change if deploying elsewhere

		if (navigator.share) {
            try{
                await navigator.share({
                    title: 'Misuse of Indian Law by Women',
                    text: 'Check out this site for info on fake reports in \'Crimes Against Women\' in India.',
                    url,
                });
            } catch (err) {
                await copyToClipboard(url);
            }
		} else {
			await copyToClipboard(url);
		}
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