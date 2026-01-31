<script lang="ts">
    import { type ProperTitleKey } from "../../data/constants-and-types";
    import { getCrimeData } from "../../data/get-data";

    // Define Trend Data Model
    type TrendDataModel = {
        year: number,
        maliciousFalseNum: number,
        fakeNum: number
    } | {
        year: number,
        maliciousFalsePercent: number,
        fakePercent: number
    };

    // Handle Data Fetching & Calculation based on Props
    const { crime, tabIndiaMetro, trendType }: {
        crime: ProperTitleKey,
        tabIndiaMetro: 0 | 1,
        trendType: "cases" | "prevalence"
    } = $props();

    let trendData: TrendDataModel[] = [];

    $effect(() => {
        const isMetro = (tabIndiaMetro === 1) ? true : false;

        const {
            data,
            title
        } = getCrimeData(crime, isMetro);

        trendData = [];

        if (trendType === "cases") {
            // Process data for Cases Trend

            // Numbers extraction (quashed cases included)
            data.map((yearData) => {
                const fakeNum = yearData.slice(1, 6).reduce((a, b) => a + b, 0);
                const maliciousFalseNum = fakeNum - yearData[3];

                trendData.push({
                    year: yearData[0],
                    maliciousFalseNum,
                    fakeNum
                });
            });
        } else {
            // Process data for Prevalence Trend

            // Numbers extraction (quashed cases excluded)
            data.map((yearData) => {
                const fakeNum = yearData.slice(1, 4).reduce((a, b) => a + b, 0);
                const maliciousFalseNum = fakeNum - yearData[3];
                const convictedNum = yearData[6];

                const maliciousFalsePercent = (maliciousFalseNum / (fakeNum + convictedNum)) * 100;
                const fakePercent = (fakeNum / (fakeNum + convictedNum)) * 100;

                trendData.push({
                    year: yearData[0],
                    maliciousFalsePercent,
                    fakePercent
                });
            });
        }
    });
</script>

<div class="">
    
</div>