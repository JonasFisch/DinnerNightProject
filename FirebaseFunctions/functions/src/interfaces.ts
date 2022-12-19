export type UserID = number;

export interface InvitePartyRequestData {
    partyID: string,
    newMembers: Array<UserID>
}
