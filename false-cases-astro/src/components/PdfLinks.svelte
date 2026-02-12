<script lang="ts">
  import { pdfUrls } from "../data/ncrb-pdf-urls";
  import { X } from "lucide-svelte";

  let isOpen = $state(false);

  function onclick() {
    isOpen = !isOpen;
  }


  // edit later-----
  type Row = {
    id: number;
    name: string;
    value: number;
  };

  const rows: Row[] = [
    { id: 1, name: "Alpha", value: 10 },
    { id: 2, name: "Beta", value: 20 },
    { id: 3, name: "Gamma", value: 30 }
  ];
  // edit later----
</script>

<button
    class="
    sm:self-start px-6 py-2 mt-2
    text-white font-medium
    bg-[#ee2f2f] hover:bg-[#c72727]
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
                    p-2
                    text-sm text-red-500 bg-red-100
                    hover:text-white hover:bg-red-500
                    transition cursor-pointer
                    "
                    {onclick}
                >
                    <X size={20} />
                </button>
            </div>

            <table class="w-full text-sm">
                <thead class="bg-gray-300">
                    <tr>
                        <th class="px-2 py-1 text-left">ID</th>
                        <th class="px-2 py-1 text-left">Name</th>
                        <th class="px-2 py-1 text-left">Value</th>
                    </tr>
                </thead>

                <tbody>
                    {#each rows as row}
                        <tr class="odd:bg-gray-100 even:bg-gray-200">
                            <td class="px-2 py-1">{row.id}</td>
                            <td class="px-2 py-1">{row.name}</td>
                            <td class="px-2 py-1">{row.value}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{/if}