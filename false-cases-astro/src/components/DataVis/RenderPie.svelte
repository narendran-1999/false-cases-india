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
    const cx = 150;
    const cy = 150;
    const R = 120; // main radius
    const SUBSET_RADIUS_RATIO = 0.9;
    const subR = R * SUBSET_RADIUS_RATIO; // subsegment radius

    // derived values initialized
    let fakePercent = 0;
    let maliciousFalsePercent = 0;
    let convictedPercent = 0;

    // angles (degrees)
    let aEnd = $state(0);
    let subEnd = $state(0);

    // compute based on props
    $effect(() => {
        const isMetro = (tabIndiaMetro === 1) ? true : false;
        const { data, title } = getLatestCrimeData(crime, isMetro);

        // numbers extraction (quashed cases excluded)
        const fakeNum = data.slice(1, 4).reduce((a, b) => a + b, 0);
        const maliciousFalseNum = fakeNum - data[3];
        const convictedNum = data[6];

        // avoid division by zero
        const total = fakeNum + convictedNum;
        if (!total) {
            aEnd = 0;
            subEnd = 0;
            return;
        }

        // percentages calculation
        maliciousFalsePercent = (maliciousFalseNum / total) * 100;
        fakePercent = (fakeNum / total) * 100;
        convictedPercent = 100 - (fakePercent);

        // angles from percentages
        aEnd = pctToDeg(fakePercent);// Fake cases slice
        subEnd = pctToDeg(maliciousFalsePercent);// Subsegment: confirmed malicious
    });
</script>

<div class="w-full">
    <svg viewBox="0 0 300 300">
        <!-- Fake Cases -->
        <path d={arcPath(cx, cy, R, 0, aEnd)} fill="red" />

        <!-- Confirmed Malicious -->
        <path d={arcPath(cx, cy, subR, 0, subEnd)} fill="darkred" />

        <!-- Convicted -->
        <path d={arcPath(cx, cy, R, aEnd, 360)} fill="blue" />
    </svg>
</div>