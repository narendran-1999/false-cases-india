<script lang="ts">
    import { LATEST_DATA_YEAR } from "../data/latest-data-year-constant";
    import { ChevronDown } from "lucide-svelte";
    import { ChevronUp } from "lucide-svelte";


    // TAB SWITCHING LOGIC

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
    let selectedTab1: 0 | 1 = $state(0); // 0 - All India, 1 - Metro Cities
    let selectedTab2: 0 | 1 | 2 = $state(0); // 0 - Latest Year Data, 1 - Cases Trend, 2 - Prevalence Trend


    // CITIES LIST

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
</script>

<div class="flex flex-col gap-8 w-full">
    <div class="flex flex-col gap-4 w-full items-center">
        <div class="flex gap-2 p-2 bg-gray-200">
            {#each tabTitles1 as title, index}
                <button
                    class="p-2 cursor-pointer font-medium {selectedTab1 === index ? 'text-white bg-red-500' : ''}"
                    onclick={() => selectedTab1 = (index === 0 || index === 1) ? index : selectedTab1}
                >
                    {title}
                </button>
            {/each}
        </div>

        <div class="flex gap-2 p-2 bg-gray-200">
            {#each tabTitles2 as title, index}
                <button
                    class="p-2 cursor-pointer font-medium {selectedTab2 === index ? 'text-white bg-red-500' : ''}"
                    onclick={() => selectedTab2 = (index === 0 || index === 1 || index === 2) ? index : selectedTab2}
                >
                    {title}
                </button>
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-4 w-full items-center">
        <!-- Show/Hide Metro Cities List -->
        {#if (selectedTab1 === 1)}
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
        {/if}

        <!-- Explainer for Pie Chart / Trend Graphs -->
        {#if (selectedTab2 === 0)}
            <!-- Latest Year Data Explainer -->
            <div class="flex flex-col items-center gap-2">
                <h3 class="text-xl font-bold text-red-600">Fake Cases in {LATEST_DATA_YEAR}</h3>
                <div class="text-xl font-bold text-red-600">({(selectedTab1 === 0 ? "All India" : "Metro Cities")})</div>
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
        {:else if (selectedTab2 === 1)}
            <!-- Cases Trend Explainer -->
            <div class="flex flex-col items-center gap-2">
                <h3 class="text-xl font-bold text-red-600">Number of Fake Cases 2016-{LATEST_DATA_YEAR - 2000}</h3>
                <div class="text-xl font-bold text-red-600">({(selectedTab1 === 0 ? "All India" : "Metro Cities")})</div>
            </div>

            <div class="flex flex-col gap-4 p-4 w-full border-2 border-red-600">
                <p class="font-bold text-red-600">NOTE:</p>

                <p>
                    Quashed cases are included in counting number of fake cases every year.
                </p>

                <i>Refer 'Methodology' page for more details</i>
            </div>
        {:else if (selectedTab2 === 2)}
            <!-- Prevalence Trend Explainer -->
            <div class="flex flex-col items-center gap-2">
                <h3 class="text-xl font-bold text-red-600">Prevalence of Fake Cases 2016-{LATEST_DATA_YEAR - 2000}</h3>
                <div class="text-xl font-bold text-red-600">({(selectedTab1 === 0 ? "All India" : "Metro Cities")})</div>
            </div>

            <div class="flex flex-col gap-4 p-4 w-full border-2 border-red-600">
                <p class="font-bold text-red-600">NOTE:</p>

                <p>
                    Quashed cases are excluded for estimation of percentage prevalence for every year.
                </p>

                <i>Refer 'Methodology' page for more details</i>
            </div>
        {/if}
    </div>
</div>