export const tagTypes = [
  "Dataverse",
  "Dynamics 365",
  "Power Pages",
  "Power Automate",
  "Power BI",
  "Functional",
  "Technical",
] as const;

export type TagType = (typeof tagTypes)[number];
