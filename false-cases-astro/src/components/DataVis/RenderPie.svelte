<script lang="ts">
    import { type ProperTitleKey } from "../../data/constants-and-types";
    import { getLatestCrimeData } from "../../data/get-data";

    // Handle Data Fetching & Calculation based on Props
    const { crime, tabIndiaMetro }: {
        crime: ProperTitleKey,
        tabIndiaMetro: 0 | 1
    } = $props();

    $effect(() => {
        const isMetro = (tabIndiaMetro === 1) ? true : false;

        const {
            data,
            title
        } = getLatestCrimeData(crime, isMetro);

        // Quashed Cases excluded
        const fakeNum = data.slice(1, 4).reduce((a, b) => a + b, 0);
        const maliciousFalseNum = fakeNum - data[3];
        const convictedNum = data[6];

        const maliciousFalsePercent = (maliciousFalseNum / (fakeNum + convictedNum)) * 100;
        const fakePercent = (fakeNum / (fakeNum + convictedNum)) * 100;
        const convictedPercent = 100 - (fakePercent);
    });
</script>

<div class="">
    
</div>