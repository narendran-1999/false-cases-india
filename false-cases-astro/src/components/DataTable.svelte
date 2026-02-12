<script lang="ts">
    import { getCrimeData } from "../data/get-data";
    import { type ProperTitleKey, properTitle } from "../data/constants-and-types";
    import { ChevronDown } from "lucide-svelte";

    let isMetro: boolean = $state(false);
    let selectedCrime: ProperTitleKey = $state("rape");
    let rows: number[][] = $state([])

    function toggleIsMetro(){
        isMetro = !isMetro;
    }

    $effect(() => {
        const { data, title } = getCrimeData(selectedCrime, isMetro);
        rows = data;
    });
</script>


<!-- Dataset selectors -->

<div class="flex flex-col gap-2 w-full items-center">
    <div class="flex gap-2 p-2 bg-gray-200">
        <button
            class="p-2 cursor-pointer font-medium {isMetro ? '' : 'text-white bg-red-500'}"
            onclick={() => toggleIsMetro()}
        >
            All India
        </button>
        
        <button
            class="p-2 cursor-pointer font-medium {isMetro ? 'text-white bg-red-500' : ''}"
            onclick={() => toggleIsMetro()}
        >
            Metro Cities
        </button>
    </div>

    <p>(Tap/click to switch)</p>
</div>

<div class="flex flex-col gap-2 w-full items-center">
    <div class="relative w-full max-w-sm">
        <select
            class="
            w-full appearance-none
            px-3 py-2 pr-10
            font-medium
            bg-gray-300 focus:text-black focus:bg-white
            "
            bind:value={selectedCrime}
        >
            {#each Object.entries(properTitle) as [key, label]}
                <option value={key}>{label}</option>
            {/each}
        </select>

        <ChevronDown
            class="
            pointer-events-none
            absolute right-3 top-1/2 -translate-y-1/2
            h-4 w-4
            text-gray-600
            "
        />
    </div>

    <p>(Select crime)</p>
</div>


<!-- Table -->
<div class="w-full xl:w-3/4 overflow-x-auto min-h-110 sm:min-h-97 md:min-h-97">
    <table>
        <thead class="bg-gray-300 font-bold">
            <tr>
                <th rowspan=2 class="px-2 py-1 border-2 border-white wrap-break-word">Year</th>
                <th rowspan=2 class="px-2 py-1 border-2 border-white wrap-break-word">Final Report Non-Cognizable</th>
                <th rowspan=2 class="px-2 py-1 border-2 border-white wrap-break-word">Final Report False</th>
                <th rowspan=2 class="px-2 py-1 border-2 border-white wrap-break-word">Mistake of Fact or of Law or Civil Dispute</th>
                <th colspan=2 class="px-2 py-1 border-2 border-white wrap-break-word">Quashed</th>
                <th rowspan=2 class="px-2 py-1 border-2 border-white wrap-break-word">Convicted</th>
            </tr>

            <tr>
                <th class="px-2 py-1 border-2 border-white wrap-break-word">In Investigation Stage</th>
                <th class="px-2 py-1 border-2 border-white wrap-break-word">In Trial Stage</th>
            </tr>
        </thead>

        {@render tableBody()}
    </table>
</div>


<!-- Snippets -->

{#snippet tableBody()}
    <tbody>
        {#each rows as row}
            <tr class="odd:bg-gray-100 even:bg-gray-200 text-right">
                <td class="px-2 py-1 font-medium">{row[0]}</td>

                {#each row.slice(1) as item, index}
                    {#if (row[0]==2016 && (index==3 || index==4))}
                        <td class="px-2 py-1 border-2 border-white">NA</td>
                    {:else}
                        <td class="px-2 py-1 border-2 border-white">{item}</td>
                    {/if}
                {/each}
            </tr>
        {/each}
    </tbody>
{/snippet}