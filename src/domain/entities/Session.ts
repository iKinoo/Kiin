import { Moment } from "moment";

export class Session {

    private _day: string;
    private _startHour: Moment;
    private _endHour: Moment;
    private _room: string;

    constructor(day: string, startHour: Moment, endHour: Moment, room: string) {
        this._day = day;
        this._startHour = startHour;
        this._endHour = endHour;
        this._room = room;
    }

    get day(): string {
        return this._day;
    }
    get startHour(): Moment {
        return this._startHour;
    }
    get endHour(): Moment {
        return this._endHour;
    }
    get room(): string {
        return this._room;
    }

}
