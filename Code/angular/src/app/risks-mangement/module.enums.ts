export enum Type {
    Risk = 1,
    Opportunity = 2
};
export enum Status {
    Open = 1,
    Close = 2
};
  
export enum HistoryAction {
    Create = 1,
    Update = 2,
    Delete = 3,
    CreatePlanAction = 4,
    UpdatePlanAction = 5,
    DeletePlanAction = 6
}

export enum WorkFlowStages {
    DefineRiskAndOpportunity = 1,
    Analysis = 2,
    Evaluation = 3,
    Processing = 4,
    Review = 5
}