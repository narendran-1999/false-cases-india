<script lang="ts">
    import { type ProperTitleKey } from "../../data/constants-and-types";
    import { getLatestCrimeData } from "../../data/get-data";
    import { pctToDeg, arcPath } from "./render-helpers";

    // props
    const { crime, tabIndiaMetro }: {
        crime: ProperTitleKey,
        tabIndiaMetro: 0 | 1
    } = $props();

    // geometry
    const cx = 140;
    const cy = 100;
    const R = 100; // main radius
    const SUBSET_RADIUS_RATIO = 0.9;
    const subR = R * SUBSET_RADIUS_RATIO; // subsegment radius


    // INITIALIZE STATE VARIABLES----

    // case numbers and percentages
    let fakeNum = $state(0);
    let convictedNum = $state(0);
    let fakePercent = $state(0);
    let convictedPercent = $state(0);

    // angles (degrees)
    let aEnd = $state(0);
    let subEnd = $state(0);

    // title
    let properTitle = $state("");


    // CALCULATIONS FROM PROPS----
    $effect(() => {
        const isMetro = (tabIndiaMetro === 1) ? true : false;
        const { data, title } = getLatestCrimeData(crime, isMetro);
        
        // set title
        properTitle = title;

        // numbers extraction (quashed cases excluded)
        fakeNum = data.slice(1, 4).reduce((a, b) => a + b, 0);
        const maliciousFalseNum = fakeNum - data[3];
        convictedNum = data[6];

        // avoid division by zero
        const total = fakeNum + convictedNum;
        if (!total) {
            aEnd = 0;
            subEnd = 0;
            return;
        }

        // percentages calculation
        const maliciousFalsePercent = (maliciousFalseNum / total) * 100;
        fakePercent = (fakeNum / total) * 100;
        convictedPercent = 100 - (fakePercent);

        // angles from percentages
        aEnd = pctToDeg(fakePercent);// Fake cases slice
        subEnd = pctToDeg(maliciousFalsePercent);// Subsegment: confirmed malicious
    });
</script>

<div class="flex flex-col w-full gap-2 items-center">
    <h4 class="text-lg font-semibold w-full text-center p-2 bg-gray-200">{properTitle.toUpperCase()}</h4>

    <div class="grid grid-cols-1 w-full gap-8 items-center bg-gray-100 p-8">
        <!-- Pie Chart SVG -->
        <svg viewBox="0 0 300 200">
            <!-- Fake Cases -->
            <path d={arcPath(cx, cy, R, 0, aEnd)} fill="red" />

            <!-- Confirmed Malicious -->
            <path d={arcPath(cx, cy, subR, 0, subEnd)} fill="darkred" />

            <!-- Convicted -->
            <path d={arcPath(cx, cy, R, aEnd, 360)} fill="blue" />
        </svg>

        <!-- In Numbers -->
        <div class="grid grid-cols-2 w-full gap-4">
            <div class="flex flex-col w-full border-t-3 border-red-500">
                <p class="text-md font-medium text-red-500 mt-2 mb-2">Fake Cases</p>
                <p class="font-bold">{fakeNum.toLocaleString()} cases</p>
                <p class="text-lg text-red-500 font-bold">{fakePercent.toFixed(1)}%</p>
            </div>

            <div class="flex flex-col w-full border-t-3 border-blue-500">
                <p class="text-md font-medium text-blue-500 mt-2 mb-2">Convicted</p>
                <p class="font-bold">{convictedNum.toLocaleString()} cases</p>
                <p class="text-lg text-blue-500 font-bold">{convictedPercent.toFixed(1)}%</p>
            </div>
        </div>
    </div>
</div>