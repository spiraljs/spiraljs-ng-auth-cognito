import { SpiralUser } from './user';

export class SpiralUserSession {
    StartedOn: Date;
    Duration: number;
    ExpiryBy: Date;
    User: SpiralUser;

    constructor() {
        //
    }

    renew(durationMinutes: number){
        this.StartedOn = new Date();
        this.ExpiryBy = new Date();
        this.Duration = durationMinutes;
        this.ExpiryBy.setMinutes(this.ExpiryBy.getMinutes() + durationMinutes);
    }

    static create(user: SpiralUser, durationMinutes: number): SpiralUserSession {
        var newSession = new SpiralUserSession();
        newSession.User = user;
        newSession.StartedOn = new Date();
        newSession.ExpiryBy = new Date();
        newSession.Duration = durationMinutes;
        newSession.ExpiryBy.setMinutes(newSession.ExpiryBy.getMinutes() + durationMinutes);
        return newSession;
    }
}