export const properTitle = {
    rape: "Rape",
    attempted_rape: "Attempted Rape",
    sexual_assault: "Sexual Assault / Harassment",
    cruelty: "Cruelty by Husband or His Relatives"
} as const;

export type ProperTitleKey = keyof typeof properTitle;