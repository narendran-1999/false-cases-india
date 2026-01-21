// CONSTANTS
export const LATEST_DATA_YEAR: number = 2023;

export const properTitle = {
    rape: "Rape",
    attempted_rape: "Attempted Rape",
    sexual_assault: "Sexual Assault / Harassment",
    cruelty: "Cruelty by Husband or His Relatives"
} as const;


// TYPES
export type ProperTitleKey = keyof typeof properTitle;

export type CrimeData = {
    rape: string;
    attempted_rape: string;
    sexual_assault: string;
    cruelty: string;
};