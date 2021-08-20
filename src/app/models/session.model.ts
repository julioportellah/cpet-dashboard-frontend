export class Session {
    PatientId: number;
    SessionId: number | undefined;
    RealCardiacLim: number | undefined;
    RealPulmonaryLim: number | undefined;
    RealOtherLim: number | undefined;
    Time: number[] | undefined;
    CardiacScores: number[] | undefined;
    PulmonaryScores: number[] | undefined;
    OtherScores: number[] | undefined;
    constructor() {
    }
}