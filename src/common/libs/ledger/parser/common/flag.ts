import { AccountFlags } from './flags/accountFlags';
import { txFlags, txFlagIndices } from './flags/txFlags';
/* Class ==================================================================== */

// txFlags
// Global Flag
// Payment Flags
// OfferCreate Flags
// TrustSet Flags
// AccountSet Flags
// PaymentChannelClaim Flags
// Other Transaction Types

// TODO: support/parse all flags

class Flag {
    type: string;
    flags: number;

    constructor(type: string, flags?: number) {
        this.type = type;
        this.flags = flags;
    }

    parseIndices() {
        let flag = '';
        const { AccountSet } = txFlagIndices;

        for (const flagName in AccountSet) {
            // @ts-ignore
            if (this.flags === AccountSet[flagName]) {
                flag = flagName;
            }
        }
        return flag;
    }

    parse() {
        let flagsList = {} as any;

        switch (this.type) {
            case 'Account':
                flagsList = AccountFlags;
                break;
            case 'AccountSet':
                flagsList = txFlags.AccountSet;
                break;
            case 'TrustSet':
                flagsList = txFlags.TrustSet;
                break;
            case 'OfferCreate':
                flagsList = txFlags.OfferCreate;
                break;
            case 'Payment':
                flagsList = txFlags.Payment;
                break;
            case 'PaymentChannelClaim':
                flagsList = txFlags.PaymentChannelClaim;
                break;
            default:
                flagsList = AccountFlags;
                break;
        }

        const settings = {} as any;
        for (const flagName in flagsList) {
            if (this.flags & flagsList[flagName]) {
                settings[flagName] = true;
            } else {
                settings[flagName] = false;
            }
        }
        return settings;
    }

    get(): number {
        return this.flags;
    }

    set(flag: number) {
        if (!this.flags) {
            this.flags = flag;
        } else {
            this.flags |= flag;
        }

        return this.flags;
    }
}

/* Export ==================================================================== */
export default Flag;
