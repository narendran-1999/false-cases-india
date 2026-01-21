<script lang="ts">
    import { LATEST_DATA_YEAR, type ProperTitleKey } from "../../data/constants-and-types";

    import { ChevronDown } from "lucide-svelte";
    import { ChevronUp } from "lucide-svelte";

    import RenderPie from "./RenderPie.svelte";
    import RenderTrend from "./RenderTrend.svelte";


    // -----------TAB SWITCHING LOGIC

    // Tab Titles
    const tabTitles1: string[] = [
        "All India",
        "Metro Cities"
    ];

    const tabTitles2: string[] = [
        LATEST_DATA_YEAR.toString(),
        "Cases Trend",
        "Prevalence Trend"
    ];

    // Selected Tab Indices
    let tabIndiaMetro: 0 | 1 = $state(0);
    // 0: All India, 1: Metro Cities
    let tabLatestHistorical: 0 | 1 | 2 = $state(0);
    // 0 - Latest Year Data, 1 - Cases Trend, 2 - Prevalence Trend


    // -----------CITIES LIST

    const metroCities: string[] = [
        "Delhi", "Mumbai", "Pune", "Nagpur", "Bengaluru", "Hyderabad",
        "Ahmedabad", "Surat", "Chennai", "Coimbatore", "Kolkata", "Jaipur",
        "Lucknow", "Kanpur", "Ghaziabad", "Indore", "Kochi", "Kozhikode",
        "Patna"
    ];

    //List Toggle Logic
    let showCitiesList: boolean = $state(false);

    function toggleCitiesList() {
        showCitiesList = !showCitiesList;
    }

    // -----------CRIMES LIST
    const crimesList: ProperTitleKey[] = [
        "rape",
        "attempted_rape",
        "sexual_assault",
        "cruelty"
    ];
</script>


<div class="flex flex-col gap-8 w-full">
    {@render tabSwitch()}

    <div class="flex flex-col gap-4 w-full items-center">
        <!-- Show/Hide Metro Cities List -->
        {#if (tabIndiaMetro === 1)}
            {@render metroCitiesList()}
        {/if}

        <!-- Explainers for Pie Chart / Trend Graphs -->
        {#if (tabLatestHistorical === 0)}
            {@render latestDataExplainer()}
        {:else if (tabLatestHistorical === 1)}
            {@render casesTrendExplainer()}
        {:else if (tabLatestHistorical === 2)}
            {@render prevalenceTrendExplainer()}
        {/if}

        <!-- Charts & Graphs Display -->
        {@render chartDisplay(tabIndiaMetro, tabLatestHistorical)}
    </div>
</div>


<!-- Snippets-->

{#snippet tabSwitch()}
    <div class="flex flex-col gap-4 w-full items-center">
        <div class="flex gap-2 p-2 bg-gray-200">
            {#each tabTitles1 as title, index}
                <button
                    class="p-2 cursor-pointer font-medium {tabIndiaMetro === index ? 'text-white bg-red-500' : ''}"
                    onclick={() => tabIndiaMetro = (index === 0 || index === 1) ? index : tabIndiaMetro}
                >
                    {title}
                </button>
            {/each}
        </div>

        <div class="flex gap-2 p-2 bg-gray-200">
            {#each tabTitles2 as title, index}
                <button
                    class="p-2 cursor-pointer font-medium {tabLatestHistorical === index ? 'text-white bg-red-500' : ''}"
                    onclick={() => tabLatestHistorical = (index === 0 || index === 1 || index === 2) ? index : tabLatestHistorical}
                >
                    {title}
                </button>
            {/each}
        </div>
    </div>
{/snippet}

{#snippet metroCitiesList()}
    <div class="flex flex-col w-full">
        <div class="flex px-8 py-4 justify-between bg-red-200">
            <p>
                <span class="font-medium">19 Listed Cities</span>
                <br>
                <i>(Cities with 2 million+ population)</i>
            </p>

            <button class="cursor-pointer" onclick={toggleCitiesList}>
                {#if showCitiesList}
                    <ChevronUp size={20} />
                {:else}
                    <ChevronDown size={20} />
                {/if}
            </button>
        </div>

        <div
            class="
                px-8 py-4 grid grid-flow-col bg-gray-100
                grid-cols-2 md:grid-cols-3
                grid-rows-10 md:grid-rows-7
                border-2 border-red-200
            "
        >
            {#each metroCities as city, _ }
                <p>{city}</p>
            {/each}
        </div>
    </div>
{/snippet}

{#snippet latestDataExplainer()}
    <div class="flex flex-col items-center gap-2">
        <h3 class="text-xl font-bold text-red-600">Fake Cases in {LATEST_DATA_YEAR}</h3>
        <div class="text-xl font-bold text-red-600">({(tabIndiaMetro === 0 ? "All India" : "Metro Cities")})</div>
    </div>

    <div class="flex flex-col gap-4 p-4 w-full border-2 border-red-600">
        <p class="font-bold text-red-600">NOTE:</p>

        <ul class="list-disc list-outside ml-6 flex flex-col gap-1">
            <li>'Confirmed Malicious' (dark red) is the MINIMUM proportion of intentional fake cases.</li>
            <li>Proportion of intentionally filed cases in bright red is unknown.</li>
            <li>Quashed cases are excluded from estimation.</li>
        </ul>

        <i>Refer 'Methodology' page for more details</i>
    </div>
{/snippet}

{#snippet casesTrendExplainer()}
    <div class="flex flex-col items-center gap-2">
        <h3 class="text-xl font-bold text-red-600">Number of Fake Cases 2016-{LATEST_DATA_YEAR - 2000}</h3>
        <div class="text-xl font-bold text-red-600">({(tabIndiaMetro === 0 ? "All India" : "Metro Cities")})</div>
    </div>

    <div class="flex flex-col gap-4 p-4 w-full border-2 border-red-600">
        <p class="font-bold text-red-600">NOTE:</p>

        <p>
            Quashed cases are included in counting number of fake cases every year.
        </p>

        <i>Refer 'Methodology' page for more details</i>
    </div>
{/snippet}

{#snippet prevalenceTrendExplainer()}
    <div class="flex flex-col items-center gap-2">
        <h3 class="text-xl font-bold text-red-600">Prevalence of Fake Cases 2016-{LATEST_DATA_YEAR - 2000}</h3>
        <div class="text-xl font-bold text-red-600">({(tabIndiaMetro === 0 ? "All India" : "Metro Cities")})</div>
    </div>

    <div class="flex flex-col gap-4 p-4 w-full border-2 border-red-600">
        <p class="font-bold text-red-600">NOTE:</p>

        <p>
            Quashed cases are excluded for estimation of percentage prevalence for every year.
        </p>

        <i>Refer 'Methodology' page for more details</i>
    </div>
{/snippet}

{#snippet chartDisplay(tabIndiaMetro: 0 | 1, tabLatestHistorical: 0 | 1 | 2)}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {#each crimesList as crime}
            {#if (tabLatestHistorical === 0)}
                <!-- Pie Legend here -->
                
                <RenderPie {crime} {tabIndiaMetro} />
            {:else}
                <!-- Trend Legend here -->
                
                {#if (tabLatestHistorical === 1)}
                    <RenderTrend {crime} {tabIndiaMetro} trendType="cases" />
                {:else if (tabLatestHistorical === 2)}
                    <RenderTrend {crime} {tabIndiaMetro} trendType="prevalence" />
                {/if}
            {/if}
        {/each}
    </div>
{/snippet}