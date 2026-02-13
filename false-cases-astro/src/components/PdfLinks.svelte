<script lang="ts">
    import { pdfUrls, backupDriveUrl } from "../data/ncrb-pdf-urls";
    import { X } from "lucide-svelte";

    let isOpen = $state(false);

    function onclick() {
        isOpen = !isOpen;
    }
</script>

<button
    class="
    sm:self-start px-6 py-2 mt-2
    text-white font-medium bg-[#ee2f2f] hover:bg-[#c72727]
    transition cursor-pointer
    "
    {onclick}
>
    Direct PDF Links to Reports
</button>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="w-9/10 max-w-lg bg-white p-4 shadow-lg">
            <div class="mb-4 flex items-center justify-between">
                <h2 class="text-lg font-semibold text-red-600">PDF Links</h2>

                <button
                    class="
                    p-2 text-sm text-red-500 bg-red-100
                    hover:text-white hover:bg-red-500 transition cursor-pointer
                    "
                    {onclick}
                >
                    <X size={20} />
                </button>
            </div>

            <div class="mb-4">
                <a href={backupDriveUrl} target="_blank" class="text-red-600 hover:underline">
                    Backup Drive Link (Relevant pages only)
                </a>
            </div>

            <table class="w-full text-sm">
                <thead class="bg-gray-300">
                    <tr>
                        <th class="px-2 py-1 text-left">Year</th>
                        <th class="px-2 py-1 text-left">Pages (in print)</th>
                        <th class="px-2 py-1 text-left">Official Doc</th>
                    </tr>
                </thead>

                <tbody>
                    {#each pdfUrls as row}
                        <tr class="odd:bg-gray-100 even:bg-gray-200">
                            <td class="px-2 py-1">{row.year}</td>
                            <td class="px-2 py-1">{row.pages}</td>
                            <td class="px-2 py-1">
                                <a href={row.url} target="_blank" class="text-red-600 hover:underline">View PDF</a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{/if}