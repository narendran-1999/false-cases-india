<script lang="ts">
    import { type ProperTitleKey } from "../data/constants-and-types";
    import { getLatestCrimeData } from "../data/get-data";

    const { crime, tabIndiaMetro }: {
        crime: ProperTitleKey,
        tabIndiaMetro: 0 | 1
    } = $props();

    const {
        data: latestCrimeData,
        title: crimeTitle
    } = getLatestCrimeData(crime, (tabIndiaMetro === 1) ? true : false);
</script>

<div class="">
    
</div>