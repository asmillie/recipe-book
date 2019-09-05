export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpiryDate: Date
    ) {}

    get token(): string {
        // If token has expired then return null
        if (!this._tokenExpiryDate || new Date() > this._tokenExpiryDate) {
            return null;
        }
        return this._token;
    }
}
