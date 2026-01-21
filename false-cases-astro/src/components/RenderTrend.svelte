<script lang="ts">
    import { type ProperTitleKey } from "../data/constants-and-types";
    import { getCrimeData } from "../data/get-data";

    const { crime, tabIndiaMetro, trendType }: {
        crime: ProperTitleKey,
        tabIndiaMetro: 0 | 1,
        trendType: "cases" | "prevalence"
    } = $props();

    const {
        data: crimeTrendData,
        title: crimeTitle
    } = getCrimeData(crime, (tabIndiaMetro === 1) ? true : false);
</script>

<div class="">
    
</div>