<script lang="ts">
    import { type ProperTitleKey } from "../../data/constants-and-types";
    import { getCrimeData } from "../../data/get-data";
    import { transformTrendData, drawTrendChart, SVG_DIMENSIONS, type TrendPoint } from "./render-helpers";

    const { crime, tabIndiaMetro, trendType }: {
        crime: ProperTitleKey;
        tabIndiaMetro: 0 | 1;
        trendType: "cases" | "prevalence";
    } = $props();

    let svgEl: SVGSVGElement;
    let trendData: TrendPoint[] = [];
    let properTitle = $state("");

    $effect(() => {
        const isMetro = tabIndiaMetro === 1;
        const { data, title } = getCrimeData(crime, isMetro);

        properTitle = title;
        trendData = transformTrendData(data, trendType);
        
        if(!svgEl) return;

        drawTrendChart(svgEl, trendData, trendType);
    });
</script>

<div class="flex flex-col w-full gap-2 items-center">
    <h4 class="text-lg font-semibold w-full text-center p-2 bg-gray-200">
        {properTitle.toUpperCase()}
    </h4>

    <div class="w-full bg-gray-100 p-2">
        <div class="w-full aspect-4/3 md:aspect-video">
            <svg
                bind:this={svgEl}
                viewBox={`0 0 ${SVG_DIMENSIONS.WIDTH} ${SVG_DIMENSIONS.HEIGHT}`}
                preserveAspectRatio="xMidYMid meet"
                class="w-full h-full"
            ></svg>
        </div>
    </div>
</div>