<script lang="ts">
    import { pdfUrls, backupDriveUrl } from "../data/ncrb-pdf-urls";
    import { X, ArrowRight } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";

    let isOpen = $state(false);

    function onclick() {
        isOpen = !isOpen;
    }
</script>

<!-- Button to open PDF Links Modal -->
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

<!-- PDF Links Modal & Backgound -->
{#if isOpen}
    <div
        class="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50
        "
        transition:fade
    >
        <div
            class="
                w-9/10 max-w-lg p-4
                bg-white shadow-lg
            "
            transition:scale
        >
            <div class="mb-4 flex items-center justify-between">
                <h2 class="text-lg font-semibold text-red-600">PDF Links</h2>

                <button
                    class="
                    p-2 text-sm text-red-500
                    hover:text-white hover:bg-red-500 transition cursor-pointer
                    "
                    {onclick}
                >
                    <X size={20} />
                </button>
            </div>

            <a
                href={backupDriveUrl}
                target="_blank"
                class="
                flex w-full justify-between items-center
                px-4 py-2 mb-4
                font-medium
                bg-red-100 text-red-600
                hover:bg-red-200 hover:text-red-700
                active:bg-red-300 active:text-red-800
                transition cursor-pointer
                "
            >
                Backup Drive Link (Relevant pages only)
                <ArrowRight size={16} />
            </a>

            <table class="w-full">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="px-4 py-2 text-left">Year</th>
                        <th class="px-4 py-2 text-left">Pages (in print)</th>
                        <th class="px-4 py-2 text-left">Official PDFs</th>
                    </tr>
                </thead>

                <tbody>
                    {#each pdfUrls as row}
                        <tr class="bg-gray-100">
                            <td class="px-2 py-1 border-2 border-white">{row.year}</td>
                            <td class="px-2 py-1 border-2 border-white">{row.pages}</td>
                            <td class="px-2 py-1 border-2 border-white">
                                <a
                                    href={row.url}
                                    target="_blank"
                                    class="
                                    flex px-4 py-2
                                    font-medium text-nowrap text-center
                                    bg-red-100 text-red-600
                                    hover:bg-red-200 hover:text-red-700
                                    active:bg-red-300 active:text-red-800
                                    border border-red-200
                                    transition cursor-pointer
                                    "
                                >
                                    View PDF
                                </a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{/if}